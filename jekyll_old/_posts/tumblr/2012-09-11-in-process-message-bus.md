---
layout: post
title: In-Process Message Bus
date: '2012-09-11T09:55:38+01:00'
categories: []
tumblr_url: http://blog.pebblecode.com/post/31327518299/in-process-message-bus
author: Akash Chopra
---
<p>In my <a href="http://blog.pebblecode.com/blog/honey-i-shrunk-the-soa-fsharp">last
post</a>
I discussed the idea of designing single process applications in a way
that mimics a SOA i.e. the application is decomposed into services that
communicate solely via asynchronous messaging. As promised, here I&rsquo;ll
discuss the key concepts in the proof-of-concept implementation. If you
want all the details then take a look at the
<a href="https://bitbucket.org/akashchopra/microsoa" title="MicroSOA">source</a>, which
is a mixture of F# and C# code.</p>

<h3>IMessageBus</h3>

<p>Firstly, the message bus interface has been split into an
IMessageDispatcher and an IMessageBus:</p>

<pre><code>type IMessageDispatcher =
    abstract member Publish : 'TEvent -&gt; unit
    abstract member Send : 'TRequest -&gt; Task&lt;'TResponse&gt;

type MessageProcessingMode =
    | Sequential = 0
    | Concurrent = 1

type IMessageBus
    inherit IMessageDispatcher
    abstract member RegisterEventHandler: IEventHandler&lt;'TEvent&gt; -&gt; MessageProcessingMode -&gt; unit
    abstract member RegisterRequestHandler: IRequestHandler&lt;'TRequest, 'TResponse&gt; -&gt; MessageProcessingMode -&gt; unit
</code></pre>

<p>IMessageDispatcher is only concerned with dispatching messages to the
correct recipients; IMessageBus augments this with the ability to
register message handlers. The RegisterEventHandler and
RegisterRequestHandler methods now take a MessageProcessingMode that
specifies whether the handler can process messages concurrently i.e.
whether it is thread-safe.</p>

<p>Services will typically take a dependency on IMessageDispatcher, as they
just need to publish/send messages rather than register new handlers.</p>

<h3>IMessageQueue</h3>

<p>Next we need to wrap each service in a message queue that can forward
messages to the correct handler implementation whilst ensuring that the
MessageProcessingMode is enforced:</p>

<pre><code>type IMessageQueue =
    abstract member Publish : 'TEvent -&gt; IMessageDispatcher -&gt; unit
    abstract member Send : 'TRequest -&gt; IMessageDispatcher -&gt; Task&lt;'TResponse&gt;
    abstract member Service : obj
</code></pre>

<p>The reason for IMessageDispatcher appearing in the method signatures is
so that the queue can publish an ExceptionMessage if the handler throws
an exception. This makes it possible for a global exception handler to
deal with all exceptions.</p>

<h3>IMessageQueue Implementations</h3>

<p>There are two implementations of IMessageQueue - MessageQueue and
NullMessageQueue. MessageQueue, as expected, enforces sequential
processing of messages via an F# agent; NullMessageQueue is a simple
pass-through to the underlying handler (i.e. it allows concurrent
message processing) that can be used as a performance optimisation in
the case where the handler is known to be thread-safe (i.e. the handler
was registered using MessageProcessingMode.Concurrent).</p>

<h3>MessageQueue</h3>

<pre><code>type internal AgentMessage =
    | AsyncAction of (unit-&gt; Async&lt;unit&gt;)

type internal AgentResponse&lt;'T&gt; =
    | Response of 'T
    | Error of exn

type MessageQueue(service : obj) =
    let agent =
        Agent.Start(fun inbox -&gt;
            let rec loop () =
                async {
                    let! AsyncAction(forwardMessageToService) = inbox.Receive()
                    do! forwardMessageToService()
                    return! loop()
                }
                loop())

    let publishExceptionAndReply e (bus : IMessageDispatcher) (replyChannel : AsyncReplyChannel&lt;AgentResponse&lt;'TOut&gt;&gt;) =
        bus.Publish (ExceptionMessage(e))
        replyChannel.Reply (Error(e))

    let sendRequest (request : 'TIn) (replyChannel : AsyncReplyChannel&lt;AgentResponse&lt;'TOut&gt;&gt;) bus (service : obj) =
        async {
            let handler = service :?&gt; IRequestHandler&lt;'TIn, 'TOut&gt;
            try
                let! response = Async.AwaitTask (handler.HandleRequest request)
                replyChannel.Reply (Response(response))
            with
            | :? System.AggregateException as ae -&gt; publishExceptionAndReply ae.InnerException bus replyChannel
            | e -&gt; publishExceptionAndReply e bus replyChannel
        }

    let publishEvent (event : 'TIn) (bus : IMessageDispatcher) (service : obj) =
        async {
            let handler = service :?&gt; IEventHandler&lt;'TIn&gt;
            try
                handler.HandleEvent event
            with
            | e -&gt; bus.Publish (ExceptionMessage(e))
        }

    interface IMessageQueue with
        member x.Service = service

        member x.Send&lt;'TIn, 'TOut&gt; (request : 'TIn) bus =
            let resp = agent.PostAndAsyncReply&lt;AgentResponse&lt;'TOut&gt;&gt;(fun replyChannel -&gt; AsyncAction(sendRequest request replyChannel bus service))
            Async.StartAsTask (
                async {
                    let! res = resp
                    match res with
                    | Response r -&gt; return r
                    | Error e -&gt; return (raise e)
                }
            )

        member x.Publish&lt;'TIn&gt; (event : 'TIn) bus =
            agent.Post (AsyncAction(publishEvent event bus service))
</code></pre>

<p>MessageQueue&rsquo;s agent receives messages of type AgentMessage and replies
with messages of type AgentResponse. AgentMessage is just an async
computation that the agent can execute. The exact computation is
specified by the sendRequest and publishEvent methods, but they both
forward the original message to the correct message handler
implementation and deal with responses/exceptions. AgentResponse
contains either the successful response or the failure exception, and is
a <a href="http://stackoverflow.com/a/10885062/32413" title="Unifying TPL and MailboxProcessor exception strategy">useful way to get
around</a>
MailboxProcessor&rsquo;s <a href="http://stackoverflow.com/questions/10805035/mailboxprocessor-and-exceptions" title="MailboxProcessor exception strategy">strange exception handling
behaviour</a>.</p>

<h3>NullMessageQueue</h3>

<pre><code>type NullMessageQueue(service : obj) =
    let publishExceptionAndReply (e : exn) (bus : IMessageDispatcher) =
        bus.Publish (ExceptionMessage(e))
        raise e

    interface IMessageQueue with
        member x.Service = service

        member x.Send&lt;'TIn, 'TOut&gt; request bus =
            let handler = service :?&gt; IRequestHandler&lt;'TIn, 'TOut&gt;
            let handleAsync =
                async {
                    try
                        let! response = Async.AwaitTask (handler.HandleRequest request)
                        return response
                    with
                    | :? System.AggregateException as ae -&gt; return (publishExceptionAndReply ae.InnerException bus)
                    | e -&gt; return (publishExceptionAndReply e bus)
                }

            Async.StartAsTask handleAsync

        member x.Publish&lt;'TIn&gt; event bus =
            let handler = service :?&gt; IEventHandler&lt;'TIn&gt;
            let handleAsync =
                async {
                    try
                        handler.HandleEvent event
                    with
                    | e -&gt; bus.Publish (ExceptionMessage(e))
                }

            Async.Start handleAsync
</code></pre>

<p>NullMessageQueue is just directly forwarding messages to handlers
without involve an F# agent. However, to ensure that exceptions are
handled in the same manner as MessageQueue, the invocations need to be
wrapped in async computations.</p>

<h3>Architecture</h3>

<p>So, the updated diagram looks like this:</p>

<p><a href="http://www.itworksonmymachine.co.uk/wp-content/uploads/2012/06/MessageBus.png"><img src="http://www.itworksonmymachine.co.uk/wp-content/uploads/2012/06/MessageBus.png" alt="" title="MessageBus"/></a></p>

<p>When handlers are registered with the message bus, the
MessageToQueuesMap is told to add the required message queue to the
collection of queues that process the given message type. Then, when the
message bus receives a message it asks the map for the collection of
queues that the message should be forwarded to. Events can be forwarded
to multiple handlers (e.g. ServiceA and ServiceB both implement
IEventHandler&lt;EventA&gt;), but requests must only have a single handler.</p>

<p>Note that each service can be wrapped in at most two IMessageQueue
instances - one MessageQueue and one NullMessageQueue. All messages that
need to be processed sequentially go through the MessageQueue, and all
messages that can be processed concurrently go through the
NullMessageQueue. The MessageQueueCache (not shown) is responsible for
providing the correct queue(s) for each service, and is used by the
MessageToQueuesMap during handler registration.</p>

<h3>Load Balancers</h3>

<p>If a message handler cannot handle concurrent messages, it may by
swamped by high message volumes whilst not utilising the available
cores. As mentioned in the previous post, this can be solved by using a
load balancer. There are two versions, one for handling events and one
for requests. Both make use of <a href="http://tomasp.net/" title="Tomas Petricek">Tomas
Petricek&rsquo;s</a>
<a href="http://tomasp.net/blog/parallel-extra-blockingagent.aspx" title="BlockingQueueAgent">BlockingQueueAgent</a>
class, which enables Producer/Consumer scenarios.</p>

<p>Rather than listing the code here, I&rsquo;ll point you to the
<a href="https://bitbucket.org/akashchopra/microsoa/src/501c496f2710/MicroSoa/EventLoadBalancer.cs" title="EventLoadBalancer">EventLoadBalancer</a>
and
<a href="https://bitbucket.org/akashchopra/microsoa/src/501c496f2710/MicroSoa/RequestLoadBalancer.cs" title="RequestLoadBalancer">RequestLoadBalancer</a>.</p>

<h3>Wrapping Up</h3>

<p>This post is already long enough and I&rsquo;ve delayed publishing it for too
long, so I&rsquo;m going to defer further discussion for the next post. There
I&rsquo;ll discuss the pros and cons of the current implementation and also
compare the concept to a pure <a href="http://en.wikipedia.org/wiki/Actor_model" title="Actor Model">Actor
Model</a>.</p>

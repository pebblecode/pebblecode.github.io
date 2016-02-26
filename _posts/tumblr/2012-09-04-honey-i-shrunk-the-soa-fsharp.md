---
layout: post
title: Honey, I Shrunk the SOA
date: '2012-09-04T13:16:00+01:00'
tags:
- F sharp
- message bus
- async
tumblr_url: http://blog.pebblecode.com/post/30865686824/honey-i-shrunk-the-soa-fsharp
author: Mark DUrrant
---
<p>Technical architect Akash Chopra has been writing on his excellent blog
<a href="http://www.itworksonmymachine.co.uk/">itworksonmymachine.co.uk</a> about
creating a message bus in F#. We thought a lot of our readers would
find this interesting so we&rsquo;ve reposted his thoughts here.</p>

<h3>Honey, I Shrunk the SOA</h3>

<p>I&rsquo;ve recently been thinking what would happen if we applied the
principles of SOA (done properly, using asynchronous messaging) to the
design of code running within a single process. In other words, the code
would consist of independent services that could only communicate
asynchronously via some kind of message bus. What would this look like?
Would it have any benefits?</p>

<p>Before I go any further, I should point out that I did some research and
discovered that <a href="http://www.blogger.com/profile/12518116016333593695" title="Svein Arne Ackenhausen">Svein Arne
Ackenhausen</a>
had not only been thinking along these lines, but was also using them in
production. His <a href="http://ackenpacken.blogspot.com/2012/01/2-cups-of-messaging-1-tablespoon-of.html" title="Asynchronous messaging">blog
post</a>
summarises the benefits as he sees them, and he linked to his <a href="https://gist.github.com/1319021" title="Message Dispatcher">standard
implementation</a>.
However I&rsquo;ve not been able to find any other articles discussing these
ideas, so I thought I&rsquo;d write up my thoughts in the hope that I can get
some useful feedback.</p>

<p>Svein&rsquo;s implementation is a very nice, simple approach (a good thing!)
which clearly demonstrates that there aren&rsquo;t any great technological
barriers to adopting this design pattern. However, I think it may
benefit from some additions.</p>

<p>Firstly, as Svein mentions, stateful services have to be modelled very
carefully because the service can be handling multiple messages
concurrently. What if we sidestepped this problem by combining the
message bus concept with the <a href="http://en.wikipedia.org/wiki/Actor_model" title="Actor Model">Actor
Model</a> so that
each service behaves as an actor that processes messages sequentially?
Now we can use stateful services <em>where appropriate</em> without having to
worry about concurrency.</p>

<p>Secondly, it only really deals with publishing events: there is no concept of request/response. We could mimic request/response by
convention (handlers of IFoo must themselves publish a message of type
IFooResponse in return), but as Svein pointed out in his blog post, one
of the benefits of this approach is that:</p>

<blockquote>
  <p>By making sure that your code feature produces an output in the shape<br/>
  of a message you have made that code feature a stand alone piece of<br/>
  code. It can now make sense beyond the contract that would have<br/>
  otherwise been passed to it. Being a stand alone piece of code it<br/>
  becomes a natural place for integration. Integration that would happen<br/>
  through consuming a message or producing a message that other<br/>
  participants can consume through the message dispatcher.</p>
</blockquote>

<p>To maximise this benefit I feel we should be making explicit the
difference between publishing an event and sending a command or querying
for data. This is something that, for example, NServiceBus makes
explicit via the Publish() and Send() methods on its service bus
interface.</p>

<p>So what would such an API look like? First we need the message handling
interfaces that services can implement:</p>

<pre><code>public interface IEventHandler&lt;TEvent&gt; 
{ 
    void HandleEvent(TEvent message); 
} 

public interface IRequestHandler&lt;TRequest, TResponse&gt; 
{ 
    Task&lt;TResponse&gt; HandleRequest(TRequest message); 
} 
</code></pre>

<p>By returning a Task the IRequestHandler will integrate nicely with the
async features of C# 5.</p>

<p>Next we need the message bus interface:</p>

<pre><code>public interface IMessageBus 
{ 
    public void RegisterEventHandler&lt;TEvent&gt;(IEventHandler&lt;TEvent&gt; handler); 
    public void RegisterRequestHandler&lt;TRequest, TResponse&gt;(IRequestHandler&lt;TRequest, TResponse&gt; handler); 
    public void Publish&lt;TEvent&gt;(TEvent message); public Task&lt;TResponse&gt; 
    Send&lt;TRequest, TResponse&gt;(TRequest message); 
} 
</code></pre>

<p>Then at the application root we can configure the system by registering
services with the message bus:</p>

<pre><code>var serviceA = new ServiceA; // implements IEventHandler 
bus.RegisterEventHandler(serviceA); 
var serviceB = new ServiceB; // implements IRequestHandler 
bus.RegisterRequestHandler(serviceB); 
</code></pre>

<p>And services can interact with the bus like so:</p>

<pre><code>public async void DoStuff() 
{ 
    // some actions... 

    // this will send the ReqA message and asynchronously await the response 
    var result = await bus.Send(new ReqA()); 

    // do other stuff with the result... 
} 
</code></pre>

<p>Whilst it is a nice idea to avoid concurrent message processing in the
services, we need a way of handling the situation where the service
cannot process the messages quickly enough. The solution comes from
considering the SOA approach: simply add multiple service instances
behind a load balancer! For example:</p>

<pre><code>public class EventLoadBalancer : IEventHandler&lt;TEvent&gt; 
{ 
    public LoadBalancer(Func&lt;IEventHandler&lt;TEvent&gt;&gt; slaveFactory) 
    { 
        // set up appropriate queues etc to hold slave instances 
    } 

    public void HandleEvent(TEvent message) 
    { 
        // forward message to chosen slave instance 
    } 
} 
</code></pre>

<p>Because the load balancer is itself an IEventHandler<tevent>, we can simply pass it to the RegisterEventHandler method on the message bus instead of passing the service instance.</tevent></p>

<p>So far, so theoretical. How can we implement the actor functionality?
Luckily, F# <a href="http://blogs.msdn.com/b/dsyme/archive/2010/02/15/async-and-parallel-design-patterns-in-f-part-3-agents.aspx" title="F# Agents">already
supports</a>
agents (F# terminology for actors) via its
<a href="http://msdn.microsoft.com/en-us/library/ee370357.aspx?ppud=4" title="MailbocProcessor">MailboxProcessor</a>
class. So all we need to do is place an F# Agent between each service
and the message bus (this can be done by the RegisterEventHandler and
RegisterRequestHandler methods of the message bus):</p>

<p><a href="http://www.itworksonmymachine.co.uk/wp-content/uploads/2012/04/MessageBusAgent.png"><img src="http://www.itworksonmymachine.co.uk/wp-content/uploads/2012/04/MessageBusAgent.png" alt="" title="MessageBusAgent"/></a></p>

<p>So, the F# Agent will be responsible for forwarding the message to the
appropriate message handler interface of the service and it also ensures
that the service does not process multiple messages concurrently.</p>

<p>This approach could be the high level architecture, and would in no way
constrain lower level design choices. So, individual services could be
implemented in a traditional OO manner, a pure functional manner, or
anything in-between. A service could even be decomposed into
sub-services and use an internal message bus.</p>

<p>In the next post I&rsquo;ll look in more detail at a proof-of-concept
implementation. In the meantime, I&rsquo;ll point out a couple of things I
found out whilst writing this post:</p>

<ol><li>The next version of
<a href="http://nservicebus.com/" title="NServiceBus">NServiceBus</a> will likely
have an <a href="http://tech.groups.yahoo.com/group/nservicebus/message/12578" title="In-process NServiceBus">in-process
mode</a>.
It will be interesting to see what form this takes.</li>
<li>Alan Kay, who coined the term &ldquo;object oriented&rdquo; believes that the
<a href="http://programmers.stackexchange.com/a/46593/50486" title="Message vs Objects">messaging between objects is far more important than the objects
themselves</a>.
Maybe we are heading back closer to his original vision?</li>
</ol>

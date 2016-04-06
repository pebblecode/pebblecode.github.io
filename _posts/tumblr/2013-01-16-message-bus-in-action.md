---
layout: post
title: Message Bus In Action
date: '2013-01-16T15:44:00+00:00'
categories: []
tumblr_url: http://blog.pebblecode.com/post/40684551901/message-bus-in-action
author: Akash Chopra
---
<p>In this post I want to summarise the advantages of the <a href="http://blog.pebblecode.com/blog/in-process-message-bus" title="In-Process Message Bus">message bus</a>
approach, and also look at a potential limitation. The benefits as I see
them are:</p>

<ol><li>(Very) loose coupling between services.</li>
<li>Encourages <a href="http://en.wikipedia.org/wiki/Interface_segregation_principle" title="ISP">narrow
interfaces</a>
(what is narrower than an interface with one method e.g.
IRequestHandler?)</li>
<li>Provides not only <a href="http://martinfowler.com/eaaDev/EventAggregator.html" title="Event Aggregator">Event
Aggregator</a>
functionality, but also asynchronous Request-Response.</li>
<li>The ability to enforce sequential message processing can make it
simpler to develop stateful services.</li>
</ol><p>If all the request processing is sequential then we have something akin
to the <a href="http://en.wikipedia.org/wiki/Actor_model" title="Actor Model">Actor
Model</a> but
without the concept of identity: a request can only have a single
registered handler, so it is meaningless to talk about the handler&rsquo;s
identity. In general I think this is a good thing - having to know about
the identity increases the coupling between the services.</p>

<p>However, there
are situations where we really do need to distinguish message
destinations based on the identity of the receiver. Is this a situation
that we can&rsquo;t handle? Or are there workarounds using the message bus?</p>

<p>The example I&rsquo;ve chosen to use is the simplest two person game I could
think of - <a href="http://en.wikipedia.org/wiki/Noughts_and_crosses" title="Noughts and Crosses">Noughts and
Crosses</a>.
The design consists of 4 services: a Game service (responsible for
controlling the game and ensuring legal play), two instances of a Player
service (P1 and P2) and a UI service. In all of the sequence diagrams
that follow the messages are assumed to go via the bus (not shown),
unless explicitly stated otherwise. Async/sync requests are shown with a
solid line and an open/closed arrowhead; events are shown with a dashed
line and an open arrowhead. First the players have to register to play
the game:</p>

<p><a href="http://www.itworksonmymachine.co.uk/wp-content/uploads/2012/09/Registration-Sequence.png"><img src="http://www.itworksonmymachine.co.uk/wp-content/uploads/2012/09/Registration-Sequence.png" alt="" title="Registration Sequence"/></a></p>

<p>Players send a RegistrationRequest to the Game (N.B. as long as the Game
has been registered as a handler for RegistrationRequest using
MessageProcessingMode.Sequential, we don&rsquo;t need to worry about race
conditions during registration). The Game returns a RegistrationResult
indicating whether registration has been successful. Once two players
have registered the game can begin. The idea is that the Game should be
able to send a PlayerMoveRequest and receive a PlayerMoveResponse
containing the player&rsquo;s chosen move. However, both players are capable
of handling a PlayerMoveRequest, and they can&rsquo;t both register as
handlers for this request. The options seem to be:</p>

<h3>Unique Request Types</h3>

<p>Use different request types for Player1 and Player2:</p>

<p><a href="http://www.itworksonmymachine.co.uk/wp-content/uploads/2012/09/Game-Sequence-Unique-Request-Types.png"><img src="http://www.itworksonmymachine.co.uk/wp-content/uploads/2012/09/Game-Sequence-Unique-Request-Types.png" alt="" title="Game Sequence - Unique Request Types"/></a></p>

<p>This is ugly because of the large amounts of duplication (P1MoveRequest
= P2MoveRequest; Player service needs to implement
IRequestHandler&lt;P1MoveRequest, P1MoveResponse&gt; and
IRequestHandler&lt;P2MoveRequest, P2MoveResponse&gt;).</p>

<h3>Two Message Bus Instances</h3>

<p>Introduce two message bus instances, with communication between the game
and each player happening on separate buses:</p>

<p><a href="http://www.itworksonmymachine.co.uk/wp-content/uploads/2012/09/Game-Sequence-Two-Message-Bus-Instances2.png"><img src="http://www.itworksonmymachine.co.uk/wp-content/uploads/2012/09/Game-Sequence-Two-Message-Bus-Instances2.png" alt="" title="Game Sequence - Two Message Bus Instances"/></a></p>

<p>Whilst this initially felt more natural - we are simply saying that the
game has a dedicated communication channel with each player - it gets
complicated once we consider the UI. Does each player use its dedicated
bus to communicate with the UI? Then how does the Game communicate with
the UI? Via a <em>third</em> bus? Or does it arbitrarily choose one of the two
existing buses?</p>

<h3>Player Message Router</h3>

<p>Introduce a PlayerMessageRouter that receives the PlayerMoveRequest and
routes it (using information present within the request) to the
appropriate Player. This routing does <em>not</em> go via the bus - it will
probably just be a direct method call:</p>

<p><a href="http://www.itworksonmymachine.co.uk/wp-content/uploads/2012/09/Game-Sequence-Player-Message-Router.png"><img src="http://www.itworksonmymachine.co.uk/wp-content/uploads/2012/09/Game-Sequence-Player-Message-Router.png" alt="" title="Game Sequence - Player Message Router"/></a></p>

<p>This initially felt like an unnatural abstraction - there is no concept
of a player router in the Noughts and Crosses domain - introduced to get
around a limitation in the message bus. However, on closer inspection
the Game/Player/UI don&rsquo;t need to know anything about the router, which
can be implemented in a generic manner and just becomes another
infrastructure component that we can choose to use if appropriate (like
the
<a href="https://bitbucket.org/akashchopra/microsoa/src/bd27812a9b20/MicroSoa/EventLoadBalancer.cs" title="EventLoadBalancer.cs">load</a>
<a href="https://bitbucket.org/akashchopra/microsoa/src/bd27812a9b20/MicroSoa/RequestLoadBalancer.cs" title="RequestLoadBalancer.cs">balancers</a>):</p>

<pre><code>namespace ItWorksOnMyMachine.MicroSoa
{
    using System;
    using System.Diagnostics.Contracts;
    using System.Linq;
    using System.Threading.Tasks;

    public class RequestRouter&lt;TRequest, TResponse, THandler&gt; : IRequestHandler&lt;TRequest, TResponse&gt; where THandler : IRequestHandler&lt;TRequest, TResponse&gt;
    {
        private readonly IMessageDispatcher messageDispatcher;

        private readonly Func&lt;TRequest, THandler, bool&gt; isCorrectHandlerForRequest;

        private readonly IMessageQueue[] requestQueues;

        public RequestRouter(IMessageDispatcher messageDispatcher, Func&lt;TRequest, THandler, bool&gt; isCorrectHandlerForRequest, params Tuple&lt;THandler, MessageProcessingMode&gt;[] handlerProcessingModePairs)
        {
            Contract.Requires&lt;ArgumentNullException&gt;(isCorrectHandlerForRequest != null);
            Contract.Requires&lt;ArgumentOutOfRangeException&gt;(handlerProcessingModePairs.Count() &gt;= 2);

            this.messageDispatcher = messageDispatcher;
            this.isCorrectHandlerForRequest = isCorrectHandlerForRequest;
            this.requestQueues = handlerProcessingModePairs.Select(CreateQueue).ToArray();
        }

        private static IMessageQueue CreateQueue(Tuple&lt;THandler, MessageProcessingMode&gt; handlerProcessingModePair)
        {
            var handler = handlerProcessingModePair.Item1;
            var messageProcessingMode = handlerProcessingModePair.Item2;

            return MessageBusFactory.MessageQueueCache.GetOrAdd(handler, messageProcessingMode);
        }

        public Task&lt;TResponse&gt; HandleRequest(TRequest request)
        {
            var targetQueue = requestQueues.Single(queue =&gt; isCorrectHandlerForRequest(request, (THandler)queue.Service));

            return targetQueue.Send&lt;TRequest, TResponse&gt;(request, messageDispatcher);
        }
    }
}
</code></pre>

<p>The <a href="https://bitbucket.org/akashchopra/microsoa/src/bd27812a9b20/MicroSoa/RequestRouter.cs?at=default" title="RequestRouter.cs">RequestRouter</a>
is also a good example of the first three of the SOLID design principles:</p>

<ul><li>Single Responsibility: it simply forwards requests to the correct
recipient. It does not even understand <em>how</em> the correct recipient
is chosen, it simply knows that the provided delegate will do the
work for it.</li>
<li>Open/Closed: we&rsquo;ve introduced routed messages into our system by
adding a new component rather than modifying existing ones.</li>
<li>Liskov Substitution: it implements IRequestHandler&lt;TRequest,
TResponse&gt; and hence is a drop-in replacement for the original
request handler.</li>
</ul><h3>Bringing It All Together</h3>

<p>I&rsquo;ve implemented a solution using the &ldquo;Player Message Router&rdquo; approach.
I&rsquo;ve assumed that both players are humans, and they forward the move
requests to a UI, of which there is both a console version and a
WinForms version. The
<a href="https://bitbucket.org/akashchopra/microsoa/src/bd27812a9b20/NoughtsAndCrosses/Game.cs" title="Game.cs">Game</a>,
<a href="https://bitbucket.org/akashchopra/microsoa/src/bd27812a9b20/NoughtsAndCrosses/HumanPlayer.cs" title="HumanPlayer.cs">HumanPlayer</a>,
<a href="https://bitbucket.org/akashchopra/microsoa/src/bd27812a9b20/NoughtsAndCrossesConsole/ConsoleUI.cs" title="ConsoleUI.cs">ConsoleUI</a>
and
<a href="https://bitbucket.org/akashchopra/microsoa/src/bd27812a9b20/NoughtsAndCrossesGui/WinFormUI.cs" title="WinFormUI.cs">WinFormUI</a>
classes are quick and dirty implementations (though take a peek at
HumanPlayer.HandleRequest and WinFormUI.GetMoveFromButtonClick for some
<a href="http://msdn.microsoft.com/en-us/library/hh191443.aspx" title="Async/Await">Async/Await</a>
and
<a href="http://msdn.microsoft.com/en-us/data/gg577609.aspx" title="Reactive Extensions">Rx</a>
tastiness). The real interest is in how they are wired up. The code
below is for wiring up the ConsoleUI version:</p>

<pre><code>class Program
{
    static void Main(string[] args)
    {
        var bus = MessageBusFactory.Create();

        var game = new Game(bus);

        bus.RegisterRequestHandler(game, MessageProcessingMode.Sequential);
        bus.RegisterRequestHandler(game, MessageProcessingMode.Sequential);

        var player1 = new HumanPlayer("Player 1", bus);
        var player2 = new HumanPlayer("Player 2", bus);

        var playerRouter = new RequestRouter(
                bus,
                (request, player) =&gt; player.Name == request.Player,
                Tuple.Create(player1, MessageProcessingMode.Sequential),
                Tuple.Create(player2, MessageProcessingMode.Sequential));

        bus.RegisterRequestHandler(playerRouter, MessageProcessingMode.Sequential);

        var userInterface = new ConsoleUI(bus);
        bus.RegisterRequestHandler(userInterface, MessageProcessingMode.Sequential);
        bus.RegisterEventHandler(userInterface, MessageProcessingMode.Sequential);

        player1.RegisterForGame();
        player2.RegisterForGame();

        userInterface.Run();
    }
}
</code></pre>

<p>What I
like about this is that all of the messages that flow through the system
are clearly laid out in the application root. This provides a nice high
level overview of the system. Also notice that the Game and the Players
don&rsquo;t know anything about the RequestRouter that has been introduced to
route messages to the correct player. Now, if we compare this to the
setup for the WinFormUI:</p>

<pre><code>static class Program
{
    [STAThread]
    static void Main()
    {
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);

        var bus = MessageBusFactory.Create();

        var game = new Game(bus);

        bus.RegisterRequestHandler(game, MessageProcessingMode.Sequential);
        bus.RegisterRequestHandler(game, MessageProcessingMode.Sequential);

        var player1 = new HumanPlayer("Player 1", bus);
        var player2 = new HumanPlayer("Player 2", bus);

        var playerRouter = new RequestRouter(
                bus,
                (request, player) =&gt; player.Name == request.Player,
                Tuple.Create(player1, MessageProcessingMode.Sequential),
                Tuple.Create(player2, MessageProcessingMode.Sequential));

        bus.RegisterRequestHandler(playerRouter, MessageProcessingMode.Sequential);

        var userInterface = new WinFormUI(bus);
        bus.RegisterRequestHandler(userInterface, MessageProcessingMode.Sequential);
        bus.RegisterEventHandler(userInterface, MessageProcessingMode.Sequential);

        player1.RegisterForGame();
        player2.RegisterForGame();

        Application.Run(userInterface);
    }
}
</code></pre>

<p>The only differences from the previous ConsoleUI example are the call to
create the UI instance and the WinForms-specific calls to the
Application class. Everything else is <em>identical</em>.</p>

<h3>Summary</h3>

<p>The lack of routed messages initially seems like a big limitation of the
message bus approach. However, following the <a href="http://www.itworksonmymachine.co.uk/2012/04/25/honey-i-shrunk-the-soa/" title="Honey, I Shrunk the SOA">SOA
analogy</a>
that started this series of posts, we can simply introduce a router to
add the missing functionality in a way that respects the
<a href="http://en.wikipedia.org/wiki/Open/closed_principle" title="Open/Closed Principle">O</a>
in
<a href="http://en.wikipedia.org/wiki/SOLID_(object-oriented_design)" title="SOLID">SOLID</a>.
The Nought and Crosses implementation then shows the router and the rest
of the message bus in action in a real, albeit small, example.</p>

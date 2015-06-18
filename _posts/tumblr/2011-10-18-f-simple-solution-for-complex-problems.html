---
layout: post
title: F# Simple Solution for Complex Problems
date: '2011-10-18T10:26:00+01:00'
tags:
- .net
- fSharp
tumblr_url: http://blog.pebblecode.com/post/11607795463/f-simple-solution-for-complex-problems
author: Joseph Jeganathan
---
<p>I've chosen to get my hands dirty in F# within the first month of joining Pebble. I was new to F# or any functional programming languages. Since I&rsquo;ve lived in the Object Oriented Programming World for quite a long time, it was really hard to stop-thinking for a solution in Object Oriented way. The approach for a solution between OOP and FP is entirely different. Once you get you head around it, F# is one of the coolest and more powerful Functional Programming Languages, capable of solving any complex problem.</p>
<p>F# is a strongly typed language that uses type inference and hence you don&rsquo;t always need to specify types (type can also be specified explicitly). Immutable types are primarily used in F#, value bindings are immutable by default and to make a variable mutable the <em>mutable </em>keyword has to be used. The best way to learn F# is to think the problem as a transformation of data. In simple terms inputs are fed to a sequence of transformations, where output from one transformation is input for the next, and hence F# is less about side effects. </p>
<p>To experiment and learn the FP language F# I happened to choose BlackJack (game) as a problem to solve. At the end of writing the solution; the solution is more readable, simple, powerful and very many times fewer lines of codes to write a solution in C# for the same problem.</p>
<p><strong>Problem Domain</strong></p>
<ol><li>Represent a deck of cards with card&rsquo;s suit, value and ranks(Ace, King, etc).</li>
<li>Print out a) an ordered deck of cards b) a shuffled deck of cards</li>
<li>Deal a hand of black jack with three players and a dealer. Print out the game.</li>
<li>Determine the value of each hand. Print them out.</li>
<li>Print out the winner of the game.</li>
</ol><p><strong>Solution:</strong></p>
<p><strong>Representation of cards</strong></p>
<pre><code>type Suit = 
    | Club
    | Diamond
    | Heart
    | Spade

type Rank = 
    | Ace
    | King
    | Queen
    | Jack
    | Value of int

type Card = Card of Rank * Suit
</code></pre>
<p>Discriminated unions are very useful to represent data that can have many cases. We can use discriminated union type as an alternative to hierarchy too.  I&rsquo;ve use discriminated union types to represent card&rsquo;s suits and ranks.</p>
<p><strong>Deck of Cards</strong></p>
<pre><code>let DeckOfCards = 
    [ 
        for s in [Club; Diamond; Heart; Spade] do
            for r in [Ace; King; Queen; Jack] do
                yield Card(r,s)
            for v in 2..10 do
                yield Card(Value v, s) 
    ]
</code></pre>
<p><strong>Shuffling Deck of Cards</strong></p>
<pre><code>let shuffle cards = 
    let rand = new System.Random()
    cards 
        |&gt; List.map (fun c -&gt; (rand.Next(), c))
        |&gt; List.sortBy fst
        |&gt; List.map snd

let ShuffledCards = shuffle DeckOfCards
</code></pre>
<p>The |&gt; is forward pipe operator and it's a very important operator in F#. This operator allows you to do transformation or iterations in a forward chaining or pipe-lining way; |&gt; is equivalent to:</p>
<pre>let (|&gt;)  x f = f x</pre>
<p><strong>Player Type with Hand-Total Calculation</strong></p>
<pre><code>    member p.HandTotal = 
        let GetTotal (a: int list) (x: int*int) =
            let AddVal (v: int) = List.map (fun lv -&gt; lv + v)
            List.append 
                (a |&gt; AddVal (fst x))
                (a |&gt; AddVal (snd x))
        Cards 
        |&gt; List.map CardValue 
        |&gt; List.fold GetTotal [0] 
        |&gt; Set.ofList
</code></pre>
<p>Since &ldquo;Ace&rdquo; has two values (10 or 1) there might be more than one hand total value and we must consider all possible combinations of card values. The method above will return all possible hand total for the holding cards, Set.ofList will remove all the duplicate hand total values from the List. For example if the the card values in hand are [(1,10);(2,2);(3,3);(1,10)] (2 aces, and the number cards 2 and 3) the possible hand total values are [7; 16; 25]</p>
<p><strong>Play the Game </strong></p>
<pre><code>    let rec Play (p: Player) =
        match p with
                | _ when p.HandTotalMinimum &lt; 16 -&gt;
                        p.TakeCard(RandomCard())
                        Play p
                | _ -&gt; p
    players 
    |&gt; List.map Play
    |&gt; List.map (fun p -&gt; printfn "%O" p)
</code></pre>
<p>This is a recursive play function, using pattern matching to find out wether the player&rsquo;s minimum hand total has reached the upper limit (16).  Each player is takes cards until their minimum hand total reaches this limit, at which point the winner is decided.</p>
<p>You can find the full F# solution for at <a title="Black Jack solution at Git-Hub" href="https://github.com/pebblecode/BlackJack">Git-Hub</a>.</p>

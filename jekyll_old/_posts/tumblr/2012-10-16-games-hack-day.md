---
layout: post
title: Games hack day
date: '2012-10-16T14:08:00+01:00'
categories: [hacks]
tumblr_url: http://blog.pebblecode.com/post/33705863399/games-hack-day
author: Mark Durrant
---
<p>Last week we had a very full office. Our .net team had four new(ish) starters: Tom and James and Sava and Plamen visiting from our Bulgaria office. The .net team spent the week getting to know the newbies as well as having a lot of great discussions about “The Pebble Way” our new <a href="https://github.com/pebblecode/ThePebbleWay">protocol for developing world class software</a>.</p>



<p>As we had a packed office we figured this was a great opportunity to have another hack day. After the success of the last <a href="http://blog.pebblecode.com/blog/hack-day-live">hack day</a> we decided to go for something a little different - games.</p>



<p>With the theme set everyone arrived bright eyed and bushy tailed at 8am at pebble HQ. After scoffing a tasty breakfast courtesy of <a href="http://www.eataldesco.co.uk/">al desco</a> we got to work. A few people got up to pitch ideas they had for games and everyone got into teams.</p>



<p>After a little deliberation the teams were…</p>



<ul><li>WTF : Tak &amp; Matt</li>
<li>Keyboard demon : Vince &amp; Mark</li>
<li>Battleships : Joseph, Akash, Sava &amp; Toby</li>
<li>Hangover hunt : Daniel, Tom, &amp; Plamen</li>
<li>Campfire quiz : Alex &amp; James</li>
</ul><p>Then it was time to get stuck in. Some teams dived straight into the code, some did a fair bit of planning with pen and paper and some people even started writing tests! <a href="http://www.professorkliq.com/">Professor Kliq</a> on the stereo and everyone got to working hard.</p>



<p><img alt="" src="http://media.tumblr.com/tumblr_mbxvogM05j1r1hmko.jpg"/></p>



<p>There was a quick break where everyone stuffed their faces with more al desco delicacies before more hard work hacking. It was great to see the office at capacity and to see teams of people who hadn’t worked together before.</p>



<p><img alt="" src="http://media.tumblr.com/tumblr_mbxvornRJ11r1hmko.jpg"/></p>



<p>After 10 hours of hacking we all downed tools and relaxed with a slice of pizza and a cold beer. When all the pizza was gone everyone crowded round monitors one group at a time as everyone showed off the fruits of their labour. At the the end of the day we had 5 working games which was more than any of us hoped for. Here’s a list of what the pebblers got done in just 10 short hours.</p>



<hr><h3>WTF</h3>



<p>Tak &amp; Matt</p>



<p>WTF is a simple image guessing game. At the moment it supports guessing cities and movies. It uses the flickr api for getting images.</p>



<p>The initial idea was to create a taboo-style guessing game in a google hangout <a href="https://developers.google.com/+/hangouts/"></a><a href="https://developers.google.com/+/hangouts/">https://developers.google.com/+/hangouts/</a>, but the xml format seemed restrictive and we couldn’t figure out how to load external files, so we decided to just do a simple web site for now.</p>



<p><img alt="" src="http://media.tumblr.com/tumblr_mbxvtdLV6p1r1hmko.png"/></p>



<p>Try it live <a href="http://pebblecode.github.com/wtf/">here</a></p>



<hr><h3>Keyboard Demon</h3>



<p>Vince &amp; Mark</p>



<p>Keyboard Demon is a simple keyboard based game about mashing keys as quickly as possible. Based on <a href="http://hackertyper.net/">Hacker typer</a>.</p>



<p>We used the Hacker typer source to get started then Mark created a retro 8bit front end whilst Vince added to the javascript to add more game features.</p>



<p><img alt="" src="http://media.tumblr.com/tumblr_mbxvtoGwBP1r1hmko.png"/></p>



<hr><h3>Battleships</h3>



<p>Joseph, Akash, Sava &amp; Toby</p>



<p>Hack-ships is an extended idea of Battleships. This game is designed for two players to play in a multi-user environment. A player can create a game and invite his/her opponent via email. Instead of a square board on a plane surface we’ve chosen to play the game on a Google map.</p>

<p>Both players get notified of the circular target-zone enclosing the opponents location. Players can shoot anywhere in the circular area in order to blow up their opponent. The game is turn-based. Hack-ship is a C# MVC3 application with the core game-host being hosted as a WCF service.</p>

<p><img src="http://media.tumblr.com/tumblr_mbxxnmxywE1r1hmko.png" alt=""/></p>

<hr><h3>Hangover hunt</h3>



<p>Daniel, Tom, &amp; Plamen</p>



<p>The game works by asking the player a series of questions.  They then have to go to the location (a pub!) and answer the question with either location specific information or using location data from their browser or phone. In this way it leads the player around various pubs in a treasure hunt style.</p>

<p>Technologies we used; App: Java/Android SDK  Website/API: C#/MVC</p>

<p>Both the website and the phone app were basically wrappers for the API, using JSON to send and receive questions and answers.</p>

<p>&ldquo;The day went really well, it was good fun. It was surprising how simple it was to create an android app, even implementing geolocation was fine to get done in a day (with no prior experience). There were a few gotchas at the start, like not realising that everything had to be done on a separate thread from the UI thread. However, the Android documentation was good and there was a wealth of information on Stack Overflow so nothing posed too much of a challenge. Some of the code got a bit grubby at the end when we were rushing, but that&rsquo;s the point of a hack day!&rdquo;</p>

<p><img src="http://media.tumblr.com/tumblr_mbzlqvS5t61r1hmko.png" alt=""/></p>

<p>Git repo is <a href="https://github.com/pebblecode/hangover-hunt">here</a></p>

<hr><h3>Campfire quiz</h3>



<p>Alex &amp; James</p>



<p>The Campfire Quiz project set out at 9am with the aim to create a game which would run a question and answer game over the web-based real-time group chat tool <a href="http://campfirenow.com/">Campfire</a>. After some initial investigation we decided to make a general use quiz Gameplay engine capable of consuming any generalized question provider and outputting to any chat API. Having decided on a rough plan we then go to work writing Tests for the Game Engine, thats right we decided to use TDD on a hack day :O, to compound this we were also taking an <a href="http://www.extremeprogramming.org/">Extreme Programming</a> approach. In this way we progressed through the day writing a failing test here, refactoring production code there, swapping keyboard every half an hour and making tea on the hour, the pace was truly blistering and by mid afternoon the fruits of our labour were revealed, 2 nay 3 thoroughly tested expertly implemented classes and no less than 20 lovingly crafted unit tests, exercising ALL of the functionality, i.e. Asking and Answering a question… ahem.. anyway we took the decision to split off and create a question provider and a wrapper for the campfire API. By 6 we had both in place and were ready to rock well apart from some small bugs causing the api to die after a few seconds. By 7.30 however we had these bugs “mostly” conquered.</p>

<p>The result of this project was a reusable game engine which with a few extensions could be used to:</p>

<ul><li>Alert the team that some build has broken on CI and award points for delegating responsibility / fixing </li><li>Spout general knowledge questions from several providers including: Stack Overflow, IMDB and from team members</li></ul><p>The project also produced a working C# Chat API for Campfire which could (with polish) be used to to build a desktop campfire client for windows.  More to follow on this…</p>

<p><img alt="" src="http://media.tumblr.com/tumblr_mbxvumDser1r1hmko.png"/></p>



<hr><p>After a round of show and tell we all had a vote on who’s project we liked most. Drum roll, And the winner is…</p>



<p>Keyboard Demon. Well done Vince and Mark!</p>



<p>By this time it was pub o’clock so we all celebrated with a cold one at the pub.</p>



<p>Some of the teams will be writing up more detailed posts about their games and source code to the games will be available on github shortly.</p>



<p>If you’ve got any ideas for the theme of our next hack day or would like to get involved please let us know in the comments section or on twitter.</p>

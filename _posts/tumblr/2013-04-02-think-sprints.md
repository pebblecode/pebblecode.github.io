---
layout: post
title: Think Sprints
date: '2013-04-02T09:38:08+01:00'
categories: []
tumblr_url: http://blog.pebblecode.com/post/46924330235/think-sprints
author: Mark Durrant
---
<p>During the pebble {code} hack day Tom, Matt, and Mark created Think Sprints. Think Sprints is a visually engaging two player game based around simple maths questions.</p>

<p>The game automatically matches players into pairs, they then compete by taking turns answering questions to move their characters across the screen. Players can communicate whilst playing via in game chat or by video.</p>

<p>You can play think sprints <a href="http://thinksprints.azurewebsites.net/">here</a> (You may need to open the game in two browser tabs if there are no other players online)</p>

<h3>How it was made</h3>

<p>Once the basic idea of the game was planed out the team briefly split in two. Mark started by designing and animating the characters and Matt &amp; Tom started work on the back-end system.</p>

<h3>Designing the characters</h3>

<p>Mark started by sketching out some ideas for simple characters. The style of these characters was largely influenced by the excellent <a href="http://www.youtube.com/watch?v=IJNR2EpS0jw">dumb ways to die</a>.</p>

<p>After the initial sketches these ideas were taken into Illustrator the characters were created in vectors. Then each character was animated by creating 3 frames each for the running and jumping animations. These frames were scaled down and turned into sprites in Photoshop and animated using keyframe animations in CSS. You can see one of the running animations bellow.</p>

<p><img src="http://media.tumblr.com/98dfd34ab3a7b4c1c38e1448d21d0b8b/tumblr_inline_mkmcunNvnU1qz4rgp.gif" alt=""/></p>

<p>As the back-end was built Mark worked on the layout and created styles for all the game elements.</p>

<h3>Building the back-end</h3>

<p>The back-end consists of:</p>

<ol><li>An <a href="http://www.asp.net/mvc">ASP.NET MVC 4</a> application with a single Razor web page.</li>
<li>jQuery was used for all the client side JavaScript.</li>
<li><a href="http://signalr.net/">SignalR</a> was used for two way communication for the player chat and game communication.</li>
<li><a href="https://github.com/HenrikJoreteg/SimpleWebRTC">SimpleWebRTC</a> was used to displaying video in the web page.</li>
<li><a href="http://www.windowsazure.com">Microsoft Window Azure</a> was used to host the game.</li>
</ol><p>The basic game logic was worked out and then SignalR was plugged into the application along with some slightly hacked JavaScript (we were rusty with JavaScript and under a time limit)</p>

<p>The core piece of the application is SignalR which is used for the player chat, global chat, broadcasting the game state to both players and accepting answers from each player. A single hub was used for all communication between the server and the player. Whilst a hub group was used so messages could be sent out to a particular pair of players. Grouping connections allowed us to have multiple concurrent games but only send relevant messages to each game.</p>

<p>The video chat using SimpleWebRTC was added at the last minute since it was incredibly simple to get working with just a few lines of JavaScript.</p>

<h3>Summing up</h3>

<p>Think Sprints was a really fun project to work on, and the whole team was really pleased with the result. The team is hoping to spend some more time on Think Sprints soon to develop it into a even more useful teaching tool.</p>

<p>You can see the git repository <a href="https://github.com/pebblecode/ThinkSprint">here</a></p>

<p>And play the game <a href="http://thinksprints.azurewebsites.net/">here</a></p>

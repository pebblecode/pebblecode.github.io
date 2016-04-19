---
layout: post
title: 'Howl.js: Sharing games through sound'
date: '2013-11-21T10:55:34+00:00'
categories: []
tumblr_url: http://blog.pebblecode.com/post/67649759989/howl-js-sharing-games-through-sound
author: Tak Tran
---
<p>Last week, we were stoked to be accepted into the finals for <a href="https://www.innovateuk.org/web/ictomorrow">ICTomorrow</a>’s Digital Innovation Contest for Games. We entered under Google’s category for “Wider games distribution for mobile web” with Howl.js (<a href="http://pebblecode.github.io/HOWL.js-slides/#/1">slides</a>).</p>

<p>Howl.js is proposed to be an audio protocol for sharing HTML5 games, allowing people to join games and share game information. I developed a prototype which shows how a friend could join a mobile HTML5 game using sound, and also send information back to me using the same sound mechanism (note that you can’t really hear the sound, as it uses high frequency audio - although this can change).</p>

<iframe width="420" height="315" src="//www.youtube.com/embed/grWLvBY4n60" frameborder="0" allowfullscreen></iframe>

<p>(the game is the open sourced <a href="https://github.com/danielmahal/Rumpetroll">Rumpetroll</a> if you were wondering)</p>

<p>The power of sound, as a medium, is that it has really great broadcasting qualities, which means it is exactly the same process when more devices are involved. There is also potential for extending the range of broadcasts through amplifiers. Here is the same sharing process, but this time with more friends:</p>

<iframe width="420" height="315" src="//www.youtube.com/embed/L3bvo519Q8g" frameborder="0" allowfullscreen></iframe>

<p>Other benefits of using sound as a distribution mechanism are</p>

<ul><li>All mobile devices have microphones and speakers - so no extra hardware is needed. This feels very much like the spirit of the open and accessible web that we love so much.</li>
<li>Works in the browser - with developments in the <a href="http://www.w3.org/TR/webaudio/">Web Audio API</a>, all the sound processing can happen in the browser without connecting to a server and downloading any additional plugins</li>
<li>Promotes local play - sound is great for co-located sharing, which has a certain virality to it when you’re with people face to face</li>
</ul><p>Currently, the problem with sharing mobile web games is that the usability is quite clunky. You have to deal with sending and typing in urls and jumping through token hoops (assuming the developers have set this up). Paul Kinlan from Google, during the ICTomorrow presentation breaks, also lamented about how they had came up with the idea of using short token codes a couple of years ago, but not much innovation in mobile web games distribution had happened since then. We believe that sound is an excellent alternative for this purpose, which allows for more seamless, <strong>immediate, co-located sharing - all within the browser</strong>.</p>

<hr><p>We didn’t end up winning the competition, but we did get a lot of positive responses from the judges and the audience, and encouragement to take Howl.js forward. Thanks for that! Congratulations also to <a href="http://peekabu.net/">peekabu studios</a> on winning the category, and good luck with the development of their computer vision product! Good luck to all the others who are carrying their developments forward too! I especially look forward to seeing <a href="http://spacebudgie.com/">spacebudgie</a>’s glitchspace (a first person shooter where you can program your world using a visual programming language), and also <a href="http://owenllharris.com/">Owen Harris’</a> arduino breathing sensor.</p>

<p>I just want to make a shout out to <a href="http://chirp.io/">chirp.io</a> for inspiration on using sound for data transfer; Boris Smus for his brilliant <a href="https://github.com/borismus/sonicnet.js">sonicnet.js</a> library that helped us get started with the demo; and the people behind <a href="https://github.com/danielmahal/Rumpetroll">Rumpetroll</a>, for giving us an impressive open source multiplayer game we could hack on and demo.</p>

<p>Right now, Howl.js is more of an idea and prototype, than a usable solution, but going forward, we’d like to flesh out a library developers can use; and support compatibility between more devices (currently only tested on Nexus 4/7 and Chrome Beta). We may also look into using it as a fallback technology for existing distribution technologies, and there was some interest at the competition for usages outside of gaming. If you want to chat to us about the technology or our work, feel free to <a href="http://pebblecode.com/find-us">contact us</a>.</p>

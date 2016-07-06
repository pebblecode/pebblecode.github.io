---
layout: post
title: IRL Christmas novelty wall
date: '2013-12-17T09:39:45+00:00'
categories: [hacks]
tumblr_url: http://blog.pebblecode.com/post/70279278010/irl-christmas-novelty-wall
author: Tak Tran
---
<p>I’ve recently developed a slight obsession with hardware… so come the <a href="http://blog.pebblecode.com/blog/pebble-hackmas-day-22-people-10-apps-8-hours">pebble Christmas hackday</a>, I found the perfect excuse to play around with the hardware toys I’ve been accumulating…</p>

<p><img src="http://f.cl.ly/items/1o3T2o1W1J2K1q3R190P/Screen%20Shot%202013-12-16%20at%2016-12-2013,%203.47.51%20PM.png" alt="Hardware sprawl"/></p>

<p>The idea of the IRL Christmas novelty wall came from Toby in the morning ideas session. His thought was - how about an app where you can throw snowballs at snow men. My thought was - how about we make that, but IN REAL LIFE! Have an actual wall with sensors that can register things being thrown at it.</p>

<p>With the help of:</p>

<ul><li>an <a href="http://arduino.cc/">arduino</a> to hook up the hardware circuitry</li>
<li><a href="https://github.com/rwaldron/johnny-five">johnny-five</a> library to be able to program the arduino in JavaScript</li>
<li><a href="http://primus.io/">primius</a> library for a web socket connection to the browser to provide immediate feedback of sensors being triggered</li>
<li><a href="http://www.bareconductive.com/store/products/electric-paint-pen-10ml">bare conductive electronic paint</a> to paint in the connections of the circuitry (along with some plain electrical wires)</li>
<li>design skills from Nancy, our new designer, for the snowman/Christmas tree illustrations</li>
</ul><p>…I managed to hack together a snowman game, you could throw (real) things at:</p>

<p><img src="http://f.cl.ly/items/3b1r063r3q2F0b3k421D/Screen%20Shot%202013-12-16%20at%2016-12-2013,%205.24.04%20PM.png" alt="IRL Christmas novelty wall"/>
[<em>Initially we threw a cute toy bunny for testing, but that got vetoed, upon seeing the shock on the faces of the onlooking girls in the office. We used a ball of wool after that instead. All we can say is that the toy bunny was only hurt once in the making of this Christmas game</em>]</p>

<p>The circuitry was actually really simple once I figured out (with the help of Mark) that it was a <em>digital</em> signal, that basically turned on when the snowman’s face was hit, and was off other times. Most of the code to wire it up was in the <a href="https://github.com/rwaldron/johnny-five/blob/master/docs/pin.md">pin example</a> on the johnny five site, and more instructions of the setup are in <a href="https://github.com/pebblecode/christmas-novelty-wall">README.md file</a>.</p>

<p>The vision was to create a playful Christmas themed novelty wall with a variety of other sensors including light sensors for lighting up a star, pressure sensors to press on Rudolphs nose, and a microphone to tell Santa your Christmas list - but alas, 8hrs was not enough time to finish off the novelty wall. I did hook up the light sensor to make the web site background turn yellow though.</p>

<p><img src="http://f.cl.ly/items/1M0r1f2q1u0c08020U2x/Screen%20Shot%202013-12-16%20at%2016-12-2013,%205.25.05%20PM.png" alt="Lighting the Christmas tree"/></p>

<p>For those interested, the code is on <a href="https://github.com/pebblecode/christmas-novelty-wall">github</a>. Instructions on how to set it up are also in the <code>README.md</code> file. Enjoy.</p>

<p>Also, Merry Christmas everyone!</p>

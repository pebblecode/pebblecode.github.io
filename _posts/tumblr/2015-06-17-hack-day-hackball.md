---
layout: post
title:  Hack Day - Hackball
date:   2015-06-17 11:20:20
author: Niall Henn
categories: [hacks, fussball, table football, raspberry pi, node js, socket io, soccer]
tumblr_url: http://blog.pebblecode.com/post/121746844291/hack-day-hackball

---
<h2>What was problem you originally pitched?</h2>

<p>In January 1815, Napolean and the Duke of Wellington met to settle their differences over a game of table football. It was a long and heated match with neither side having a clear upper hand. After a few hours of terrific shots and fantastique saves, an argument broke out:</p>

<p>The Duke thought he had just scored his 10th and final goal, whereas Napoleon said it was the 9th and the Duke had one more to go.</p>

<p>With no way of keeping track of the score, the fight turned ugly and 6 months later gave rise to the battle of Waterloo.</p>

<img alt="Battle of Waterloo!" src="http://41.media.tumblr.com/2659483a11c74cdf2ef2dc6b9d133adf/tumblr_inline_nq33npUkBG1rvocwd_500.jpg">

<p>We’ll never know what the actual score was on that fateful day, but we aimed to prevent disagreements like this from happening again.</p>

<p>So we set out to augment the office table football table; a device that’s very good at hitting balls but very bad at tracking scores and playing sound effects.</p>

<p>We wanted to build something that would capture and log goals, and add a couple of nice extras to make the office kitchen feel like Wembley.</p>


<h2>What did you build?</h2>

<h3>Hackball!</h3>

<p>We made a server with a fancy front end (straight out of Sensible Soccer) that could be accessed by any device on the network. You could log in and start a game, and view the current score in a browser.</p>

<p>When goals were scored, you pressed some sweet arcade style buttons and the server updated the score in real time, as well as playing a couple of ‘goooaaallll!’ sound effects.</p>

<img alt="Game Scores" src="http://40.media.tumblr.com/3007f11d3ba26cde71968eaae2c1ae2a/tumblr_inline_nq33qecgWf1rvocwd_500.jpg">

<img alt="Intro Screen" src="http://41.media.tumblr.com/a4d5652ac3b321df2d649864d8b8ecbf/tumblr_inline_nq33qwpGcl1rvocwd_500.jpg">


<h2>What tech / magic / sorcery did you use to make this awesomeness?</h2>

<img alt="How it works" src="http://41.media.tumblr.com/6bf25a68b088ee5d47a7734c9f7f76f5/tumblr_inline_nq33psc4Hx1rvocwd_500.jpg">

<p>We had a node.js server running on the Raspberry pi, listening to button presses on the Raspberry pi GPIO ports, using the node GPIO library, and a custom extension named <a href="https://www.npmjs.com/package/pinhead">'Pinhead’</a>.
The server displayed the scores over the network, which was updated with <a href="http://socket.io">Socket.io</a> whenever a goal happened.</p>

<p>Sounds were triggered both through the raspberry pi’s audio socket, and on the front end.</p>


<h2>What were the big gotcha’s?</h2>

<p>We ran into a couple of issues getting node to read the (analogue) sensors that were intending to register goals, so we had to emulate that by pressing buttons instead.</p>

<p>The rpi-gpio package was quite limited in detecting changes in the pins (which happens when a goal was scored). We ended up putting together a new npm package which allows users to easily monitor any raspberry pi pins for changes: <a href="https://www.npmjs.com/package/pinhead">https://www.npmjs.com/package/pinhead</a></p>


<h2>What's next?</h2>

<p>Well we think we’ve solved reading the analog sensors on the pi, so hopefully there’ll be no need to log the goals manually with buttons anymore.</p>

<h4>A couple of other next steps are:</h4>
<ul>
  <li>Log players scores and give a global league of top players in the company</li>
  <li>Integrate it with Slack, our internal messaging system</li>
  <li>Add a matchmaking option for solo players wanting to find someone to play against</li>
  <li>Add a option to change ‘goal’ voice - Alan Partridge, Jon Motson</li>
</ul>

---
layout: post
title: Olympics hackery
date: '2012-07-25T12:19:00+01:00'
tags: []
tumblr_url: http://blog.pebblecode.com/post/27976232997/olympics-hackery
author: Tak Tran
---
<p>In preparation for the London Olympics, we did some hacking a while back in our <a href="http://pebblecode.tumblr.com/blog/hack-day-live">pebble {code} hack day</a>, and from that work, we’ve created a data visualisation and JSON API for <a href="http://pebblecode.com/olympic-data-vis">Olympic medals won</a>.</p>

<p><img src="http://media.tumblr.com/tumblr_m7pqv2PnAx1qdcl2v.jpg" alt="Olympic data visualisation"/></p>

<p>This data visualisation is the culmination of 2 different projects we worked on during the hack day - a backend JSON API for Olympic medal information, and to visualise it, a front end data visualisation using JavaScript.</p>

<h2>Back end JSON API</h2>

<p>Early on on the hackday, we came to the realisation that there were not really any developer friendly ways of finding Olympic statistics. So to scratch our own itch, we decided that we’d build our own API. Alex set out to do that, with his <a href="http://en.wikipedia.org/wiki/F_Sharp_(programming_language)">F#</a> wizardry, using the <a href="http://www.asp.net/web-api">.NET MVC4 Web API</a> framework.</p>

<p>The API is currently only privately used, but if you’d like to use the API for your own projects, give us a shout at <a href="mailto:info@pebblecode.com">info@pebblecode.com</a>, and we’ll see what we can do.</p>

<p>The Olympics data is sourced from <a href="http://databaseolympics.com/">database olympics</a>, who have been gracious enough to let us use their data.</p>

<h2>Front end data visualisation</h2>

<p>On the front end side, during the hackday, we did a preliminary round of research in graphing and visualisation libraries available, and we ended up settling on the funky <a href="http://d3js.org/">d3 library</a>. Others we had a quick look at were either too low level and would require more time than was available to learn eg, <a href="http://raphaeljs.com/">Rapael</a>, <a href="http://paperjs.org/">PaperJS</a>, and <a href="http://processingjs.org/">ProcessingJS</a>; or were too high level and restricted what you could visualise eg, <a href="https://developers.google.com/chart/">Google chart tools</a>. <a href="http://misoproject.com/dataset/">Miso Dataset</a> is also worth mentioning too, as it looks interesting for manipulating data, but not what we wanted. D3 was the perfect level of abstraction for our needs. It did have a bit of a learning curve, but it was very flexible in what it can do and quite elegant looking too. Plus it had 
<a href="https://github.com/mbostock/d3/wiki">great documentation</a>, and <a href="https://github.com/mbostock/d3/wiki/Gallery">examples</a>.</p>

<p>As a side note, I later happened to be in San Francisco, at a <a href="http://www.meetup.com/Bay-Area-d3-User-Group/events/63143652/">d3 meetup</a>, where <a href="http://en.wikipedia.org/wiki/Ward_Cunningham">Ward Cunningham</a> presented, and was a <a href="https://groups.google.com/forum/?fromgroups#!topic/d3-js/gIW4DG_bjZs">great fan</a> too.</p>

<p>Another aspect of the front end worth mentioning is the splash of <a href="http://backbonejs.org/">backbone js</a> in it. I’ve really started to fall in love with it after using it in <a href="http://vistazoapp.com">Vistazo</a>. It really makes JavaScript more of a <a href="http://opensoul.org/blog/archives/2012/05/16/the-plight-of-pinocchio/">first class citizen</a>, by making you think about how to structure your front end code in a MV* format, which is very intuitive for most web apps. It’s like seeing JavaScript suited up, rather than a slob of hacked together jQuery methods.</p>

<p>In terms of the graph, we use a <a href="http://mbostock.github.com/d3/ex/treemap.html">treemap</a> inspired by infographics such as the <a href="http://www.informationisbeautiful.net/visualizations/the-billion-dollar-gram/">billion dollar gram</a> and the <a href="http://www.guardian.co.uk/news/datablog/2009/nov/27/billion-pound-gram-inormation-beautiful">billion pound gram</a>. We chose it because it nicely shows comparisons of medals between countries, with intuitive transitions that go with it, to compare the different years.</p>

<h2>Enjoy!</h2>

<p>If you are a developer, let us know if you’re interested in using the API (<a href="mailto:info@pebblecode.com">info@pebblecode.com</a>). If APIs aren’t your thing, enjoy the <a href="http://pebblecode.com/olympic-data-vis">pretty graph and animations</a>. Also, have fun with the Olympics! Hopefully, we get more of this sun!</p>

<p>PS. Mark and I will also be attending the <a href="http://mmxiihack.org/info">Londinium MMXII</a> hackday this weekend too, so say hi if you’re around.</p>

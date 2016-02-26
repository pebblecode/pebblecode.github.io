---
layout: post
title: First hack for Mr Black.
date: '2015-02-06T17:52:33+00:00'
tags: []
tumblr_url: http://blog.pebblecode.com/post/110263416971/first-hack-for-mr-black
author: Ian Black
---
<p>It’s 9am on the last Friday of the month and all I can think about is hard liquor. Scottish Single Malt Whisky to be precise. Smokey, delicate, rich or light - today I’m just dying to get stuck in.</p>

<p><!-- more --></p>

<p>But don’t worry, I wont be knocking back any drams just yet. In fact I don’t plan on drinking it at all. All I care about this morning is information. It’s the first pebble {code} hackathon of the year and the theme is Data Visualisation. My stomach is full of pastry, and eight hours are put on the clock. We have one day to try and create something new with any dataset of our choosing. Armed with nothing but my mac and the infinite knowledge of the internet, I set to work.</p>

<h3>My plan</h3>

<p>
To create an interactive version of the whisky flavour map that links each whisky to a map of distillery locations.</p>

<p><img src="https://31.media.tumblr.com/26162105c06655e2589b1f760df3f5d0/tumblr_inline_njd24btDCJ1qetc8f.png" alt="image"/></p>

<h3>My tools</h3>

<p>Html, css, D3.js (a JavaScript library for manipulating documents based on data) and Leaflet.js (a open-source JavaScript library for interactive maps).</p>

<h3>The hack</h3>

<p>Things got off to a good start when a fellow Pebbler revealed he already had a large database of whisky names, flavours and location data. Progress rapidly halted when the location data turned out to be an obscure grid referencing system I wasn’t sure how to work with. Keen to get coding rather than resolving the finer points of coordinate types, I opted for a manual approach to starting my data set. I selected 5 whiskeys from the map, searched their locations online and quickly shoved the information in to a CSV file.</p>

<p>I fleshed out a visual design in Illustrator. I started with a colour scheme, selected a typeface from Google Fonts and drew up a chart. A went for a simple single-page design, with flavour profiles on the left and the map on the right, knowing time was not on my side.
<img src="https://31.media.tumblr.com/5c2771539f4d053aa8d3548ad0fa920f/tumblr_inline_njd24wXWul1qetc8f.png" alt="image"/></p>

<p>I extracted the SVG content and used this to map the flavour data. The right hand side would bring in a raster map of Scotland using leaflet. Using D3 I could geo-locate each distillery. I had to load the data in to each side separately. I had never tried to link two graphs before, and my JS knowledge is quite limited, so the greatest challenge was working out how I could read information from one side, and then search the other for a matching pair. By attaching id’s to each point on the data load I eventually managed to solve this, while brushing off the cobwebs from my knowledge of writing functions with variables in JS.</p>

<p>With a working prototype, I refined the page design some more, added a pile of extra data to my source file, and included an introductory page. I was then able to start adding finer details like transitions and colour changes to enhance the experience. I was just beginning to add in new variables, like whisky age, when the clock stopped.</p>

<p><a href="http://pebblecode.com/whisky_map/" title="Whisky map link">Showtime</a> </p>

<p><img src="https://31.media.tumblr.com/4b800993cc0c9a22b6ba2c4fdc506257/tumblr_inline_njd259iSDZ1qetc8f.png" alt="image"/><img src="https://31.media.tumblr.com/2b6bb01bbccab7e79216bcf9bf273e45/tumblr_inline_njd25iDH1t1qetc8f.png" alt="image"/></p>

<p>I stepped up to the challenge of presenting first, hoping my extreme daring would reap rewards in the final voting. Luckily my design worked without a hitch first time. I was feeling confident, but after seeing what the rest of the contenders had produced, I knew any hopes of a win were pretty slim.</p>

<p>A leaderboard went up and people gathered round to cast their votes. The Whisky map was looking popular. I could see it was going to be a tight race. As the votes were counted I held my breath…</p>

<p>…but it’s the taking part that counts right?</p>

<p><a href="https://github.com/pebblecode/whisky_map">(You can see the source coded here on githup)</a></p>

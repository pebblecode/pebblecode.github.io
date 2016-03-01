---
layout: post
title: The Periodic Table of Colours
date: '2015-02-03T15:09:00+00:00'
categories: [hacks]
tumblr_url: http://blog.pebblecode.com/post/109979021336/the-periodic-table-of-colours
author: Mark Durrant
---
<a href="http://pebblecode.com/periodic-table-of-color/">The Periodic Table of Colours</a> is a simple visualisation of all the colours present in the current HTML <a href="http://www.w3.org/TR/css3-color/#svg-color">extended color keywords</a> spec. I created it at pebble {code}’s recent data visualisation hack day.

<img src="https://31.media.tumblr.com/b6406d3767cdf3a87304bdfb2a7686a9/tumblr_inline_nj71h2qceF1r1hmko.png" alt="Periodic Table of Colours" style="display:block;margin:auto;"/>
<!-- more -->
<p>I had originally planed to visualise an entire colour space such as RGB, HSL, or LAB. However these colour spaces have been expertly visualised several times before. For example Tauba Auerbach’s <a href="http://www.taubaauerbach.com/view.php?id=286">RGB Color Space Atlas</a>.</p>
<img src="https://31.media.tumblr.com/5598ee473bd5f307eade6ac96d3e32f6/tumblr_inline_nj71hbpUW71r1hmko.jpg" alt="RGB Color Space Atlas - Tauba Auerbach" style="display:block;margin:auto;"/><p>The extended colour keywords spec is a list of all the named colours that can be used in HTML &amp; CSS. I found the extra dimension of colour names to be an interesting twist on the standard mathematical models of colour.</p>
<p>Looking at all the colour name and hex code variations I was reminded of the periodic table. The combination of names and hex codes reminded me of the names and symbols for each of the elements, and the distinct colours reminded me of the periodic tables group.</p>
<p>After turning the 35 colour names and hex values from the spec into JSON I used <a href="https://github.com/bgrins/TinyColor">TinyColor.js</a> to get the RGB &amp; HSL (hue, saturation, &amp; lightness) values for each colour. This gave me analogue for the atomic number and mass for my colour table.</p>
<p>Next I spent a large part of the day learning about and using the new viewport based vw &amp; vh CSS units. For a great overview of the vw &amp; vh units checkout <a href="http://css-tricks.com/viewport-sized-typography/">this article</a> by Chris Coyier on <a href="http://css-tricks.com/">css-tricks.com</a>.</p>
<p>Chris talks in depth about using the new units for simple responsive typography. However I found another compelling use-case. Using viewport based units is a great way to create responsive shapes with a fixed ratio by using either vw or vh units for both the width and height of a shape.</p>
<p>In the The Periodic Table of Colours I’m using vw units to create responsive squares but the same technique could be used to create responsive shapes of any ratio. For example…</p>
<pre><code>/* create a responsive square over half the viewport */.square {
  width: 50vw;
  height: 50vw
}

/* create a responsive rectangle using the golden ratio */
.gilded-rectangle {
  width: 16.18vh;
  height: 10vh;
}</code></pre>
<p>Using these new viewport based CSS units made it much easier to create the periodic table inspired design I was aiming for and make it fully responsive.</p>
<p>After finalising the design I used the great <a href="http://isotope.metafizzy.co/">Isotype</a> library by <a href="http://v3.desandro.com/">David DeSandro</a> to give some basic sorting based on the name, hue, saturation, and lightness of each colour.</p>
<p>Whilst this wasn’t the most technically challenging hack I’ve ever undertaken it was great to work on a more design-focused project.</p>
<p>This just goes to show that hackathons aren’t just about technology. We can also use the hackathon structure to rapidly solve problems with design and produce high quality visual work.</p>

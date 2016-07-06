---
layout: post
title: Noisy URIs
date: '2013-02-15T09:39:56+00:00'
categories: []
tumblr_url: http://blog.pebblecode.com/post/43139609779/noisy-uris
author: Mark Durrant
---
<p>Recently I released a little open source project, Noisy URIs. So here’s a post about what it is, why I made it, and how I made it.</p>

<h3>What it is</h3>

<p>Noisy URIs (unique resource identifiers) is a set of ready-made noise images as data URIs. In Sass, LESS, and vanilla CSS flavours.</p>

<p>Data URIs are resources (such as images) converted into text so that they can be used with webpages without referencing external files. A great explanation of data URIs can be found on <a href="http://css-tricks.com/data-uris/">CSS-Tricks.com</a>.</p>

<h3>Why I made it</h3>

<p>Noise images are very useful in web design for adding a little texture to elements. When you’re designing in Photoshop it’s simple to adjust the opacity and style of these noise images. Unfortunately this isn’t possible if you’re designing in the browser.</p>

<p>To solve this problem, I created some generic noise images that I can use within my CSS to easily change the opacity and style.</p>

<p>As well as being easer to use when designing in a browser, data URIs have the added benefit over image files in that they don’t require an extra http request, improving your page performance.</p>

<h3>How I made it</h3>

<p>First I created a Photoshop file of each noise image. Then I created a separate layer for each opacity level. This let me output a set of .pngs for each noise image. These images were then optimised with <a href="http://imageoptim.com/">ImageOptim</a>.</p>

<p>Now I had a set of images I needed to turn into data URIs. For this I used <a href="https://github.com/mhuckaby/image2cssConverter">image2css</a>. I’ve got to say a big thank you to Vince for helping me get this working.</p>

<p>When I had the raw data URIs, I added some code around each one to turn them into useable Sass and LESS variables as well as CSS classes.</p>

<h3>Get involved</h3>

<p>Go <a href="http://markdurrant.github.com/noisy-uris/">here</a> to see the Noisy URIs in action and download the source files. Or go <a href="https://github.com/markdurrant/noisy-uris">here</a> to view the project on Github.</p>

<p>Leave a comment if you have any suggestions for improvements or fork the repo on Github if you’ve got ideas for making Noisy URIs better.</p>

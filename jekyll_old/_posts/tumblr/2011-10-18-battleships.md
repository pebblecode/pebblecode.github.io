---
layout: post
title: Battleships
date: '2011-10-18T10:26:55+01:00'
categories: [dotnet, fsharp, games]
tumblr_url: http://blog.pebblecode.com/post/11607802493/battleships
author: Alex Butcher
---
<p>I recently blogged about our recruitment process for new developers - we ask prospective candidates to write some code for us before we&rsquo;ve met them, this code then forms the basis of a face to face interview. One of the problems we&rsquo;ve asked candidates to solve in the past is the game of battleships.  I recently got into a discussion with a candidate about their particular implementation and noted that there was probably a good opportunity to simplify the code with functional programming, and I said I&rsquo;d follow it up after the interview&hellip; Turns out the best way to answer that question is to write Battleships in F# :)  The full code is on Github, and comes in at 133 LOC, which includes plenty of comments.  I thought I might share some of my observations about how the F# code is quite nice and simple:</p>

<p>Randomising start positions</p>

<p>To make sure that we try to place each ship on a random square of the board, I decided to build a sequence containing every possible start position, and randomise the sequence.  </p>

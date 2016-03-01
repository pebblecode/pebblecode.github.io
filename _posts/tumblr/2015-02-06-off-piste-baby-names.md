---
layout: post
title: Off Piste Baby Names
date: '2015-02-06T14:21:00+00:00'
categories: [hacks]
tumblr_url: http://blog.pebblecode.com/post/110250692406/off-piste-baby-names
author: John Mildinhall
---
<a href="http://pebblecode.com/babynames/">Off Piste Baby Names</a> is a hack that I created for the pebble {code} data visualisation hackday on 30 January 2015. The <a href="http://www.ons.gov.uk/ons/publications/re-reference-tables.html?edition=tcm%3A77-318125">ONS baby names dataset</a> has been something that I have been aware of for some time. I had noticed some pretty unusual baby names in the data before, and I decided that I&rsquo;d like to do something that exposes some of the themes that people seem to follow when they go &ldquo;off piste&rdquo;, in other words when they select names for their children that are not considered to be traditional.


<p>Since I had the raw baby names data, it was up to me to generate the themes. I went through the 10,000 or so names for both boys and girls that were given at least 3 times to babies in 2013, extracting names that I thought were unusual, funny or note-worthy in some other way. There were no strict criteria for this, other than my own personal reaction to the names. These names seemed to cluster together in specific ways, so I started applying categories to these names. For example</p><blockquote><div>Autumn-Willow <br/>Summer-Rose <br/>Winter-Rose<br/></div></blockquote><p>All combine a season with some sort of plant, so the theme &ldquo;season/vegetation&rdquo; category was born. Similarly, the names </p><blockquote><div>Isis <br/>Lolita<br/>Berk<br/>Nadir<br/>Nimrod<br/></div></blockquote><p>all have negative connotations, and resulted in the creation of the category &ldquo;doomed&rdquo;. Names can belong to more than one category, creating a complex graph between the names in the data set.</p><figure><img src="https://31.media.tumblr.com/56fafcb2b7eabe577cad10b7ce325d36/tumblr_inline_njcnllISWU1svon23.png" alt="image"/></figure><p>My initial intentions, since this was a data visualisation hack, was to create an interactive D3.js visualisation of the data, along the lines of the graph above. Unfortunately I ran out of time to get to grips with D3 before the day, so I limited myself to creating a way of navigating through the network on the basis of categories. </p><p>I formatted the data as json, with three different data sets - Names, Categories, and Edges (specifying the relationship between the categories). Wrangling the data turned out to be rather easy - a set of functions that pulled out baby names on the basis of a category, and categories on the basis of baby names. I would probably have re-factored the code to separate the data layer from DOM manipulation more, but the constraints of a hack day were too much for this.</p>
<pre><code>//Name
{
  'Index': '190',
  'Name': 'JACK-DANIEL ',
  'sex': 'boy',
  'n': '3',
  'rank': '4685'
}

//Category
{
  "Number": "31",
  "Category": "booze"
}

//Edge
{
  "number": "457",
  "name": "JACK-DANIEL ",
  "category": "booze"
}</code></pre>

<p>I&rsquo;m hoping this will be the last hack day where I use jQuery. Not being a proper developer, I feel that it makes me more liable to write bad code, do things that <i>just feel wrong, </i>and it is hard to structure it sensibly and keep clean. I also really hope I have written my last $(&rsquo;.class&rsquo;).clone() function. This method of populating the DOM with your data is singularly loathsome, and nearly always results in hours of wrist-slitting debuggery. Maybe I just need to be a better programmer. Or perhaps angular.js is the answer.</p>

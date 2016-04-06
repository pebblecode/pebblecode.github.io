---
layout: post
title: pebblecode.com gets a makeover | part two development
date: '2014-03-17T14:24:00+00:00'
categories: []
tumblr_url: http://blog.pebblecode.com/post/79869060242/pebblecode-com-gets-a-makeover-part-two
author: Mark Durrant
---
<p>pebblecode.com recently got a makeover. This post is going to be about the development and the tech used. If you’d like to learn about the design process you can see part one of the story <a href="http://blog.pebblecode.com/blog/pebblecode-com-gets-a-makeover-part-one-design">here</a>.</p>

<h3>Design lead</h3>

<p>When the design team was given the brief for the new pebble sites, we were told that the project should be ‘design lead’ and we took this to heart straight away. When designing for the web it’s possible to let development concerns limit your creativity and this was something we were weary off from the start.</p>

<p><!-- more --></p>

<p>Whilst this approach was very successful at the start it later became challenging when we came to implement our designs. We ended up with some very heavy pages and an over-reliance on javascript for some of the more complicated layouts.</p>

<p>A great example of this was the <a href="http://pebblecode.com/people">people page</a>. We started off with a beautiful but complicated design that required a lot of javascript to function properly. The complicated markup and layout meant that adding people to the page would have been very difficult. We’ve now transitioned to 100% CSS based layout and much less markup that whilst still beautiful is now much easier to maintain.</p>

<p>What we learnt through this is that no project should be ‘design lead’ or ‘development lead’. Design and development concerns should have equal importance and be considered from the very beginning of each project.</p>

<p>Previously <a href="http://pebblecode.com/">pebblecode.com</a> was a <a href="http://www.sinatrarb.com/">Sinatra</a> based ruby app hosted on <a href="https://www.heroku.com/">Heroku</a>. We&rsquo;ve now transitioned to a 100% static site hosted on <a href="http://pages.github.com/">Github Pages</a> and we&rsquo;re using <a href="http://gruntjs.com/">Grunt</a> and <a href="http://assemble.io/">Assemble</a> generate the site.</p>

<h3>two sites one codebase</h3>

<p>As mentioned in the previous post we have been designing not one but two new sites <a href="http://pebblecode.com/">pebblecode.com</a> and <a href="http://pebbleit.com/">pebbleit.com</a>. We wanted the sites to be similar in structure but obviously there would also be a lot of differences. Because of this we used Assemble and Grunt to generate the two separate sites from a single codebase.</p>

<p>To this effect our grunt project had this structure</p>

<pre><code>Gruntfile.js
package.json
/code
  /data
  /img
/it
  /data
  /img
/shared
  /sass
  /js
  /templates
</code></pre>

<p>The sites used the same templates written in <a href="http://handlebarsjs.com/">Handlebars</a> with different data in JSON format. This made dealing with the markup for the separate sites very easy as there was a lot of overlap.</p>

<p>The CSS was more of a challenge. We use <a href="http://sass-lang.com/">SASS</a> at pebble as our pre-processor of choice. We structure our SASS as one master file that only has @includes to other SASS files to generate our CSS. To generate two separate stylesheets from one SASS codebase we use a small function that looks for a variable declaring which stylesheet to output. This allows us to write css for the two sites inline. Here is an example.</p>

<pre><code>// 1st value is for {code} site 2nd is for .it site
@function which-pebble ( $value1, $value2 ) {
  @if $which-pebble == code{
    @return $value1;
  }

  @else {
    @return $value2;
  }
}

.site-header {
  background: which-pebble($pc-pink, $it-blue);
}
</code></pre>

<p>In a post on the previous pebblecode.com redesign we lamented not using a ‘mobile first’ approach to our development; we rectified this with the new sites. However there are still improvements to be made. Currently all of our media queries are in a single file which is quite difficult to read. We will be refactoring to use inline media queries soon.</p>

<p>In the previous post on the design process <a href="http://blog.pebblecode.com/blog/pebblecode-com-gets-a-makeover-part-one-design">here</a> I mentioned that the site felt more dynamic because of the use of animation. We use a lot of <a href="http://css-tricks.com/almanac/properties/t/transition/">CSS transitions</a> as well as <a href="http://css-tricks.com/almanac/properties/t/transform/">CSS transforms</a>. CSS transitions are a hugely powerful feature that allow you to animate between two state very easily. If you’re not yet using them in your project we highly suggest taking a closer look.</p>

<h3>hosting</h3>

<p>One of the great things about static sites is that they can be hosted virtually anywhere. We decided to go with <a href="http://pages.github.com/">Github Pages</a> because it’s free (as in beer), very easy to deploy to (just a git push), and it works well within our workflow. If you’re planning to host anything static then <a href="http://pages.github.com/">Github Pages</a> is definitely worth a look.</p>

<p>That’s a small rundown of the tech used on <a href="http://pebblecode.com">pebblecode.com</a>. Would you have done anything differently or would you like to learn more about any of the topics discussed? Let us know on twitter</p>

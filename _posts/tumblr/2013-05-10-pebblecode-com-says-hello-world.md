---
layout: post
title: pebblecode.com says “Hello world”
date: '2013-05-10T17:11:37+01:00'
categories:
- pebblecode.com
tumblr_url: http://blog.pebblecode.com/post/50094817025/pebblecode-com-says-hello-world
author: Tak Tran
---
<p>The pebblecode.com website is now on <a href="https://github.com/pebblecode/pebblecode.com-site">github</a> for those interested in taking a peak.</p>

<p>You’ll notice that it’s a bit of a polyglot. <a href="http://sinatrarb.com">Sinatra</a> is the base, but there is increasingly more and more JavaScript sprinkle, with technologies such as <a href="http://requirejs.org/">requirejs</a> and <a href="http://backbonejs.org/">backbonejs</a>. We’ve also been testing with <a href="http://rspec.info/">rspec</a>, <a href="https://github.com/guard/guard">guard</a>, and <a href="http://casperjs.org/">casper</a>.</p>

<p>The development workflow has also been eased with the help of tools such as <a href="http://rake.rubyforge.org/">Rake</a> and <a href="http://gruntjs.com/">Gruntjs</a>. They allow us to do some nifty 1 line commands such as</p>

<pre><code># start the server
bundle exec rake server

# deploy to staging (and generating optimized assets beforehand)
bundle exec rake shipit[staging]

# run all tests
bundle exec rake test:all[http://localhost:7100/]

# build optimized assets
grunt build
</code></pre>

<p>If you are curious, you can have a look at the <a href="https://github.com/pebblecode/pebblecode.com-site/tree/master/lib/tasks">Rake tasks</a> and the <a href="https://github.com/pebblecode/pebblecode.com-site/blob/master/Gruntfile.js">Gruntfile.js file</a>.</p>

<p>The <a href="http://pebblecode.com">pebblecode.com</a> site, apart from being our public face, is also a platform for us to play around and try new things. Feel free to do the same with the code, and send us any comments you have. Or if you find bugs, you can <a href="https://github.com/pebblecode/pebblecode.com-site/issues/new">report them on github issues</a> =)</p>

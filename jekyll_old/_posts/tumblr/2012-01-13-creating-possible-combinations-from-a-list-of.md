---
layout: post
title: Creating possible combinations from a list of lists in F#
date: '2012-01-13T09:59:35+00:00'
categories: [fsharp]
tumblr_url: http://blog.pebblecode.com/post/15769678315/creating-possible-combinations-from-a-list-of
author: Daniel Bradley
---
<p>Just a short post after I came across an interesting problem while learning F# and couldn’t find any great resources to solve what seems to be quite a generic problem.</p>
<p>The scenario is:</p>
<ol><li>You have a list of lists where each of the inner lists contains 1 or more element. </li>
<li>You want to find all possible combinations where you take precisely one element from each inner list.</li>
</ol><p>The example of where I found this problem is calculating the possible value of a hand in blackjack:</p>
<ul><li>You have a set of cards </li>
<li>Each card has a value </li>
<li>Ace has both the value 1 and 11 at the same time </li>
<li>You might be holding more than 1 ace</li>
</ul><p>Therefore we want to be able to calculate the possible values the card could be determined to have.</p>
<p>We represent the value of each card as a list. The five of hearts is [5], the jack of clubs is [10], and the ace of spades is [1;11]. If you hold all three of these cards in your hand you can either make 16 or 26.</p>
<p>We would represent this hand as [[5];[10];[1;11]] and would ultimately aim to get our results in the form [16;26]. However as an intermediate step we want to transform our hand into a list of possible card values such as [[5;10;1];[5;10;11]] which we can then simply sum to get our result.</p>
<p>Here’s the function that recursively expands all combinations, returning a list of each combination of items.</p>
<pre class="code"><span>let rec </span>combinations (l) =
    <span>match </span>l <span>with
    </span>| [] <span>-&gt; </span>[]
    | h::[] <span>-&gt; </span>h |&gt; List.map (<span>fun </span>opt <span>-&gt; </span>[opt])
    | h::t <span>-&gt;
        </span>combinations t
        |&gt; List.map (<span>fun </span>tOpts <span>-&gt;
            </span>h |&gt; List.map (<span>fun </span>hOpt <span>-&gt; </span>hOpt ::tOpts))
        |&gt; List.concat
</pre>
<p>Essentially, a quick line by line run through is:</p>
<ol><li>To cover all cases, if this is called with an empty list, just return an empty list. This is not used in the recursion. </li>
<li>If we are looking at the last list of options then return each option as a new list containing only itself. </li>
<li>If we are in the middle of the list (or equally the start) then get the combinations of the tail option lists giving us a list of combinations. </li>
<li>For each combination,:  <ol><li>For each option in the current set of options  <ol><li>Add the option to the beginning of each of the tail combinations</li>
</ol></li>
</ol></li>
<li>Flatten the list of tail combinations of head options to outcome list to a list of outcome lists.</li>
</ol>

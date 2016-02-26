---
layout: post
title: Contextual bindings with Ninject
date: '2012-06-19T09:10:00+01:00'
tags: []
tumblr_url: http://blog.pebblecode.com/post/25423911537/ninject-contextual-bindings
author: Joseph Jeganathan
---
<p>Contextual binding is a very useful and powerful feature of Ninject. There are several <a href="https://github.com/ninject/ninject/wiki/Contextual-Binding" title="Contextual binding">different ways</a> to do contextual binding in ninject, an appropriate one must be used based on the problem you are trying to solve. </p>
<p>I&rsquo;ve recently faced an interesting ninject binding problem. I needed to generate prices for a number of financial instruments. Each instrument has an <em>InstrumentType</em> property, for each <em>InstrumentType</em> there is different concrete price-builder implementation. I wanted to do binding using ninject in such a way to load a relevant concrete price-buider depending on the instrument&rsquo;s <em>InstrumentType</em>.</p>
<p>A simplified version of my actual code from the project is extracted as an example here. <em>Instrument </em>has an <em>InstrumentType</em> property, and the price calculation (using price-builders) will differ for every instrument type. <em>IPriceBuilder</em> is an interface which has the signature for <em>calculating prices</em>. </p>
<p><strong>Interface and concrete price-builder implementations:</strong></p>
<pre><code class="code">public interface IPriceBuilder { } <br/>public class EquityPriceBuilder : IPriceBuilder <br/>{<br/> public EquityPriceBuilder(Instrument instrument) { } <br/>}<br/>public class FuturePriceBuilder : IPriceBuilder <br/>{<br/> public FuturePriceBuilder(Instrument instrument) { } <br/>}<br/><br/><br/>public class Instrument<br/>{ <br/> public string Name { get; set; } <br/> public InstrumentType InstrumentType { get; set; } <br/>} <br/><br/>public enum InstrumentType { Unknown, Equity, Future }</code></pre>
<p><strong>Initial client code:</strong></p>
<pre><code class="code">List instruments = new List();<br/>instruments.Add(new Instrument { Name = "Equity Instrument", InstrumentType = InstrumentType.Equity });<br/>instruments.Add(new Instrument { Name = "Future Instrument", InstrumentType = InstrumentType.Future });<br/>foreach (Instrument instrument in instruments)<br/>{<br/> //load an appropriate price builder class based on instrument type<br/>IPriceBuilder builder = kernel.Get&lt;IPriceBuilder&gt;(/*get an appropriate builder*/);<br/>}<br/></code></pre>
<p>Extended attribute classes of Ninject&rsquo;s <em>ConstraintAttribute </em>is useful to derive our own constraints. This filters the set of eligible bindings for injection into a target. </p>
<p>In our case the caller should pass the <em>instrument </em>as a constructor argument, also the concrete price builder class is based on <em>InstrumentType</em>. </p>
<p>The metadata binding mechanism in Ninject is useful in this particular contextual-binding problem. </p>
<p><strong>Ninject contextual Binding:</strong></p>
<pre><code> public class BindingModule : NinjectModule <br/>{<br/>public override void Load() <br/>{<br/>Bind&lt;IPriceBuilder&gt;().To&lt;EquityPriceBuilder&gt;.WithMetadata("InstrumentType", InstrumentType.Equity);<br/>Bind&lt;IPriceBuilder&gt;().To&lt;FuturePriceBuilder&gt;.WithMetadata("InstrumentType", InstrumentType.Future);<br/> }<br/> }</code></pre>
<p>IPriceBuilder is bound to two concrete price builders with Metadata.</p>
<p><strong>Final client code:</strong></p>
<pre><code> foreach (Instrument instrument in instruments)<br/> {<br/> //load an appropriate price builder class based on instrument type<br/> IPriceBuilder builder = kernel.Get&lt;IPriceBuilder&gt;(<br/>metadata =&gt; metadata.Has("InstrumentType") &amp;&amp; <br/>instrument.InstrumentType == metadata.Get&lt;InstrumentType&gt;( "InstrumentType",<br/> new ConstructorArgument("instrument", instrument));<br/> }<br/></code></pre>
<p>The client code gets the right price builder for every instrument, and the caller passes an instrument as a constructor argument to build a price for the instrument.</p>

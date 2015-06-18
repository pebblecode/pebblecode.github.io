---
layout: post
title: 'IoC containers: where you define the seams of applications'
date: '2013-04-10T10:56:17+01:00'
tags: []
tumblr_url: http://blog.pebblecode.com/post/47610793806/ioc-containers-where-you-define-the-seams-of
author: Nathan Evans
---
<p>Cross posted from: <a href="http://nbevans.wordpress.com/2013/04/10/ioc-containers-where-you-define-the-seams-of-applications/">http://nbevans.wordpress.com/2013/04/10/ioc-containers-where-you-define-the-seams-of-applications/</a></p>
<p>A few colleagues asked me to do a quick write up about the proper use of a IoC container. Particularly concerning what types you DO and DON&rsquo;T register into the container.</p>
<p>So here we go: Things that you do and don&rsquo;t wire up into an IoC container.</p>
<h2>The big ones, the <em>seams</em> of the application</h2>
<p>Components that are inherently cross-cutting concerns, and need to be &ldquo;available everywhere&rdquo; for possible injection. Things like:</p>
<ul><li>Logging, tracing and instrumentation</li>
<li>Authentication and authorization</li>
<li>Configuration</li>
<li>Major application services (this includes things like the Controllers in a MVC web app)</li>
</ul><p>Components that will be modularised as plug-ins / add-ins, things that get loaded dynamically. <span>Consider using </span><a href="http://msdn.microsoft.com/en-us/magazine/ee291628.aspx" target="_blank">MEF</a><span> as the discovery mechanism of these components.</span></p>
<p><span>Services with multiple implementations that can be &ldquo;dynamically selected&rdquo; through some means (app.config, differing registrations per </span><code>DEBUG</code><span> and </span><code>RELEASE</code><span> modes at compile-time, per-tenant configuration, etc.)</span></p>
<h2>The little ones, the <em>stylistic</em> ones and where you &ldquo;lean&rdquo; on the power of your container to provide infrastructure services or as a development aid</h2>
<p>Components that require lifetime scoping or management (transactions, sessions, units of work) and other <code>IDisposable</code>-like things that are longer lived than just a one-off use.</p>
<p>Components that are single instance. Never write &ldquo;static&rdquo; components.</p>
<p>Components that require testing / mocking out, etc. Note: I consider this to be a &ldquo;development aid&rdquo; and not at all mandatory.</p>
<p>When you want an &ldquo;automatic factory&rdquo; (Autofac isn&rsquo;t called that for no reason!). A simple inline <code>Func&lt;ISomeService&gt;</code> expression is cleaner than a going down the stereotypical Java &ldquo;Enterprise&rdquo; route of manually rolling out a <code>SomeServiceFactory</code>class each time. Though that&rsquo;s more as a result of the sad fact that they still don&rsquo;t have lambdas.</p>
<h2>And now the things that you <em>leave out</em> of the container</h2>
<p>Anything that is never, and never has any need to be, referenced outside out of the module it is within.</p>
<p>Implementation details of a module. Your container registrations should be the <em>facade</em> that hides the complexities of how that module works.</p>
<p>Things that are essentially just DTOs, entities, POCOs, other dumb types, etc.</p>
<p>Little utility, helper functions.</p>
<p>Note: I refer to &ldquo;module&rdquo; a few times. This is in no way in direct reference to an assembly or package. It&rsquo;s more in reference to a namespace, because components typically reside within a relatively self contained namespace with a container registration <em>module</em>.</p>
<h2>Cardinal rules</h2>
<p>Never ever call a &ldquo;static&rdquo; Kernel.Get / Resolve, or whatever equivalent your container <em>might</em> expose, anywhere. This is not dependency injection. It is service location. Which is a whole different pattern entirely. Autofac is quite neat in that it&rsquo;s one of very few containers that actually does not, out of the box, provide any sort of &ldquo;static&rdquo; resolution/service location function. And that is good.</p>
<p>Only call Get / Resolve methods in your bootstrap code at the root of your object graph. And even then, there should only be less than a handful of such calls. If you can get it down to just <em>one</em>, then you&rsquo;ve done well and you probably have an object graph that is very well expressed.</p>
<p>Always keep the object graph in the back of your mind. It&rsquo;s a shame, in my opinion, that containers tend to keep this information hidden away in their internals. The only time you get a glimpse of it is in the exception message for when you&rsquo;ve inadvertently introduced a circular dependency. Things could be <a href="http://abdullin.com/journal/2010/4/24/visualize-ioc-container-and-domain-dependencies-part-2.html" target="_blank">so much better</a> than this.</p>
<p>If you have a component that&rsquo;s requiring injection of more than about five dependencies, then it should start coming onto your &ldquo;radar of suspiciousness&rdquo;. If it reaches about eight to nine dependencies you should almost certainly consider refactoring it and, probably, the wider namespace or module as a whole. I often see this happen on Controllers in MVC applications; the so called &ldquo;fat controller&rdquo; problem. Thankfully, because the dependencies are already &ldquo;well expressed&rdquo; (it&rsquo;s just that there is too many of them) then normally refactoring such problem areas of the codebase is a relatively straight forward task.</p>
<p>Nowhere except your bootstrapper and container modules should reference the container, i.e. its namespaces. Arguably, your bootstrapper and container modules can be in a totally separate assembly by themselves and <em>only</em> that assembly holds references to your container&rsquo;s assemblies. If you&rsquo;re seeing namespace imports for your container all over your projects then something is very badly wrong.</p>
<p>Avoid the use of &ldquo;service locator injections&rdquo;, such as <code>IComponentContext</code> in Autofac. This is one of the very few ways that Autofac supports to allow you to shoot yourself in the foot. It&rsquo;s not quite as bad as a &ldquo;static&rdquo; Kernel.Get style service locator, but it&rsquo;s still pretty damn bad. As it implies you don&rsquo;t actually know what possible dependencies your component has, which should be impossible. To avoid this, express your dependencies better. If there are multiple instances you wish to dynamically &ldquo;select&rdquo; from at runtime then you can roll your own resolution delegate function and lean on your container to implement it. Autofac makes this very easy using its <a href="http://nblumhardt.com/2010/08/the-iindexkv-relationship-type/" target="_blank"><code>IIndex</code></a> <a href="http://nblumhardt.com/2010/01/the-relationship-zoo/">relationship</a>. For example: <a href="https://gist.github.com/nbevans/e7ab4dbc82880f92407b" target="_blank">https://gist.github.com/nbevans/e7ab4dbc82880f92407b</a></p>
<h2>Example of a Bootstrapper, Container Module and general structure of your Program Root</h2>
<p>This is a little snippet of a relatively well structured IoC server application. I added some relevant comments to it.</p>
<p><a href="https://gist.github.com/nbevans/b350d9addaeec5137b21" target="_blank">https://gist.github.com/nbevans/b350d9addaeec5137b21</a></p>
<p>I&rsquo;m open to feedback and discussion :)</p>

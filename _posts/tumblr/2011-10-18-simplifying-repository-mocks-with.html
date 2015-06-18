---
layout: post
title: Simplifying Repository Mocks with Ninject.MockingKernel
date: '2011-10-18T10:24:53+01:00'
tags:
- codegen
- moq
- ninject
- repository
- .net
tumblr_url: http://blog.pebblecode.com/post/11607777166/simplifying-repository-mocks-with
author: Alex Butcher
---
<p><strong>[Fact] Unit testing is important.</strong></p>
<p>I strongly believe in making it as easy as possible for developers to write unit tests, so there are no excuses when it comes to a code review!  I&rsquo;ve been a big fan of the <a href="http://code.google.com/p/moq/wiki/QuickStart">Moq</a> framework for a while - it&rsquo;s fluent interface for setting up and verifying mocks is a joy to use (if a little difficult to work with via reflection - more later).  </p>
<p>I recently had to put in place some new unit tests for a parser.  The parser operates on a single row at a time, and internally interacts with the database via a number of repositories.  I needed to write some unit tests before changing the behaviour of the row parser, to ensure I didn&rsquo;t break anything.  To keep things simple and repeatable, I want to mock out the repositories, rather than go to the trouble of setting up a database specifically for this test.  The problem is, how to ensure that the row processor uses the mock repositories that I&rsquo;ve setup?  I&rsquo;ll need to control which repositories are used by the repository, so that the real deal can be swapped out for mocks when I&rsquo;m running tests.  Sounds like a job for a dependency injection framework. I like Ninject, again, I&rsquo;m a huge fan of it&rsquo;s XML-free fluent configuration.</p>
<p><strong>Introducing Ninject.MockingKernel</strong></p>
<p>The Ninject.MockingKernel is a great extension to Ninject, providing support for binding types to Mock objects, with intrinsic support for creating Mock objects (a number of different mocking frameworks are supported out of the box) for creation.  The code  below is design to ensure that when price data that has already in the database in encountered, no data is overwritten in the database.  Putting together Moq and Ninject, I ended up with the following test.</p>
<pre><code>
[TestMethod]
public void Ensure_price_not_overwritten()
{
    //Create the Moq mocking kernel.  This will create a Mock object using Moq
        new Ninject.MockingKernel.Moq.MoqMockingKernel();            

    //1. ARRANGE: setup stub
    Price priceStub = new Price
    {
        Value = 999,
        Date = new DateTime(2011, 08, 20)
    };

    //2. Setup the mock repository to return my stub price
    Mock mockPriceRepo = ninjectKernel.GetMock();
    mockPriceRepo.Setup(repo =&gt; repo.Get(It.IsAny&lt;DateTime&gt;(), It.IsAny&lt;int&gt;())).Returns(priceStub);
    mockPriceRepo.Setup(repo =&gt; repo.Get(It.IsAny&lt;PriceType&gt;(), It.IsAny&lt;int&gt;())).Returns(priceStub);
    mockPriceRepo.Setup(repo =&gt; repo.Get(It.IsAny&lt;int&gt;())).Returns(priceStub);

    //3. ACT: call the system under test
    PriceRowProcessor rowProcessor = new PriceRowProcessor();
    rowProcessor.ProcessRow("some|row|data|999|20110820");

    //4. ASSERT: Check no attempts to update the database
    mockPriceRepo.Verify(repo =&gt; repo.Save(It.IsAny&lt;Price&gt;()), Times.Never());
    mockPriceRepo.Verify(repo =&gt; repo.Delete(It.IsAny&lt;Price&gt;()), Times.Never());
}


</code></pre>
<p><strong>Good, but brittle</strong></p>
<p>You should be able to follow through the code to see what&rsquo;s happening.  The problem I have with this setup is that it binds the test quite tightly to the implementation of the PriceRowProcessor.  In order to fool the PriceRowProcessor into using my stub object, I need to have intimate knowledge of which repository functions are called.  This, in my opinion, makes it a fairly brittle test.  If a developer changes the PriceRowProcessor adding in a call to a new repository method, the test will need to be updated.  </p>
<p><strong>Less Wiring Please</strong></p>
<p>I&rsquo;d like to make it much simpler to build a test that uses  repository, without having to run through the system under test line by line and mock out each call.  Essentially I want to do this:</p>
<p>Create some stub objects that represent the inital state</p>
<p>Wire up repositories to know about these stubs, so that whichever repository methods are called, the stub(s) will be returned.</p>
<p>At the moment, this required 4 lines of code and a reasonable amount of rooting around in the system under test.  I&rsquo;d like to get rid of these lines:</p>
<pre><code>
Mock mockPriceRepo = ninjectKernel.GetMock();
mockPriceRepo.Setup(repo =&gt; repo.Get(It.IsAny&lt;DateTime&gt;(), It.IsAny&lt;int&gt;())).Returns(priceStub);
mockPriceRepo.Setup(repo =&gt; repo.Get(It.IsAny&lt;PriceType&gt;(), It.IsAny&lt;int&gt;())).Returns(priceStub);
mockPriceRepo.Setup(repo =&gt; repo.Get(It.IsAny&lt;int&gt;())).Returns(priceStub);
</code></pre>
<p>This should in theory be straightforward, given that we&rsquo;re already using an interception framework (Moq is built onto of the Castle Proxy framework), but to do this dynamically on a Moq object requires building a Lamda expression at runtime&hellip;  I grabbed <a href="http://twitter.com/#!/josephjegan">Joseph</a> and together (with a little help from <a href="http://stackoverflow.com/questions/6459307/dynamically-calling-moq-setup-at-runtime">this stackoverflow answer</a> and reasonable amount of trial and error) we managed to put together a test utility method to automatically wire up a repository to return a particular object (or objects) whenever any of the retrieval methods are called.  Here&rsquo;s the updated test</p>
<pre><code>
[TestMethod]
public void Ensure_price_not_overwritten_2()
{
    //Create the Moq mocking kernel.  This will create a Mock object using Moq
    Ninject.MockingKernel.Moq.MoqMockingKernel ninjectKernel = 
        new Ninject.MockingKernel.Moq.MoqMockingKernel();

    //1. ARRANGE: quickly wire up a repository so that any 
    //accessor returning a Price or PriceList will return the stub
    Mock&lt;PriceRepository&gt; mockPriceRepo = 
        AutoWireUpMockRepository&lt;PriceRepository, Price, PriceList&gt;(new Price
    {
        Value = 999,
        Date = DateTime.Now
    });

    //2. ACT: call the system under test
    BbDlInstrumentRowProcessor rowProcessor = new BbDlInstrumentRowProcessor();
    rowProcessor.ProcessRow("some|row|data|999|20110820");

    //3. ASSERT: Check no attempts to update the database
    mockPriceRepo.Verify(repo =&gt; repo.Save(It.IsAny()), Times.Never());
    mockPriceRepo.Verify(repo =&gt; repo.Delete(It.IsAny()), Times.Never());
}

</code></pre>
<p>The arrange step is now a single expression - yay!</p>
<pre><code>Mock&lt;PriceRepository&gt; mockPriceRepo = AutoWireUpMockRepository&lt;PriceRepository, Price, PriceList&gt;(priceStub)
</code></pre>
<p>This may not work for everyone - kind of depends on your interface for repositories (we use a custom setup and code gen templates), but if you want to automate the process of mocking out a whole load of repository methods in one go, then this approach could work for you.  I&rsquo;ve put the code for the <a href="https://github.com/pebbleit/MoqMockingKernelTestUtils/blob/master/MoqMockingKernelTestUtils.cs">AutoWireUpMockRepository</a> up on <a href="https://github.com/pebbleit/MoqMockingKernelTestUtils">github</a>.  Building the lambdas at runtime deserves a blog post all on its own! </p>
<p><strong>Conclusion</strong></p>
<p>The less plumbing code that developers have to write to get unit tests up and running, the better.  This helps with that goal.  Boom.  There is of course a more academic discussion to be had about whether in fact you want your test to be agnostic of the particular repo method that is called.  I consider myself a <a href="http://martinfowler.com/articles/mocksArentStubs.html">classic TDDer</a>, so I&rsquo;m seeing the System Under Test as a black box, and this approach works nicely for me.</p>
<p><strong>Related </strong></p>
<p class="p1"><a href="http://stephenwalther.com/blog/archive/2008/06/12/tdd-introduction-to-moq.aspx">Good introduction to using Moq</a> Plus a good summary of the different types of testing approach to mocks and stubs</p>
<p class="p1"><a href="http://ninject.org/learn">Background on Ninject</a></p>
<p class="p1"><a href="http://teamcity.codebetter.com/project.html?projectId=project3">Where to get Ninject</a> (You&rsquo;ll need: Ninject.Extensions.Contextpreservation, Ninject.MockingKernel, Ninject2)</p>

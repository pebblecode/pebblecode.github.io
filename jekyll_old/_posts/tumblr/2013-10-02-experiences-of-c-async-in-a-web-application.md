---
layout: post
title: Experiences of C# Async in a Web Application
date: '2013-10-02T10:29:33+01:00'
categories:
- async
- .net
tumblr_url: http://blog.pebblecode.com/post/62889430460/experiences-of-c-async-in-a-web-application
author: Daniel Bradley
---
<h1>Why Use Async?</h1>
<p>I’ve recently just done my first project embracing the new async features of C# 5.0 and thought I’d share some of my experiences using it out in the real world.</p>
<p>The project I was building was a web application which uses RavenDB for most persistence tasks. which has full support for running all operations that run network commands asynchronously. This then leads to the ability to run a full, end-to-end asynchronous stack, meaning that threads can be much better utilised, as a method that is waiting on a slow operations such as communicating across a network, can release its thread while waiting for the operation to complete.</p>
<h1>Writing Async Services &amp; Interfaces</h1>
<p>The approach I normally take when creating complex web applications is to use the concepts of services to decouple the implementation of the storage and business rules from the web front end. This works great for designing simple integration tests to confirm that a service method is working as expected. A normal service interface might look something like this:</p>
<pre><code>
public interface IService
{
    SearchResult Search(Query query);
}
</code></pre>
<p>To make this interface compatible with the async pattern, you simply wrap the return value of the action in a Task&lt;&gt;</p>
<pre><code>
public interface IService
{
    Task Search(Query query);
}
</code></pre>
<p>If a service method does not have a return type (returns void), then simply return a plain Task.</p>
<pre><code>
public interface IService
{
    Task Delete(string id);
}
</code></pre>
<p>Async methods in this scenario should never return void, and should be considered an anti-pattern to avoid. More discussion is available in this <a href="http://msdn.microsoft.com/en-us/magazine/jj991977.aspx">MSDN article on Async Best Practices</a>.</p>
<h2>Exceptions</h2>
<p>One aspect of service design which is affected by the move to an asynchronous stack is how you model exceptional results that can be handled by the web application.</p>
<p>Typically, with synchronous services, custom exception types can be a neat way of representing unsuccessful results, which can optionally be caught at the web project level to be displayed nicely. However, in an asynchronous world, exceptions pose more challenges for handling due to possibly being wrapped in <a href="http://msdn.microsoft.com/en-us/library/system.aggregateexception.aspx">an aggregate exception</a>.</p>
<p>Because of this, I took the approach of using polymorphic result types to represent all possible types of result (apart from system failure). This works much like a <a href="http://msdn.microsoft.com/en-us/library/dd233226.aspx">discriminated union in F#</a> the return type is simply a finite list of possible outcomes.</p>
<pre><code>
public abstract class CreateResult
{
    private CreateResult()
    {
    }

    public sealed class Success : CreateResult
    {
        public int Id { get; set; }
    }

    public sealed class NameNotUnique : CreateResult
    {
    }
}
</code></pre>
<p>Using this kind of pattern, you can avoid using exceptions for any results that may want to be handled further down the stack.</p>
<h1>Testing (with NUnit)</h1>
<p>Writing unit and integration tests around asynchronous methods was surprisingly straight forward with only a few minor problems (which may be fixed in future versions).</p>
<h2>Setup methods</h2>
<p>The first problem I ran into with NUnit was the lack of support for writing an asynchronous setup method. NUnit currently requires the setup method to have a void return type and, as mentioned earlier, using a void return type with asynchronous methods is not fun. It means that the setup might not have finished setting everything up at the point when it starts running the test, resulting in inconsistent test environments. </p>
<p>The first solution to this is to not mark the setup method as &ldquo;async&rdquo; and run all asynchronous code synchronously using Task.WaitAll(), or some similar method.</p>
<p>The second solution is to create an asynchronous setup method, but rather than adding the NUnit setup attribute, call it directly on the first line of each test.</p>
<p>Neither of these methods is ideal, though I&rsquo;d tend to prefer the second method as this allows for the setup method to be parameterised.</p>
<h2>Expected exceptions</h2>
<p>The built-in NUnit asserts for expected exceptions do not support also checking inside of aggregate exception, and therefore I built my own assert helper class (also <a href="https://gist.github.com/danielrbradley/6671613">available as a gist</a>):</p>
<pre><code>
namespace NUnit.Framework
{
  using System;
  using System.Threading.Tasks;

  using NUnit.Framework;

  public static class AsyncAsserts
  {
    ///
    /// Assert that an async method fails due to a specific exception.
    /// This exception can be thrown directly or be the root cause of an aggregate exception.
    ///
    ///Exception type expected
    ///Test async delegate
    public static void Throws(Func testCode)
      where T : Exception
    {
      try
      {
        Task.WaitAll(testCode());
        Assert.Fail("Expected exception of type: {0}", typeof(T));
      }
      catch (AggregateException aex)
      {
        if (!aex.BaseIsOfType())
        {
          Assert.Fail(
            "Expected aggregate exception with base type: {0}"
            + "\r\nBut got an aggregate exception with base type: {1}",
            typeof(T),
            aex.GetBaseException().GetType());
        }

        // Continue excecution if base exception was expected.
      }
      catch (T)
      {
        // Swallow exception as this is correct.
      }
    }
  }

  public static class AggregateExceptionExtensions
  {
    public static bool BaseIsOfType(this AggregateException aex)
    {
      return aex.GetBaseException() is T;
    }
  }
}
</code></pre>
<pre><code>
namespace Tests
{
  using NUnit.Framework;

  // Example AsyncAsserts.Throws(testCode) usage.
  [Category("Integration")]
  public class CreateTest
  {
    [Test]
    public void ArgumentException()
    {
        AsyncAsserts.Throws(
            () =&gt; Service.Create(""));
    }
  }
}
</code></pre>

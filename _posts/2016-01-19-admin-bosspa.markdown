---
layout: post
title: Single Page Apps for Admin Backends - Who needs them ?
author: Martin Schinz
categories: [coding]
---

## No app is TodoMVC

tl;dr: When choosing a stack consider the complexity the user interface will
need to support.

This post is my thoughts on my recent experience writing a CRUD based admin
backoffice system for a web app, using the popular React and Redux libraries.

From my experience the currently 'en vogue' architecture for building web
applications is providing a HTTP API that drives the data access, and a single
page app client consuming the API. This is great for scenarios where most of the
API is read only, as the data fetching and mapping to JSON can happen close to
the database, and the view concerns are being addressed in to the client. No
problem here. For lightweight CRUD applications like TodoMVC this all looks
pretty accessible and manageable also. Not much code, easy to reason about,
async HTTP APIs, everything is straightforward.

## Context

Lets consider a scenario where the main use case is managing some entities that
have a relational model underlying them. There are mainly 2 kinds of views to
consider: First, a list view showing a collection of a certain type of entity.
Second, a form that normally has a 1:1 relationship with the entities in the
database. This form either creates a new entity, or modifies an existing one.

Now in such an application the frontend state can be reduced to around 4 things:
The route parameters, the state of the entity being worked on, the
authentication context of the user and any network operations that may be in
flight, successful or failed.

Effectively we are just putting a layer over the HTTP API to be able to call the
operations with a nicer interface than Curl, or Postman. One could argue that
calling the API is also only introducing a layer over learning to use SQL, but
that's off topic here.


## Global App State in the client &mdash; useful or not

From Redux' [Readme](http://redux.js.org): &ldquo;Redux is a predictable state
container for JavaScript apps.&rdquo;

The goal here is not to be bashing Redux, I think Redux is a great library, and
does much for being able to deal with concurrency and state transformations in a
simplified manner in frontend apps.  The JavaScript browser app world is a
better place because of it.

But do we really need to have global app state in the front end for the use case
at hand? This answer to this question is one that needs to examine the
complexity of the state we are dealing with. From the problem description it
appears to be obvious to me that for such a system the answer would be no.  So
for any given network request that interacts with the API, we need to now make
sure that on top of validating correctness on the backend, we also need to
update the UI separately based on the results from the API. This feels a lot
like having to do double the work.

## Reasons to choose rich clients

If we modify the problem at hand to include complex dashboard like systems,
where there may be lots of components on a page, driven by data analytics
problems, or the need to see a lot of information at a glance, the approach
should change accordingly. This becomes more and more painful in web frameworks,
as the composition and data fetching for sub views can become a snakepit of
nested dependencies. This is where composing views in
[React](https://facebook.github.io/react/) becomes a real productivity
improvement, and using Redux for the cross cutting concerns and driving atomic
updates brings a lot of value to the table. However, the user interactions in
this scenario are much more driven by queries than by commands.

## Where should the state live?

The question I'm asking in the context of the application we are building is:
**Do we think the state engine belongs on the client, or on the server, or
both**. When we compare this Single Page App / HTTP API model to a traditional
MVC RAD tool like Asp.net MVC, Spring Boot, Python Flask or Rails (and a
gazillion others) then the following becomes quite obvious:

In the traditional RAD tools it normally is enough to write the validation
logic, authentication context and state management in one place. The client
state is a projection from the state of the backend application on the server.
Obviously some state will appear to be in the client, but this is normally
automatically generated by the frameworks.

Examining the SPA / HTTP API model it becomes obvious that the state engine now
needs to live in two places. The HTTP API and the client application.  Because
we have removed the page rendering / state management from the backend service,
we now need to implement that logic in the client. However as we are only
exposing endpoints to an API, we still need to manage some of it on the server
as well. This isn't true for all state, but at least for the cross cutting
concerns like user context and the entities being worked on.


## Conclusion

Single page apps make sense when the client is composed of enough elements to
actually need composition. For simpler things, a classic RAD tool is good enough
for me. The benefits of being able to show a rich UI are almost never worth the
extra effort of having to implement the same state engine in two places.

My next admin Back Office System is almost certainly going to be using [boring
technology](http://mcfunley.com/choose-boring-technology).

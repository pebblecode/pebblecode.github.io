---
layout: post
title: The price of light is less than the cost of darkness
author: Emma Nash, Aisling Foley & Paul Addicott-Evans
categories: [hacks]
thumbnail: /img/blog/crukhack.png
---

From time to time, the team here at pebble has the opportunity to take a step back from client-facing work, and undertake a ‘hack’ - we’ll typically put aside a few days or a week to work on a project that scratches an itch, or is otherwise interesting to a team of developers and designers. If we can use this time to produce something of value, then even better.

A recent opportunity was presented to us by our friends at Cancer Research UK. We offered them some time, and they offered us a problem.

##The Business Problem

CRUK manage a database of extremely useful information, relating to the incidence and treatment of cancer across the UK. At present, this data is mostly static, and held in a database. It’s not interactive, or externally accessible.

This data is used in multiple ways:

* Creation of infographics
* Public facing statistics on the CRUK website
* Creation of profiles for distribution amongst key influencers (politicians, healthcare professionals).

The process of creating these materials is relatively labour intensive for the CRUK team, as the data is mostly ‘offline’ - i.e. requiring an export to be useful and not easily accessible to organisation or the public for interpretation.

We believe that the concept of ‘open data’ is very powerful for ensuring information can be shared in a useful way. By creating open data-based tools you can increase exposure and enhance citizen participation, contribute to better public services and improve the way communities work.

##The Case for Open Data

The recent publication of the Open government Manifesto includes a focus on open data:

>“Data has become an increasingly important resource for understanding society and government in the twenty-first century, and developing new and more responsive services for citizens.”

Taking inspiration from other open data initiatives, we used the data made available by CRUK to power an API. This had the potential to address some key pain points within the organisation, and also enable other digital initiatives, namely:

* Transparency and democratic control
* Participation
* Self-empowerment
* Improved or new private products and services
* Innovation
* Improved efficiency of government services
* Improved effectiveness of government services
* Impact measurement of policies
* New knowledge from combined data sources and patterns in large data volumes

Specifically for Cancer Research UK, reducing the effort required to produce useful profiles and infographics is of benefit to the organisation - increasing the freshness of data available, whilst reducing the effort required to share it in a useful way. By creating an API on top of the existing data, profiles and infographics can be automatically generated and updated with the most recent information, without having to re-engage the design team.

Creating an API also enables participants to integrate other sources of data from the NHS, UK government and virtually any other source, providing there is some commonality (typically [CCG](http://www.nhscc.org/ccgs/)). The combination of these data sources allows simple querying, comparison and analysis of correlating factors - for example, statistical relationships between obesity in a specific area, or comparison of detection rates between CCGs.

Through investigating various data sources, we discovered that the majority of NHS data can be related to the PCT and/or CCG - this enables reports and data from different sources to be linked and connected - meaning greater insight into potential correlations. This also enables additional data to be added at a later date, if organised by one of these two keys.

## The Results

Over the course of a just a few days we were able to create an accessible API, and build an app on top of that data to enable users to investigate Cancer statistics.

The finished website is available [here](https://cruk.pebblecode.net). It contains a map of England showing how different CCGs compare against each other on various metrics. When you select a CCG you can view summary info - this is similar to what was previously hand-made, except it is auto-generated using the API.

On top of that we created an API which makes the data easily accessible. It is publicly available at https://pebblecode-cruk-api.herokuapp.com (documentation [here](https://github.com/pebblecode/cruk-api/wiki)). This makes working with the data programmatically extremely easy, so anyone can get involved with the data if they have an interesting idea.

Here at pebble, we love helping organisations make sense of their data - this hack took us just a few days, showing that value can be quickly derived without the need for heavy investment. We’d love to see what other uses could be found for this data. If you have an idea, or can use this data to create new insights, we’d love to hear from you - drop us a line at [hello@pebblecode.com](hello@pebblecode.com).

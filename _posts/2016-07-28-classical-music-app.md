---
layout: post
title: Falala.co - a Spotfiy Classical Music Companion App
author: John Mildinhall
categories: [music, development, node]
thumbnail: /img/blog/beethoven.jpg
--- 

Like many other people in our office, I am a subscriber to Spotify's excellent music streaming service. I have a pretty wide-ranging taste, but tend to mainly hover around the area of blues and rock with a few forays into electronica. Recently I also started to listen to more classical music. As a young musician, I had a fairly strong grounding in the genre when I was younger - I played the bassoon, oboe and piano. 

One thing that struck me as I started to explore the classical side of Spotify is that it's quite difficult to find what you're after. Titles tend to be pretty long, and the list of artists tend to be longer still:

`Il barbiere di Siviglia (The Barber of Seville): Act I Cavatina: Largo al factotum della citta (Figaro)`

`Gioachino Rossini, Franco de Grandis, Sonia Ganassi, Ingrid Kertesi, Angelo Romero, Roberto Servile, Ramón Vargas, Hungarian Radio Chorus, Budapest Failoni Chamber Orchestra, Will Humburg`

The Spotify client tends to cut off the key information, which is often at the end of the title, so you are left with a myriad of titles which look the same. Lists of artists are conflated with the composer (and in the case of opera, librettists), so you don't have actual clarity as to who is who. 

From the perspective of Spotify, this is understandable. The vast majority of their listenership is interested in music which essentially has the same information architecture: That of the pop song. It does mean that the UX is sub-optimal for classical music however. 

# Opening Pandora's Box

About a year ago, I started tinkering with the Spotify API. This allows users to read the data of artists, including their top tracks, their albums and related artists. It also provides URLs of track previews. I decided that it would be interesting to use this information to re-order the experience of the Spotify data in order to support the classical listener. 

# Falala.co is born

To achieve the above aim, an web app was in order. I elected to use Node.js, MongoDB, along with the Jade templating engine. The app is rolled into 2 Docker images (one for the app, one for the database), and hosted on AWS. A future blog post will detail getting MongoDB up and running on AWS. You can see the result here:

[falala.co](http://falala.co)

![falala](/img/blog/falala-2.jpg)

## Separating the Composer from the Artist

The primary challenge with Falala.co was to define what is classical music. Spotify does not really do this for the consumer of the API. There are some genre tags, but they appear to be sparsely applied and somewhat inconsistent - for example, one is `classical` and another is `classical opera`. In the language of maths, one is a subset of the other, but the data is not ordered that way. 

The way in which I settled the matter was to define a whitelist of classical composers. I took the wikipedia list of composers from the classical era (so no Baroque or modern classical, soz) and used that to define classical music. If the artists listed included at least one of the composers, then it was classical music. 

By extension, if a classical composer was listed with other artists, then those artists were highly likely to be exponents of the composer's work. You can then make an assumption that these artists are essentially classical artists. On the whole, this works. There are some limitations, however. Take [Luciano Pavarotti](http://falala.co/artists/Luciano%20Pavarotti), everyone's favourite tenor. He was definitely a classical artist. However, if you look at his top tracks on Spotify, they tell a different story:

`We are the world`

`Luciano Pavarotti, Ricky Martin, Zucchero, B.B. King, Gloria Estefan, Joe Cocker, Renato Zero, Lionel Richie, Mariah Carey`

Much as I love the ouevre of Ricky Martin, he can't really be considered classical, can he? To define a boundary between classical and other music, it was necessary to develop a metric of classicalness. This allows these artists to be excluded from the app. 

## Catalogues

In pop music, for the most part a recorded song is the root of an artist's work. What do I mean by this? Like a Virgin by Madonna is the canonical recording of that song. All other recordings of that song are subordinate to that particular recording. On the other hand, the root of a composer's work is the written notes of that particular piece. No recording of that piece has primacy over another (although they may vary in quality). This means that popularity of a recording is less important for a classical piece of music: There is no 'original' version. This means that it is more important to be able to compare recordings of the same work.

To achieve this, the tracks from albums associated with composers and classical artists were analysed. By searching for catalogue information of the form `Catalogue Prefix. Catalogue Number : Piece Number` , e.g: `Op. 25 : IX` , a catalogue for each composer was generated. In some cases for example [Franz Schubert](http://falala.co/composers/Franz%20Schubert/cat/D), this is extensive with nearly a thousand separate pieces and tens of thousands of individual recordings. 

## Concerts

Wouldn't it be great to find out where and when a particular piece is being played in concert next? We're not quite there yet, but on our way. Indexing concerts from the websites of venues is quite messy and slow work. So far the app associates composers and artists with concerts in the [South Bank Centre and the Royal Albert Hall](http://falala.co/concerts), both in London. 

## What's next?

Organising all classical music is like trying to sweep up all the needles in a pine forest. Hundreds of years of culture have created a vast array of complex data structures and relationships. Disentangling them involves a great deal of work. I am considering open sourcing the app, because this is more than one person can deal with. For the moment, I am focusing on improving the apps ability to update itself with the latest releases. 

You can follow [Falala on twitter](https://twitter.com/falalaco).




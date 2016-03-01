# Creating a new tag

Jekyll doesn’t have a built-in tagging system in place, so we have implemented our own solution. We would like to make sure that relevant content can be discovered easily. Before we create a new tag, be sure to add one only if you are sure that we will be consistently creating content related to the tag. 

It would be a lonely if we click on a tag only to discover one piece of content there (There will always be an exception to the rule, but in general, we don’t want to make a habit of doing this)

If you are looking to create new tags for blogs, the easiest way to get started is to use an existing tag as a template and make little tweaks. 

For example, take 

> bluetooth.md

and rename it to the tag you want to create:

> awesome-tag.md

Now edit the contents inside the file:

```
—
layout: blog-by-tag
title: blog-bluetooth
permalink: blog/tag/bluetooth/
colour:
category: bluetooth
—
```

to

```
—
layout: blog-by-tag
title: blog-awesome-tag
permalink: blog/tag/awesome-tag/
colour:
category: awesome-tag
—
```
notes:
1. Use all lowercase letters
2. Use hyphens if the tag is more than one word

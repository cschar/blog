---
layout: post
title:  "gitlab ci configuring w/ netlify "
categories: gitlab ci-cd
---

To override jekyll template structure

you have to 'override' it by inserting folder directories into your project that mimic
the layout of jekylls predefined structure.

e.g.  if i want to override the layout look of the home page with all my posts:



```bash
#navigate to https://github.com/jekyll/minima/tree/master/_layouts to get a sense of what to do
mkdir _layouts 
touch _layouts/home.html   
#copy the home.html in the minima repo into the above file and make changes

```
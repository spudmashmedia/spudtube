# SPUDTUBE - NodeJS version

A very very very very very hacky streaming service....that needs some serious work...ლ(ಠ益ಠლ)﻿

API: built with NodeJS + Restify

Web: built with NodeJS + Express + Handlebars

# NOTES
file names should be
[filename].mp4

when viewing a video via the WEB (http://localhost:3000/spudtube), you pass in a query string parameter **v** 

where **v** is the filename.

E.g.

if a video exists in folder:
```
/public/myvideo.mp4
```

the url would be
```
http://localhost:3000/spudtube?v=myvideo
```
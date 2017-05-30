# SPUDTUBE - NodeJS version

A very very very very very hacky streaming service....that needs some serious work...ლ(ಠ益ಠლ)﻿

API: built with NodeJS + Restify

Web: built with NodeJS + Express + Handlebars

## Requirements
NodeJS (I prefer using NVM https://github.com/creationix/nvm)
Google Chrome (for the UI)

## Installation

Clone the repository
```
git clone git@github.com:spudmashmedia/spudtube.git
```

hydrate node_modules
```
cd spudtube
npm install
```

### Test Run
fire up PM2 to launch both the API and Web UI
```
npm run start
```

this should now start up 

WEB (this has the video player) http://localhost:3000/spud.tube
API (streaming service) http://localhost:5000

### Viewing Media
[TO FIX] currently, a query string token   ?v=[token] is used to map to a correlating video located in the public folder.
right now **token** = filename.  The extension is automatically added in.

Use Google Chrome to see the byte blocks streamed over. (the API will log which block range is streaming during timeline seeking).

[TODO]
actually have the token map back to a lookup which then maps to a file location in public.

### Instrumentation
View PM2 dashboard
```
pm2 dashboard
```

### Stopping PM2
To stop PM2
```
npm run stop
```

## Test
To run unit test
```
npm run test
```

## TODO
- Make the UI look nicer, currently looks like a blah...
- Create a version of the UI with Polymer web components (custom media player)
- Create a version of the UI with React
- Create a version of the UI with Angular
- Add some persistance (maybe a way to upload media and update token->file mapping)

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History
- V1

## License
MIT

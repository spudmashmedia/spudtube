/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Spudmash Media Pty Ltd. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";

const restify = require('restify');
const bunyan = require('bunyan');
const logger = bunyan.createLogger({
    name: 'spudstream-logger'
});
const path = require('path');
const baseUri = '/api';
const port = process.env.PORT || 5000;
const server = restify.createServer({
    name: 'spudstream',
    version: '1.0.0',
    logger: logger
});
const library = require('./routers/library');

// setup middleware
server.use(restify.bodyParser());
server.use(restify.queryParser());

// add routes
library.applyRoutes(server, path.join(baseUri, 'library'));

// start server
server.listen(port, (err) => {
    if (err) {
        logger.error(err);
    }
    console.log(`API running on http://localhost:${port}`)
});

module.exports = server;
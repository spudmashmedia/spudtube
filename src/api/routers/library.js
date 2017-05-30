/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Spudmash Media Pty Ltd. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";

const Router = require('restify-router').Router;
const getMedia = require('./library/getMedia');

// setup routers
let router = new Router();
router.get('/media', getMedia.getMedia);

module.exports = router;
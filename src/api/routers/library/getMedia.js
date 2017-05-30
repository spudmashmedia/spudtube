/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Spudmash Media Pty Ltd. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";

const Promise = require('bluebird');
const fs = require('fs');
Promise.promisifyAll(fs);
const path = require('path');
const restify = require('restify');
const Router = require('restify-router').Router;

// entry point
function getMedia(req, res, next) {
    let file = req.query.v;
    let filepath = `./public/${file}.mp4`;

    fs.statAsync(filepath)
        .then(stat => {
            let range = req.headers.range;
            console.log(`Requested Range is ${range}`);
            // validate byte range
            if (!range) {
                let err = new Error('Invalid Range');
                err.status = 416;
                return next(err);
            }
            // setup http 206 partial content header
            let position = getPosition(range);
            let stream_position = getStreamPosition(position, stat);
            let chunksize = (stream_position.end - stream_position.start) + 1;
            let head = getPartialHeader(stream_position, stat, chunksize);
            res.writeHead(206, head);

            // setup data stream
            let stream = fs.createReadStream(filepath, stream_position);
            stream.on('open', () => {
                stream.pipe(res);
            });
            stream.on('error', (err) => next(err));
        })
        .catch(err => {
            if (err.code == 'ENOENT') {
                res.send(404, 'not found');
            }
            return next(err);
        });
}

function getPosition(range) {
    return range
        .replace(/bytes=/g, '')
        .split('-')
        .map(x => parseInt(x));
}

function getStreamPosition(position, stat) {
    return {
        start: position[0],
        end: position[1] ? position[1] : stat.size - 1
    };
}

function getPartialHeader(stream_position, stat, chunksize) {
    return {
        'Content-Range': `bytes ${stream_position.start}-${stream_position.end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4'
    };
}

module.exports = {
    getMedia,
    getPosition,
    getStreamPosition,
    getPartialHeader
};
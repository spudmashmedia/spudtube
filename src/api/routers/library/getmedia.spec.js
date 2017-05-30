/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Spudmash Media Pty Ltd. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";

const getMedia = require('./getMedia');
const chai = require('chai');
const expect = chai.expect;

describe('TEST: getMedia Module', () => {
    // getPosition
    describe('getPosition: when range is "bytes=1-10"', () => {
        it('Should return 1,10', () => {
            let range = 'bytes=1-10';
            let response = getMedia.getPosition(range);
            expect(response[0]).to.equal(1);
            expect(response[1]).to.equal(10);
        });
    });
    describe('getPosition: when range is "bytes=600-"', () => {
        it('Should return 600,NaN', () => {
            let range = 'bytes=600-';
            let response = getMedia.getPosition(range);
            expect(response[0]).to.equal(600);
            expect(response[1]).to.be.NaN;
        });
    });
    describe('getPosition: when range is "bytes="', () => {
        it('Should be return [NaN]', () => {
            let range = 'bytes=';
            let response = getMedia.getPosition(range);
            expect(response).to.not.be.null;
            expect(response[0]).to.be.NaN;
        });
    });

    // getStreamPosition
    describe('getStreamPosition: when position[10,20] and stat.size=1', () => {
        it('Response ShouldBe  start:10, end:20', () => {
            let position = [10, 20];
            let stat = {
                size: 100
            };
            let expectedresponse = {
                start: 10,
                end: 20
            };

            let response = getMedia.getStreamPosition(position, stat);

            expect(response).to.eqls(expectedresponse);
        });
    });
    describe('getStreamPosition: when position[10,NaN] and stat.size=1', () => {
        it('Response ShouldBe  start:10, end:100', () => {
            let position = [10, NaN];
            let stat = {
                size: 100
            };
            let expectedresponse = {
                start: 10,
                end: 99
            };

            let response = getMedia.getStreamPosition(position, stat);

            expect(response).to.eqls(expectedresponse);
        });
    });

    // getPartialHeader
    describe('getPartialHeader: when parameters have values', () => {
        it('Response ShouldBe be valid', () => {
            let stream_position = {
                start: 1,
                end: 20
            };
            let stat = {
                size: 20
            };
            let chunksize = 20;

            let expectedresponse = {
                'Content-Range': `bytes ${stream_position.start}-${stream_position.end}/${stat.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4'
            };

            let response = getMedia.getPartialHeader(stream_position, stat, chunksize);

            expect(response).to.eqls(expectedresponse);
        });
    });

    // getMedia

});
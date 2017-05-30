/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Spudmash Media Pty Ltd. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const port = process.env.PORT | 8081;
const app = express();

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.get('/spud.tube', (req,res)=>{
    res.render('mediaplayer', {token: req.query.v});
});

app.listen(port, (err)=>{
    if(err) console.log(err);

    console.log(`Media Player is hosted at http://localhost:${port}`);
});

module.exports = app;
'use strict';
import compress from 'compression';
// const compress = require('compression');
const express = require('express');
const Promise = require('bluebird');
const httpStatus = require('http-status');
const routes = require('./routes');
const path = require('path');

Promise.config({
    cancellation: true
});

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/', routes);
app.use('/static', express.static(path.join(__dirname, '../dist')));
app.use('/health-check', (req, res) => res.json({
    status: 'success'
}));

module.exports = app;

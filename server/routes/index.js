'use strict';

const index = require('../templates/index.marko');
const express = require('express');
const router = express.Router();

const ip = require('ip');
const ipAddress = ip.address();

const devServerPath = `http://${ipAddress}:8080/webpack-dev-server.js`;
const jsPath = `http://${ipAddress}:8080/static/main.js`;
// cssPath = `http://${ipAddress}:8080/static/main.css`;
const cssPath = '';

const data = {
    cssPath,
    jsPath,
    devServerPath
};

router.route('/').get((req, res) => {
    index.renderToString(data, (err, markup) => {
        if (err) {
            // return next(err);
        }
        res.send(markup);

    });
});

// router.use('/article', articleRoutes);
// router.use('/assets', assetsRoutes);
// router.use('/cache', cacheLibHealtRoute);
// router.use('/invalidate', invalidateRoutes);

module.exports = router;

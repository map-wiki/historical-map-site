const expressPort = process.env.PORT || '3000';
const debug = require('debug')('Map:Server');
const env = process.env.NODE_ENV;

try {
    const memwatch = require('memwatch-next');
    memwatch.on('leak', info => {
        console.error('Map::Server:Memory leak detected:\n', info);
    });
    memwatch.on('stats', stats => {
        console.error('Map::Server:Stats:\n', stats);
    });
}  catch (e) {
    console.log('Map::Error', e);
}

let app;
if (env === 'dev') {
    /* Attach Marko Just In Time compiling. */
    require('marko/node-require').install();
    app = require('./server/express');
} else {
    app = require('./serverDist/express');
}

app.listen(expressPort, (error) => {
    if (error) {
        debug('Unable to listen.', error);
        return;
    }
    debug('Map server started on port ' + expressPort);
});

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config.js')({
    mode: 'dev'
});

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
    hot: true,
    inline: true,
    filename: config.output.filename,
    compress: false,
    overlay: true,
    publicPath: config.output.publicPath,
    disableHostCheck: true,
    stats: {
        colors: true
    },
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
});
server.listen(8080);

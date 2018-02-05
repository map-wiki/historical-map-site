const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ip = require('ip');
const ipAddress = ip.address();
const buildEntryPoint = entryPoint => [
    entryPoint,
    'webpack-dev-server/client?http://' + ipAddress + ':8080',
    'webpack/hot/dev-server'
];

function configFn(buildEnv) {
    const plugins = [
        new ExtractTextPlugin({
            filename: '[name]',
            disable: false,
            allChunks: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            MODE: JSON.stringify(buildEnv.mode)
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ];

    let entry = {};
    let cssUse;
    let publicPath;

    if (buildEnv.mode === 'build') {
        publicPath = 'https://somecdn.com/';
        plugins.push(new webpack.LoaderOptionsPlugin({
            minimize: true
        }));
        plugins.push(new UglifyJsPlugin({
            minimize: true,
            compressor: {
                warnings: false
            }
        }));
        plugins.push(new webpack.optimize.MinChunkSizePlugin({}));
        entry = {
            'main.min.js': __dirname + '/static/js/main',
            'main.min.css': [
                __dirname + '/static/less/main.less',
            ]
        };
        cssUse = ExtractTextPlugin.extract({
            use: [{
                loader: 'css-loader',
                options: {
                    importLoaders: 1
                }
            }, 'postcss-loader', 'less-loader']
        });
    } else {
        publicPath = 'http://' + ipAddress + ':8080/static/';
        plugins.push(new webpack.HotModuleReplacementPlugin());
        entry = {
            'main.js': buildEntryPoint(__dirname + '/static/js/main')
        };
        cssUse = [
            'style-loader',
            'css-loader?sourceMap&importLoaders=1',
            'postcss-loader?sourceMap',
            'less-loader?sourceMap'
        ];
    }
    plugins.push(new webpack.NoEmitOnErrorsPlugin());

    return {
        entry,
        devtool: 'source-map',
        output: {
            path: __dirname + '/dist',
            publicPath,
            filename: '[name]',
            library: 'libraryName',
            libraryTarget: 'umd',
            umdNamedDefine: true,
            chunkFilename: '[name]_[hash:10].chunk.js' // enable named chunks in future
        },
        module: {
            rules: [{
                test: /\.jsx?$/,
                use: [{
                    loader: 'babel-loader'
                }]
            }, {
                test: /\.(css|less)$/,
                use: cssUse
            }]
        },
        resolve: {
            alias: {},
            modules: [
                path.resolve('./src'),
                'node_modules'
            ]
        },
        plugins
    };
}

module.exports = configFn;

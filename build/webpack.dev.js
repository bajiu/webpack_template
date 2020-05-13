const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js');
const webpack = require('webpack');

const devConfig = {
    mode: 'development',
    devtool: "cheap-module-eval-source-map",
    entry: {
        main: ['webpack-hot-middleware/client?noInfo=true&reload=true', './src/index.js']
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist')
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
    output: {
        publicPath: "/",
        filename: '[name].js',
        chunkFilename: '[name].js',
    }
}
module.exports = merge.smart(commonConfig, devConfig)

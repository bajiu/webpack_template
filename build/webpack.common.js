const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;

const commonConfig = {
    module: {
        rules: [
            {
                test: /\.(tsx?|js)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/, // 排除node_modules中的代码
            //     use: [{
            //         loader: 'babel-loader'
            //     }],
            // },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]', // placeholder 占位符
                        outputPath: 'images/', // 打包文件名
                        limit: 204800, // 小于200kb则打包到js文件里，大于则使用file-loader的打包方式打包到imgages里
                    },
                },
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]-[hash:5].min.[ext]', // 和上面同理
                        outputPath: 'fonts/',
                        limit: 5000,
                    }
                },
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                }, 'less-loader', 'postcss-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            }
        ]
    },
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        }),
        new CSSSplitWebpackPlugin({
            size: 4000,
            filename: '[name]-[part].[ext]'
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, '../dist')
    }
};
module.exports = commonConfig;

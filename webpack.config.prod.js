const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const options = {
    antDir: path.join(__dirname, './node_modules/antd'),
    stylesDir: path.join(__dirname, './src'),
    varFile: path.join(__dirname, './src/assets/style/antd-variables.less'),
    themeVariables: ['@primary-color', '@secondary-color', '@disabled-color'],
    indexFileName: 'index.html',
    generateOnce: false,
    lessUrl: "https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js",
    publicPath: "",
    customColorRegexArray: [],
};

const themePlugin = new AntDesignThemePlugin(options);

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.module\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /\.module\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.less$/i,
                use: ["MiniCssExtractPlugin.loader", "css-loader", "less-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico|eot|woff|ttf|woff2)(\?.*)?$/,
                loader: 'url-loader',
            }
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: true,
            favicon: './favicon.ico',
            'base': '/'
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new CopyPlugin({
            patterns: [
                {from: './.htaccess', to: '.'},
                {from: './src/assets/images', to: 'assets/images'}
            ]
        }),
        new Dotenv({
            path: './config/.env.prod',
            safe: true
        }),
        themePlugin
    ],
};
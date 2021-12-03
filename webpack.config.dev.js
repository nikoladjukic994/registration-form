const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

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
    mode: 'development',
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
        liveReload: true,
        historyApiFallback: true,
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
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /\.module\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico|eot|woff|ttf|woff2)(\?.*)?$/,
                loader: 'url-loader',
            }
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
            favicon: './favicon.ico',
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new Dotenv({
            path: './config/.env.dev',
            safe: true
        }),
        themePlugin
    ],
};

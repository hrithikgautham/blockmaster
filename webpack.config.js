const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const forntEndConfig = {
    node: { fs: 'empty' },
    target: "web",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "frontend-bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            }
        ]
    },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};

const backendConfig = {
    target: "node",
    entry: "./src/main/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "backend-bundle.js"
    },
    mode: "development"  
};

module.exports = [backendConfig, forntEndConfig];
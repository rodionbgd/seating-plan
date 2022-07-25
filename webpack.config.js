const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: process.env.NODE_ENV === "production" ? "/seating-plan/" : "/",
        clean: true,
    },
    mode: process.env.NODE_ENV === "development" ? "development" : "production",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/images",
                    to: path.resolve(__dirname, "dist/images"),
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    resolve: {extensions: [".ts", ".js"]},
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        open: true,
        port: 9000,
    },
};

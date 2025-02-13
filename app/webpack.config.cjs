const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const is_dev = process.env.NODE_ENV !== "production";

module.exports = {
    mode: is_dev ? "development" : "production",

    entry: "./src/index.tsx",

    devtool: is_dev ? "inline-source-map" : false,

    devServer: {
        static: {
            directory: path.resolve(__dirname, "assets"),
        },
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: "asset/resource",
            },
        ],
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        modules: [path.resolve(__dirname, "node_modules"), "node_modules"],
    },

    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist"),
    },

    optimization: {
        usedExports: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "Acore Tilemap",
            filename: "index.html",
            favicon: "./assets/favicon.ico",
        }),
    ],
};

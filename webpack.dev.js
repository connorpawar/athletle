/* eslint-env node */

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
require("dotenv").config({ path: "./.env.dev" });

module.exports = function () {
    return {
        mode: "development",
        plugins: [
            new ReactRefreshWebpackPlugin({
                overlay: false,
            }),
            new webpack.DefinePlugin({
                "process.env": JSON.stringify(process.env),
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(s?)css$/,
                    use: ["style-loader", "css-loader"],
                    sideEffects: true,
                },
            ],
        },
        devServer: {
            hot: true,
            port: 7579,
            static: false,
            compress: true,
            host: "localhost",
            allowedHosts: "all",
            client: {
                logging: "warn",
                overlay: false,
            },
            historyApiFallback: true,
        },
        devtool: "source-map",
    };
};

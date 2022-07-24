/* eslint-env node */

const HTMLMinimizerPlugin = require("html-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function () {
    return {
        mode: "production",
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(s?)css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                    sideEffects: true,
                },
            ],
        },
        optimization: {
            minimizer: ["...", new HTMLMinimizerPlugin()],
            splitChunks: {
                chunks: "all",
            },
        },
        devtool: false,
    };
};

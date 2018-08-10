
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    performance: {
        hints: "warning",
        maxAssetSize: 500000,
        maxEntrypointSize: 500000,
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }

    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = require("./src/config.js");

const scriptName = config.scriptName;

module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: `${process.env.APPDATA}/.minecraft/config/worldedit/craftscripts`,
        filename: `${scriptName}.js`
    },
    plugins: [
        //new UglifyJSPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};

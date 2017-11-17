const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const scriptName = "test";

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

var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {
        app:"./public/components/main.js"
    },
    output:{
      filename:"./public/build/bundle.js",
      sourceMapFilename:"./public/build/bundle.map"
    },
    devtool:"#source-map",
    module: {
       loaders: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel',

             query: {
                presets: ['es2015', 'react']
             }
          }
       ]
    }
};

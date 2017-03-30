var webpack = require('webpack');
var webpackBaseConfig = require('./webpack-base-config');

webpackBaseConfig.devServer = {
    progress: true,
    colors: true,
    port: 8081,
    inline: true,

    proxy: {
        '/images/dhis2nzlogo.png': 'http://localhost:8081/src',
        '/images/speaker.png': 'http://localhost:8081/src',
        '/audiolizr/style.css': 'http://localhost:8081/src',
    }
};

module.exports = webpackBaseConfig;

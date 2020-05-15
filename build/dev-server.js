const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const c = require('child_process');
const config = require('./webpack.dev.js');

const complier = webpack(config);
const app = express();
const DIST_DIR = path.resolve(__dirname, '../', 'dist');

let devMiddleware = webpackDevMiddleware(complier, {
    quiet: true,
    noInfo: true,
    stats: 'minimal',
});

let hotMiddleware = webpackHotMiddleware(complier, {
    log: false,
    heartbeat: 2000,
});

app.use(devMiddleware);

app.use(hotMiddleware);

app.use(express.static(DIST_DIR));


app.listen(8080, () => {
    console.log('成功启动：localhost:' + 8080);
    c.exec('open http://localhost:8080/');
});

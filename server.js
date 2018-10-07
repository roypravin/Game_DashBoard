const app = require('./restfulserver/index');
const debug = require('debug')('todo-api:server');
const path = require('path');
const express = require('express');
const port = 8086;
app.set('port',port);


/* dev config */

const webpack = require('webpack');
const config = require('./webpack.config.dev');
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler,{
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

/* ending dev config */

/* entry point of application */
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'public_html/index.html'));
});

const server = require('http').Server(app);

server.listen(port);

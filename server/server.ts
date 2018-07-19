import express = require('express');
import path = require('path');
import sqlite3 = require('sqlite3');
import createTodoListController from './todoListController';

const app = express();
const PORT = process.env.PORT || 8080;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const publicPath = path.join(__dirname, '../../public');

const setApiHeaders = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; frame-ancestors 'none'");
  next();
};

const htmlHeaders = {
  'Cache-Control': 'public max-age: 300',
  'Content-Security-Policy':
"default-src 'none';\
script-src 'self';\
style-src https://fonts.googleapis.com 'self' 'unsafe-inline';\
font-src https://fonts.gstatic.com;\
connect-src 'self';\
frame-ancestors 'none'",
  'X-Content-Type-Options': 'nosniff',
};

app.disable('x-powered-by');

app.use(express.json());

createTodoListController().then((TodoListController) => {
  app.use('/api/todos', setApiHeaders, TodoListController);

  if (!IS_PRODUCTION) {
    // Use webpack-dev-server in development and proxy api requests.
    const webpack = require('webpack');
    const webpackDevServer = require('webpack-dev-server');
    const url = require('url');

    const config = require('../../webpack.config.js');
    // config.entry.app.unshift(
    //   'webpack-dev-server/client?http://localhost:8000/');
    //   //'webpack/hot/dev-server');

    const compiler = webpack(config);
    const server = new webpackDevServer(compiler, {
      contentBase: './public',
      headers: htmlHeaders,
      hot: false,
      proxy: {
        '/api/*': {
          target: 'http://localhost:8080',
        },
      },
    });

    server.listen(8000, () => {
      console.log('Started webpack-dev-server on port: 8000');
    });
  } else {
    app.get('/', (req, res) => {
      Object.entries(htmlHeaders).forEach(([key, val]) => {
        res.setHeader(key, val);
      });
      res.sendFile(path.join(publicPath, 'index.html'));
    });
    app.use(express.static(publicPath, { maxAge: 300 }));
  }

  app.listen(PORT, () => {
    console.log(`Started server on port: ${PORT}`);
  });
});

process.on('unhandledRejection', (err) => { console.log(err.stack); });



const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressJwt = require('express-jwt');
// const session = require('express-session');
// const RedisStore = require('connect-redis')(session);

const config = require('./config');
const { resJson } = require('./utils');
const routes = require('./routes/index');
const users = require('./routes/user');
const checkCode = require('./routes/checkCode');
const api = require('./routes/apiV2');
const apiEnd = require('./routes/apiEnd');
const log = require('./controllers/logToMysql');

const app = express();

const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));


app.use(cookieParser());
// app.use(session({
//   // store: new RedisStore({
//   //   host: '127.0.0.1', // Redis服务器名
//   //   port: 6379, // Redis服务器端口
//   //   // prefix: 'cadillac', // 数据表前辍即schema, 默认为 "sess:"
//   //   // ttl: 1000, // Redis session TTL 过期时间 （秒）
//   //   // disableTTL: true, // disableTTL 禁用设置的 TTL
//   //   // db: 1, // 使用第几个数据库
//   //   // unref: true,
//   //   // pass: 'secret' // Redis数据库的密码
//   // }),
//   secret: 'Cadillac',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true },
// }))

app.use(cors({
  origin: '*',
}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(expressJwt({ secret: config.secret }).unless({ path: ['/', '/login'] }));

if (!env === 'development') {
  app.use(log);
}

app.use('/', routes);
app.use('/users', users);
app.use('/checkcode', checkCode);
// app.use('/api', api);
app.use('/api/v2', api);
app.use('/end/', apiEnd);

// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// / error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error',
    });
  });
}

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send('invalid token...');
  }
  next(err);
});

app.use((err, req, res, next) => {
  switch (err.status) {
    // 请求体包含语法错误
    case 400:
      res.status(400).json(resJson(err, err.message));
      break;
    // 需要验证用户身份，如果服务器就算是身份验证后也不允许客户访问资源，应该响应 403 Forbidden 。如果请求里有 Authorization 头，那么必须返回一个 WWW-Authenticate 头
    case 401:
      res.status(401).json(resJson(err, err.message));
      break;
    // 服务器拒绝执行
    case 403:
      res.status(403).json(resJson(err, err.message));
      break;
    // 找不到目标资源
    case 404:
      res.status(404).json(resJson(err, err.message));
      break;
    // 要求先决条件，如果想要请求能成功必须满足一些预设的条件
    // case 428:
    //   res.status(428).json(resJson(err, err.message));
    //   break;
    case 500:
      res.status(500).json(resJson(err, err.message));
      break;
    default:
      return next(err);
  }
});

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err,
    title: 'error',
  });
});


module.exports = app;

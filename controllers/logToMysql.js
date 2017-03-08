const onFinished = require('on-finished');
const models = require('../models');

function logToMysql(req, res, next) {
  // console.log('2222', err);
  onFinished(res, () => {
    // if (err) {
    //   console.log("11111111111", err);
    // }
    // console.log('start>');
    // console.log(`${reqweq.user.userName}--${req.ip}--${req.method}--${req.originalUrl}--${res.statusCode}--`);
    models['SysLog']
      .create({
        sysLogType: res.statusCode,
        operateId: req.user ? req.user.id : '',
        operateUser: req.user ? req.user.userName : '',
        source: req.ip,
        content: req.originalUrl,
        method: req.method,
      });
  });
  next();
}

module.exports = logToMysql;

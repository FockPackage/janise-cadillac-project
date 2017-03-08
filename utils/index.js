const crypto = require('crypto');

/**
 * 生成密文
 *
 * @param {string} text 明文
 * @returns {string}
 */
function gengratingCiphertext(text) {
  const txt = text;
  const salt = 'abcdefghijklmnopqrstuvwxyz';

  const key = crypto.pbkdf2Sync(txt, salt, 4096, 256, 'sha512');
  return key.toString('hex');
}

/**
 * 判断:model是否是models中找到
 *
 * @param {string} modelName  req.params.model
 * @param {object} models models
 * @returns {boolean}
 */
function isModel(modelName, models) {
  const keys = Object.keys(models);
  const obj = keys.filter((key) => {
    return (key !== 'sequelize' && key !== 'Sequelize');
  }).find((key) => {
    return key === modelName;
  });
  if (obj) {
    return true;
  }
  return false;
}

/**
 * 用来生成返回信息
 *
 * @param {object} err 错误信息对象
 * @param {string} message 消息
 * @param {object | array} row 记录信息
 * @param {number} count
 * @returns
 */
function resJson(err = null, message = '', row = null, count) {
  // 存在错误
  if (err) {
    return {
      code: 1,
      message,
      error: err,
    };
  } else if (row) {
    // 多个数据记录
    if (Array.isArray(row)) {
      return {
        code: 0,
        message,
        rows: row,
        count,
      };
    }
    // 单个数据记录
    return {
      code: 0,
      message,
      row,
    };
  }
  // 无返回数据或者记录
  return {
    code: 0,
    message,
  };
}

/**
 * 去除对象上存在 undefined 的属性
 *
 * @param {any} obj
 */
function removeOjbSpare(obj) {
  const tmp = obj;
  const arr = Object.keys(obj);
  arr.forEach((item) => {
    if (typeof obj[item] === 'undefined' || obj[item] === '') {
      delete tmp[item];
    }
  });
  return tmp;
}

module.exports = {
  gengratingCiphertext,
  isModel,
  resJson,
  removeOjbSpare,
};

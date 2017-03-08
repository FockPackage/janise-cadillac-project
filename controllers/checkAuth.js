const models = require('../models');
const { handleGetUserRoleAndModuleById } = require('./end/adUser');
const { resJson } = require('../utils');

const env = process.env.NODE_ENV || 'development';

function getAllSubModules(role) {
  let list = [];
  const moduleArr = role.get().module;
  moduleArr.forEach((item) => {
    const arr = item.subModule.map((sub) => {
      return sub.get();
    });
    list = list.concat(arr);
  });
  return list;
}

function isHave(list, value) {
  return list.some((item) => {
    return item.value === value;
  });
}

/**
 * 验证权限，是否允许继续操作
 *
 * @param {any} options
 * @returns
 */
function checkAuth(options) {
  const value = options;
  return (req, res, next) => {
    if (env === 'development') {
      return next();
    }
    // 默认都不允许通过检查
    let state = false;
    handleGetUserRoleAndModuleById(req.user.id)
      .then((user) => {
        const list = getAllSubModules(user.get().role);
        state = isHave(list, value);
        if (state) {
          next();
        } else {
          const error = new Error('Permission denied');
          error.status = 403;
          return next(error);
          // res.status(403).json(resJson(null, 'Permission denied'));
        }
      })
      .catch((err) => {
        const error = err;
        error.status = error.status || 500;
        if (error.status === 500) {
          error.message = 'check auth error';
        }
        return next(error);
        // const error = new Error('Permission denied');
        // error.status = 403;
        // res.status(500).json(resJson(err, 'check auth error'));
      });
  };
}

module.exports = checkAuth;

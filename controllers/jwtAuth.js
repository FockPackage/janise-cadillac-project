const jwt = require('jsonwebtoken');

const config = require('../config');
const { resJson } = require('../utils');
const { gengratingCiphertext } = require('../utils');
const models = require('../models');
const { handleGetRoleById } = require('./end/adRole');

/**
 * jwt 认证 - express-jwt
 *
 * @param {object} req 请求
 * @param {object} res 返回
 * @returns
 */
function login(req, res, next) {
  const body = req.body;
  const { userName, password } = body;
  if (!userName) {
    const error = new Error('userName require');
    error.status = 400;
    return next(error);
    // return res.status(400).json(resJson(null, ));
  }
  if (!password) {
    const error = new Error('password require');
    error.status = 400;
    return next(error);
    // return res.status(400).json(resJson(null, 'password require'));
  }
  models.AdUser.findOne({ where: { userName } })
    .then((adUser) => {
      if (!adUser) {
        const error = new Error('user not find');
        error.status = 401;
        return next(error);
        // return res.status(401).json(resJson(null, 'user not find'));
      }
      if (gengratingCiphertext(password) !== adUser.password) {
        const error = new Error('invaild password');
        error.status = 401;
        return next(error);
        // return res.status(401).json(resJson(null, 'invaild password'));
      }
      handleGetRoleById(adUser.roleId)
        .then((role) => {
          adUser.setDataValue('role', role);
          const authToken = jwt.sign({
            // 2 小时失效
            // exp: Math.floor(Date.now() / 1000) + (60 * 60 * 8),
            id: adUser.id,
            userName: adUser.userName,
            userType: adUser.userType,
            companyId: adUser.companyId,
            name: adUser.name,
            // roleId: adUser.roleId,
          }, config.secret);
          return res.json({
            code: 0,
            message: 'login is success',
            authToken,
            row: adUser,
          });
        })
        .catch((err) => {
          const error = err;
          error.status = error.status || 500;
          if (error.status === 500) {
            error.message = 'login fail';
            return next(error);
            // return Promise.reject(error);
          }
          // res.status(500).json(resJson(err, 'login fail'));
        });
    });
}

module.exports = {
  login,
};

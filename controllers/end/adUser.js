const { resJson } = require('../../utils');
const models = require('../../models');
const handleGetAll = require('../handleGetAll');
const { handleGetRoleById } = require('./adRole');

const attributes = {
  exclude: [
    'createBy',
    'updateBy',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

/**
 * 助手通过用户id查询用户信息（用户角色，用户模块，子模块）
 *
 * @param {any} id
 * @returns
 */
function handleGetUserRoleAndModuleById(id) {
  return new Promise((resolve, reject) => {
    models['AdUser']
      .findById(id, {
        attributes,
      })
      .then((adUser) => {
        if (adUser) {
          handleGetRoleById(adUser.roleId, { attributes })
            .then((item) => {
              const user = adUser;
              user.setDataValue('role', item);
              resolve(user);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          const error = new Error('find "User" fail');
          error.status = 500;
          reject(error);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 获取用户信息
 *
 * @param {any} req
 * @param {any} res
 */
function getUser(req, res, next) {
  const query = req.query;
  const { limit, offset } = query;
  const body = {
    include: [
      {
        model: models['AdRole'],
        as: 'role',
      },
    ],
  };

  const modelName = 'AdUser';
  handleGetAll(req, res, 'AdUser', body, limit, offset)
    .then((result) => {
      if (result.rows.length > 0) {
        res.json(resJson(null, `find ${modelName} success!`, result.rows, result.count));
      } else {
        res.json(resJson(null, `find ${modelName} success!`, result.rows));
      }
    })
    .catch((err) => {
      return next(err);
    });
}

/**
 * 通过用户id查询用户信息（用户角色，用户模块，子模块）
 *
 * @param {any} req
 * @param {any} res
 */
function getUserRoleAndModuleById(req, res, next) {
  const modelName = 'UserRole';
  handleGetUserRoleAndModuleById(req.params.id)
    .then((user) => {
      res.status(200).json(resJson(null, 'find "UserRole" success', user));
    })
    .catch((err) => {
      const error = err;
      error.status = error.status || 500;
      if (error.status === 500) {
        error.message = `find ${modelName} fail`;
      }
      next(error);
    });
}

module.exports = {
  getUser,
  getUserRoleAndModuleById,
  handleGetUserRoleAndModuleById,
};


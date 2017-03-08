const models = require('../../models');
const handleGetAll = require('../handleGetAll');
const { resJson } = require('../../utils');
/**
 * 客户管理
 */


/**
 * 获取客户列表
 *
 * @param {any} req
 * @param {any} res
 */
function getCustom(req, res, next) {
  const query = req.query;
  const { limit, offset } = query;
  if (limit && offset) {
    delete query.limt;
    delete query.offset;
  }
  const body = {
    where: query,
  };

  const modelName = 'Custom';
  handleGetAll(req, res, modelName, body, limit, offset)
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
 * 新建客户
 *
 * @param {any} req
 * @param {any} res
 */
function postCustom(req, res, next) {
  const query = req.body;

  const modelName = 'Custom';
  models['Custom'].findOne({
    where: {
      mobile: query.mobile,
    },
  }).then((custom) => {
    if (custom) {
      // const error = new Error(`the ${modelName} is existing`);
      // return next(error);
      return res.status(428).json(resJson(null, `the ${modelName} is existing`, custom));
    }
    models['Custom']
      .create(query)
      .then((result) => {
        return res.json(resJson(null, `create ${modelName} success`, result));
      })
      .catch((err) => {
        const error = err;
        error.status = error.status || 415;
        if (error.status === 415) {
          error.message = `create ${modelName} fail`;
        }
        return next(err);
        // return res.status(415).json(resJson(err, 'create \'Custom\' fail'));
      });
  }).catch((err) => {
    const error = err;
    error.status = error.status || 500;
    if (error.status === 500) {
      error.message = `create ${modelName} fail`;
    }
    return next(err);
    // return res.status(500).json(resJson(err, 'create \'Custom\' fail'));
  });
}

/**
 * 根据id更新客户信息
 *
 * @param {any} req
 * @param {any} res
 */
function updateCustom(req, res, next) {
  const params = req.params;
  const query = req.body;

  const modelName = 'Custom';
  models['Custom']
    .update(query, { where: { id: params.id } })
    .then(() => {
      return res.json(resJson(null, `update ${modelName} success`));
    })
    .catch((err) => {
      const error = err;
      error.status = error.status || 500;
      if (error.status === 500) {
        error.message = `update ${modelName} fail`;
      }
      return next(err);
      // return res.status(403).json(resJson(err, 'update \'Custom\' fail'));
    });
}


/**
 * 根据id删除客户信息
 *
 * @param {any} req
 * @param {any} res
 */
function deleteCustom(req, res, next) {
  const params = req.params;
  const modelName = 'Custom';
  models['Custom']
    .destroy({
      where: {
        id: params.id,
      },
    })
    .then(() => {
      return res.json(resJson(null, `delete ${modelName} success`));
    })
    .catch((err) => {
      const error = err;
      error.status = error.status || 403;
      if (error.status === 403) {
        error.message = `delete ${modelName} fail`;
      }
      return next(err);
      // return res.status(403).json(resJson(err, 'delete \'Custom\' fail'));
    });
}

module.exports = {
  getCustom,
  postCustom,
  updateCustom,
  deleteCustom,
};

const { resJson } = require('../utils');
const models = require('../models');


/**
 * 分页查询或者不分页查询助理
 *
 * @param {object} req 请求
 * @param {object} res 返回
 * @param {string} modelName model名称 首字母大写
 * @param {array} attributes 数组
 */
function handleGetAll(req, res, modelName, body = {}, limit = 0, offset = 0) {
  return new Promise((resolve, reject) => {
    if (typeof body !== 'object') {
      const error = new Error('缺少参数body');
      error.status = 403;
      reject(error);
    }

    // 分页查询
    if (limit && offset) {
      const obj = body;
      obj.limit = +limit;
      obj.offset = +offset;
      models[modelName]
        .findAndCount(obj)
        .then((result) => {
          resolve(result);
          // if (result.count > 0) {
          //   res.json(resJson(null, `find '${modelName}' success!`, result.rows, result.count));
          // } else {
          //   res.status(404).json(resJson(null, `find '${modelName}' is none!`));
          // }
        }).catch((err) => {
          const error = err;
          error.status = error.status || 500;
          if (error.status === 500) {
            error.message = `find '${modelName}' fail!`;
          }
          reject(error);
          // res.status(500).json(resJson(err, `find '${modelName}' fail!`));
          // throw err;
        });
    } else {
      // 不分页查询
      models[modelName]
        .findAll(body)
        .then((result) => {
          resolve({
            rows: result,
            count: result.length,
          });
          // if (result.length > 0) {
          //   res.json(resJson(null, `find '${modelName}' success!`, result));
          // } else {
          //   res.status(200).json(resJson(null, `find '${modelName}' is none!`));
          // }
        }).catch((err) => {
          const error = err;
          error.status = error.status || 500;
          if (error.status === 500) {
            error.message = `find '${modelName}' fail!`;
          }
          reject(error);
          // res.status(500).json(resJson(err, `find '${modelName}' fail!`));
          // throw err;
        });
    }
  });
}


module.exports = handleGetAll;

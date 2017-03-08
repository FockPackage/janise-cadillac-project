const { resJson } = require('../utils');
const models = require('../models');

/**
 * 创建记录助手
 *
 * @param {any} req
 * @param {any} res
 * @param {any} modelName
 * @param {any} obj
 */
function handleCreate(req, res, modelName, obj) {
  return new Promise((resolve, reject) => {
    let body = {};
    if (obj) {
      body = obj;
    } else {
      body = req.body;
    }
    if (req.user) {
      body.createBy = req.user.userName;
    }
    // if (req.user && req.user.companyId) {
    //   body.companyId = req.user.companyId;
    // }
    models[modelName]
      .create(body)
      .then((result) => {
        resolve(result);
        // res.json();
      })
      .catch((err) => {
        const error = err;
        error.status = error.status || 500;
        reject(error);
        // res.json(resJson(err, `create '${modelName}' is fail!`));
      });
  });
}


module.exports = handleCreate;

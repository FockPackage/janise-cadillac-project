const { resJson } = require('../utils');
const models = require('../models');


/**
 * 更新记录助手
 *
 * @param {any} req
 * @param {any} res
 * @param {any} modelName
 * @param {any} obj
 */
function handleUpdateById(req, res, modelName, obj) {
  return new Promise((resolve, reject) => {
    let body = {};
    if (obj) {
      body = obj;
    } else {
      body = req.body;
    }
    if (req.user) {
      body.updateBy = req.user.userName;
    }
    // if (req.user && req.user.companyId) {
    //   body.companyId = req.user.companyId;
    // }
    // models[modelName]
    //   .findById(req.params.id)
    //   .then((result) => {
    //     result
    //       .update(body)
    //       .then(() => {
    //         return res.status(200).json(resJson(null, `update '${modelName}' success`));
    //       })
    //       .catch((err) => {
    //         return res.status(403).json(resJson(err, `update '${modelName}' fail`));
    //       });
    //   })
    //   .catch((err) => {
    //     return res.status(403).json(resJson(err, `update '${modelName}' fail`));
    //   });

    models[modelName]
      .update(body, { where: { id: req.params.id } })
      .then(() => {
        resolve();
        // return res.status(200).json(resJson(null, `update '${modelName}' success`));
      })
      .catch((err) => {
        const error = err;
        error.status = error.status || 500;
        if (error.status === 500) {
          error.message = `update '${modelName}' fail`;
        }
        reject(error);
        // return res.status(403).json(resJson(err, `update '${modelName}' fail`));
      });
  });
}


module.exports = handleUpdateById;

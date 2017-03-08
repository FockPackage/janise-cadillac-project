const { resJson } = require('../utils');
const models = require('../models');


/**
 * 删除记录助手
 *
 * @param {any} req
 * @param {any} res
 * @param {any} modelName
 */
function handleDeleteById(req, res, modelName) {
  // if (req.user && req.user.companyId) {
  //   body.companyId = req.user.companyId;
  // }
  return new Promise((resolve, reject) => {
    models[modelName]
      // .findById(req.params.id)
      .destroy({
        where: { id: req.params.id },
      })
      .then(() => {
        resolve();
        // return res.status(200).json(resJson(null, `delete '${modelName}' of '${req.params.id}' success`));
      })
      .catch((err) => {
        const error = err;
        error.status = error.status || 403;
        if (error.status === 403) {
          error.message = `delete '${modelName}' of '${req.params.id}' fail`;
        }
        reject(error);
        // return res.status(403).json(resJson(err, `delete '${modelName}' of '${req.params.id}' fail`));
      });
  });
}


module.exports = handleDeleteById;

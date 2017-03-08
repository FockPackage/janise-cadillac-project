const { resJson } = require('../utils');
const models = require('../models');


function handleGetById(req, res, modelName, attributes) {
  return new Promise((resolve, reject) => {
    const params = req.params;
    const { id } = params;
    models[modelName]
      .findById(id)
      .then((result) => {
        resolve(result);
        // if (result) {
        //   return res.status(200).json(resJson(null, `find '${modelName}' success!`, result));
        // }
        // return res.status(404).json(resJson(null, `find '${modelName}' is none!`));
      })
      .catch((err) => {
        const error = err;
        error.status = error.status || 500;
        if (error.status === 500) {
          error.message = `find '${modelName}' fail!`;
        }
        reject(error);
        // res.status(500).json(resJson(err, `find '${modelName}' fail!`));
        // throw err;
      });
  });
}

module.exports = handleGetById;

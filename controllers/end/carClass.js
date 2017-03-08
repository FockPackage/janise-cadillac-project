const { resJson } = require('../../utils');
const models = require('../../models');

function postCarWarehouseArr(req, res, next) {
  const body = req.body;
  const arr = body.items;

  const modelName = 'CarRelation';
  const parr = arr.map((item) => {
    return models['CarRelation'].create(item);
  });
  Promise.all(parr)
    .then(() => {
      res.json(resJson(null, 'create "carClass" success'));
    })
    .catch((err) => {
      const error = err;
      error.status = error.status || 500;
      if (error.status === 500) {
        error.message = `create ${modelName} fail`;
      }
      next(error);
      // res.status(500).json(resJson(err, 'create "classIfy" fail'));
    });
}

module.exports = {
  postCarWarehouseArr,
};

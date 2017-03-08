const { resJson } = require('../../utils');
const models = require('../../models');
const handleDeleteById = require('../../controllers/handleDeleteById');

function deleteCarRelationById(req, res, next) {
  const modelName = 'CarRelation';
  handleDeleteById(req, res, 'CarRelation')
    .then(() => {
      res.json(resJson(null, `delete ${modelName} success`));
    })
    .catch((err) => {
      return next(err);
    });
}

function postCarRelationClass(req, res, next) {
  const body = req.body;
  const arr = body.items;

  const modelName = 'CarRelation';
  models['CarRelation']
    .bulkCreate(arr)
    .then(() => {
      res.status(200).json(resJson(null, 'create "carClass" success'));
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
  // const parr = arr.map((item) => {
  //   return models['CarRelation'].create(item);
  // });
  // Promise.all(parr)
}


function updateCarRelaction(req, res) {
  const body = req.body;
  const { carSummary3, carConfigId, carTypeId, carYearId } = body;

  models['CarRelation']
    .update({
      carSummary3,
    }, {
      where: {
        carConfigId,
        carTypeId,
      },
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

module.exports = {
  postCarRelationClass,
  deleteCarRelationById,
  updateCarRelaction,
};


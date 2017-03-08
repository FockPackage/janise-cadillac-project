const { resJson, removeOjbSpare } = require('../../utils');
const models = require('../../models');
const handleDeleteById = require('../../controllers/handleDeleteById');

function postAccessories(req, res) {
  const body = req.body;
  models['Accessories']
    .create(body)
    .then(() => {
      res.status(200).json(resJson(null, 'create "Accessories" success'));
    })
    .catch((err) => {
      res.status(500).json(resJson(err, 'create "Accessories" fail'));
    });
}

function updateAccessories(req, res) {
  const body = req.body;
  models['Accessories']
    .update(removeOjbSpare(body), {
      where: {
        id: req.params.id,
      },
    })
    .then(() => {
      res.status(200).json(resJson(null, 'update "Accessories" success'));
    })
    .catch((err) => {
      res.status(500).json(resJson(err, 'update "Accessories" fail'));
      throw err;
    });
}

function deleteAccessories(req, res, next) {
  const modelName = 'Accessories';
  handleDeleteById(req, res, 'Accessories')
    .then(() => {
      res.json(resJson(null, `delete ${modelName} success`));
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = {
  postAccessories,
  deleteAccessories,
  updateAccessories,
};

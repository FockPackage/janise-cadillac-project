const { resJson, removeOjbSpare } = require('../../utils');
const models = require('../../models');
// const handleDeleteById = require('../../controllers/handleDeleteById');
const handleUpdate = require('../handleUpdate');
const handleGetAll = require('../handleGetAll');

// function postAccessories(req, res) {
//   const body = req.body;
//   models['Accessories']
//     .create(body)
//     .then(() => {
//       res.status(200).json(resJson(null, 'create "Accessories" success'));
//     })
//     .catch((err) => {
//       res.status(500).json(resJson(err, 'create "Accessories" fail'));
//     });
// }
/**
 * 获取配件类型
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
function getAccessories(req, res, next) {
  const query = req.query;
  const { fitCode, fitName, limit, offset } = query;
  const where = {};
  if (fitCode) {
    where.fitCode = fitCode;
  }
  if (fitName) {
    where.fitName = fitName;
  }
  const body = {
    where,
    include: [
      { model: models['VqValue'], as: 'fitType' },
    ],
  };
  const modelName = 'Accessories';
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

function updateAccessories(req, res, next) {
  const body = req.body;
  const { fitCode, fitName, defaultImgSrc, description, fitTypeId, isOfficial, suitableForCar } = body;

  const modelName = 'Accessories';
  handleUpdate(req, res, 'Accessories', removeOjbSpare({
    fitCode,
    fitName,
    defaultImgSrc,
    description,
    fitTypeId,
    isOfficial,
    suitableForCar,
  }))
    .then(() => {
      res.json(resJson(null, `create ${modelName} success`));
    })
    .catch((err) => {
      return next(err);
    });
}

// function deleteAccessories(req, res) {
//   handleDeleteById(req, res, 'Accessories');
// }

module.exports = {
  getAccessories,
  updateAccessories,
  // postAccessories,
  // deleteAccessories,
};

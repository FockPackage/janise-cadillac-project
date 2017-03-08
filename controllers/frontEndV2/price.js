
const handleGetAll = require('../handleGetAll');
const handleCreate = require('../handleCreate');
const handleUpdate = require('../handleUpdate');
const { removeOjbSpare, resJson } = require('../../utils');

/**
 * 价格管理
 */


/**
 * 查询被改过的车辆库存
 *
 * @param {any} req
 * @param {any} res
 */
function getCarChanged(req, res, next) {
  const query = req.query;
  const { limit, offset } = query;
  const body = {
    where: {
      isChanged: true,
    },
  };

  const modelName = 'CarWarehouse';
  handleGetAll(req, res, 'CarWarehouse', body, limit, offset)
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
 * 查询被改动的配件库存
 *
 * @param {any} req
 * @param {any} res
 */
function getFitChanged(req, res, next) {
  const query = req.query;
  const { limit, offset } = query;
  const body = {
    where: {
      isChanged: true,
    },
  };

  const modelName = 'FitWarehouse';
  handleGetAll(req, res, 'FitWarehouse', body, limit, offset)
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
 * 更新价格
 *
 * @param {any} req
 * @param {any} res
 */
function updateCarSelingPrice(req, res, next) {
  const body = req.body;
  const { carSalesClassId, carPrice1, carPrice3 } = body;
  const obj = {
    carSalesClassId,
    carPrice1,
    carPrice3,
    isChanged: false,
  };
  const modelName = 'CarWarehouse';
  handleUpdate(req, res, 'CarWarehouse', removeOjbSpare(obj))
    .then(() => {
      res.json(resJson(null, `update ${modelName} success`));
    })
    .catch((err) => {
      return next(err);
    });
}

/**
 * 更新车辆配置
 *
 * @param {any} req
 * @param {any} res
 */
function updateCarConfig(req, res, next) {
  const body = req.body;
  const {
    carIdentify,
    carRelationId,
    carSalesClassId,
    closeStatus,
    stockStatus,
    imgSrcs,
    description,
  } = body;
  const obj = {
    carIdentify,
    carRelationId,
    carSalesClassId,
    closeStatus,
    stockStatus,
    imgSrcs,
    description,
    isChanged: false,
  };

  const modelName = 'CarWarehouse';
  handleUpdate(req, res, 'CarWarehouse', removeOjbSpare(obj))
    .then(() => {
      res.json(resJson(null, `update ${modelName} success`));
    })
    .catch((err) => {
      return next(err);
    });
}


/**
 * 更新配件价格,是否可卖 等等....
 *
 * @param {any} req
 * @param {any} res
 */
function updateFitSelingPric(req, res, next) {
  const body = req.body;
  const obj = {
    salePrice: body.salePrice,
    isChanged: false,
  };

  const modelName = 'FitWarehouse';
  handleUpdate(req, res, modelName, removeOjbSpare(obj))
    .then(() => {
      res.json(resJson(null, `update ${modelName} success`));
    })
    .catch((err) => {
      return next(err);
    });
}

/**
 * 更新配件信息
 *
 * @param {any} req
 * @param {any} res
 */
function updateFitConfig(req, res, next) {
  const body = req.body;
  const {
    fitCode,
    stockNumber,
    fitType,
    isOfficial,
    closeStatus,
    marketability,
    imgSrcs,
    description,
  } = body;
  const obj = {
    fitCode,
    stockNumber,
    fitType,
    isOfficial,
    closeStatus,
    marketability,
    imgSrcs,
    description,
    isChanged: false,
  };

  const modelName = 'FitWarehouse';
  handleUpdate(req, res, modelName, removeOjbSpare(obj))
    .then(() => {
      res.json(resJson(null, `update ${modelName} success`));
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = {
  getCarChanged,
  getFitChanged,
  updateCarSelingPrice,
  updateCarConfig,
  updateFitSelingPric,
  updateFitConfig,
};

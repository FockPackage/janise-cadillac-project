const { resJson } = require('../../utils');
const models = require('../../models');
const handleGetAll = require('../handleGetAll');
/**
 * 销售管理
 */

/**
 * 获取所有车型配置，颜色，轮毂，预售价等信息的条目
 *
 * @param {any} req 请求(无参数)
 * @param {any} res 返回
 */
function getCarRelation(req, res, next) {
  const query = req.query;
  const { limit, offset } = query;

  const attributes = [
    'id',
    'officialGuidePrice',
    'callCarPrice',
    'profit',
    'defaultImgSrc',
    'carSummary1',
    'carSummary2',
    'carSummary3',
    'description',
    'carInsideColorId',
    // 'carInsideColor',
    // ['carInsideColor.value', 'carInsideColorValue'],
    // ['carInsideColor.meaning', 'carInsideColorMean'],
    // 'carOutsideColorId',
    // ['carOutsideColor.value', 'carOutsideColorValue'],
    // ['carOutsideColor.meaning', 'carOutsideColorMean'],
    // 'carTypeId',
    // ['carType.value', 'carTypeValue'],
    // ['carType.meaning', 'carTypeMean'],
    // 'carConfigId',
    // ['carConfig.value', 'carConfigValue'],
    // ['carConfig.meaning', 'carConfigMean'],
    // 'carYearId',
    // ['carYear.value', 'carYearValue'],
    // ['carYear.meaning', 'carYearMean'],
    // 'carDisplaceId',
    // ['carDisplace.value', 'carDisplaceValue'],
    // ['carDisplace.meaning', 'carDisplaceMean'],
    // 'carHubId',
    // ['carHub.value', 'carHubValue'],
    // ['carHub.meaning', 'carHubMean'],
  ];
  const body = {
    // attributes,
    include: [
      { model: models['VqValue'], as: 'carInsideColor', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
      { model: models['VqValue'], as: 'carOutsideColor', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
      { model: models['VqValue'], as: 'carType', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
      { model: models['VqValue'], as: 'carConfig', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
      { model: models['VqValue'], as: 'carYear', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
      { model: models['VqValue'], as: 'carDisplace', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
      { model: models['VqValue'], as: 'carHub', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
    ],
  };

  const modelName = 'CarRelation';
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

/**
 * 获取配件类型
 *
 * @param {any} req
 * @param {any} res
 */
function getAccessories(req, res, next) {
  const query = req.query;
  const { limit, offset } = query;

  const body = {
    where: {
      closeStatus: false,
    },
    include: [
      { model: models['VqValue'], as: 'fitType' },
      // { model: models['VqValue'], as: 'CarRelation' },
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

/**
 * 获取车辆库存信息
 *
 * @param {any} req 请求
 * @param {any} res 返回
 */
function getCarRepertory(req, res, next) {
  const query = req.query;
  const { limit, offset } = query;
  if (limit && offset) {
    delete query.limit;
    delete query.offset;
  }
  const where = {
    closeStatus: 0,
    stockStatus: 1,
  };
  const body = {
    where,
  };
  const modelName = 'CarWarehouse';
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

/**
 * 获取保险信息
 *
 * @param {any} req
 * @param {any} res
 */
function getInsurance(req, res, next) {
  const query = req.query;
  const { limit, offset } = query;
  if (limit && offset) {
    delete query.limt;
    delete query.offset;
  }
  const body = {
    where: query,
  };

  const modelName = 'Insurance';
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

module.exports = {
  getCarRelation,
  getCarRepertory,
  getAccessories,
  getInsurance,
};

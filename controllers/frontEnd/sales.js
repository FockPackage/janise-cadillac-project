const { resJson } = require('../../utils');
const models = require('../../models');

/**
 * 销售管理
 */


function getRelation(req, res) {
  models['CarRelation']
    .findAll({
      include: [
        { model: models['VqValue'], as: 'carInsideColor', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
        { model: models['VqValue'], as: 'carOutsideColor', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
        { model: models['VqValue'], as: 'carType', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
        { model: models['VqValue'], as: 'carConfig', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
        { model: models['VqValue'], as: 'carYear', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
        { model: models['VqValue'], as: 'carDisplace', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
        { model: models['VqValue'], as: 'carHub', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
      ],
    })
    .then((carRelation) => {
      res.json(carRelation);
    })
    .catch((err) => {
      res.json(err);
    });
}


/**
 * 获取所有车型、配置、颜色、轮毂、预售价格信息
 *
 * @param {object} req
 * @param {object} res
 */
function getCarRelation(req, res) {
  const attributes = [
    'id',
    'carInsideColorId',
    'carInsideColorValue',
    'carInsideColorMean',
    'carOutsideColorId',
    'carOutsideColor',
    'carOutsideColorMean',
    'carTypeId',
    'carTypeValue',
    'carTypeMean',
    'carConfigId',
    'carConfigValue',
    'carConfigMean',
    'carYearId',
    'carYearValue',
    'carYearMean',
    'carDisplaceId',
    'carDisplaceValue',
    'carDisplaceMean',
    'carHubId',
    'carHubValue',
    'carHubMean',
    'companyId',
    'officialGuidePrice',
    'defaultImgSrc',
    'carSummary1',
    'carSummary2',
    'carSummary3',
    'description',
  ];
  const { companyId } = req.user;
  const body = req.query;
  if (companyId) {
    body.companyId = companyId;
  }
  // 不分页查询
  models['CarRelation'].findAll({
    attributes,
    where: body,
  }).then((result) => {
    if (result.length > 0) {
      res.json(resJson(null, 'find \'CarRelation\' success!', result));
    } else {
      res.status(404).json(resJson(null, 'find \'CarRelation\' is none!'));
    }
  }).catch((err) => {
    res.status(500).json(resJson(err, 'find \'CarRelation\' fail!'));
    throw err;
  });
}

/**
 * 获取车辆库存信息
 *
 * @param {object} req
 * @param {object} res
 */
function getCarRepertory(req, res) {
  const attributes = [
    'id',
    'companyId',
    'carIdentify',
    'carRelationId',
    'carClass',
    'carPrice0',
    'carPrice1',
    'carPrice2',
    'carPrice3',
    'existCarStore',
    'stockStatus',
    'isPromotion',
    'promotionPrice',
    'promotionComm',
    'defaultImgSrc',
    'imgSrcs',
    'description',
  ];
  const { companyId } = req.user;
  const query = req.query;
  if (companyId) {
    query.companyId = companyId;
  }

  // 库存状态为可出库时的数据
  query.stockStatus = true;
  query.closeStatus = false;

  models['Stock'].findAll({
    attributes,
    where: query,
  }).then((result) => {
    if (result.length > 0) {
      res.json(resJson(null, 'find \'Stock\' success!', result));
    } else {
      res.status(404).json(resJson(null, 'find \'Stock\' is none!'));
    }
  }).catch((err) => {
    res.status(500).json(resJson(err, 'find \'Stock\' fail!'));
    throw err;
  });
}

/**
 * TODO: 处理
 */

/**
 * 获取可销售配件信息（包含随车和不随车配件）
 *
 * @param {object} req
 * @param {object} res
 */
function getFitRepertory(req, res) {
  const attributes = [
    'id',
    'fitCode',
    'fitName',
    'batchNo',
    'batchName',
    'companyId',
    'costPrice',
    'salePrice',
    'carRelationId',
    'fitTypeId',
    'marketability',
    'isOfficial',
    'defaultImgSrc',
    'imgSrcs',
    'description',
  ];
  const { companyId } = req.user;
  const query = req.query;
  if (companyId) {
    query.companyId = companyId;
  }

  // 设置只有可销售的配件才能销售
  query.marketability = true;
  query.closeStatus = false;

  models['FitInfo'].findAll({
    attributes,
    where: query,
  }).then((result) => {
    if (result.length > 0) {
      res.json(resJson(null, 'find \'FitInfo\' success!', result));
    } else {
      res.status(404).json(resJson(null, 'find \'FitInfo\' is none!'));
    }
  }).catch((err) => {
    res.status(500).json(resJson(err, 'find \'FitInfo\' fail!'));
    throw err;
  });
}

module.exports = {
  getCarRelation,
  getCarRepertory,
  getFitRepertory,
  getRelation,
};

const handleGetAll = require('../handleGetAll');
const handleCreate = require('../handleCreate');
const handleUpdate = require('../handleUpdate');
const { removeOjbSpare } = require('../../utils');
/**
 * 价格管理
 */


/**
 * 更新车辆价格,是否可卖 ....
 *
 * @param {any} req
 * @param {any} res
 */
function updateCarSelingPrice(req, res) {
  const body = req.body;
  const { carSalesClassId, carPrice1, carPrice3 } = body;
  const obj = {
    carSalesClassId,
    carPrice1,
    carPrice3,
  };
  handleUpdate(req, res, 'Stock', removeOjbSpare(obj));
}


/**
 * 更新车辆信息
 *
 * @param {any} req
 * @param {any} res
 */
function updateCarConfig(req, res) {
  const body = req.body;
  const {
    carIdentify,
    carRelationId,
    closeStatus,
    stockStatus,
    defaultImgSrc,
    imgSrcs,
    description,
  } = body;
  const obj = {
    carIdentify,
    carRelationId,
    closeStatus,
    stockStatus,
    defaultImgSrc,
    imgSrcs,
    description,
  };

  handleUpdate(req, res, 'Stock', removeOjbSpare(obj));
}

/**
 * 更新配件价格,是否可卖 ....
 *
 * @param {any} req
 * @param {any} res
 */
function updateFitSelingPric(req, res) {
  const body = req.body;
  const obj = {
    salePrice: body.salePrice,
  };
  handleUpdate(req, res, 'FitInfo', removeOjbSpare(obj));
}


/**
 * 更新配件信息
 *
 * @param {any} req
 * @param {any} res
 */
function updateFitConfig(req, res) {
  const body = req.body;
  const {
    fitCode,
    fitName,
    batchNo,
    batchName,
    stockNumber,
    carRelationId,
    fitType,
    isOfficial,
    closeStatus,
    marketability,
    defaultImgSrc,
    imgSrcs,
    description,
  } = body;
  const obj = {
    fitCode,
    fitName,
    batchNo,
    batchName,
    stockNumber,
    carRelationId,
    fitType,
    isOfficial,
    closeStatus,
    marketability,
    defaultImgSrc,
    imgSrcs,
    description,
  };
  handleUpdate(req, res, 'FitInfo', removeOjbSpare(obj));
}

module.exports = {
  updateCarSelingPrice,
  updateCarConfig,
  updateFitSelingPric,
  updateFitConfig,
};

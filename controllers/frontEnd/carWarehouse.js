const handleGetAll = require('../handleGetAll');
const handleCreate = require('../handleCreate');
const handleUpdate = require('../handleUpdate');

/**
 * 车辆入库
 */

const attributes = [
  'id',
  'companyId',
  'carIdentify',
  'carRelationId',
  'carSalesClassId',
  'closeStatus',
  'stockStatus',
  'isPromotion',
  'defaultImgSrc',
  'imgSrcs',
  'description',
];

/**
 * 获取仓库中车辆信息
 *
 * @param {any} req
 * @param {any} res
 */
function getCarRepertory(req, res) {
  // 老板查询条件
  const attributesOfBoss = [
    'id',
    'companyId',
    'carIdentify',
    'carRelationId',
    'carSalesClassId',
    'carPrice0',
    'carPrice1',
    'carPrice2',
    'carPrice3',
    'callCarStore',
    'callCarDate',
    'stockDay',
    'closeStatus',
    'stockStatus',
    'isPromotion',
    'promotionPrice',
    'promotionComm',
    'defaultImgSrc',
    'imgSrcs',
    'createBy',
    'description',
  ];
  handleGetAll(req, res, 'Stock', attributes);
}

/**
 * 车辆入库
 *
 * @param {any} req
 * @param {any} res
 */
function postCarRepertory(req, res) {
  handleCreate(req, res, 'Stock');
}

/**
 * 更新车辆库存信息
 *
 * @param {any} req
 * @param {any} res
 */
function updateCarRepertory(req, res) {
  handleUpdate(req, res, 'Stock');
}


module.exports = {
  getCarRepertory,
  updateCarRepertory,
  postCarRepertory,
};

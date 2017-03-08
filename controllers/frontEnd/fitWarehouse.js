const handleGetAll = require('../handleGetAll');
const handleCreate = require('../handleCreate');
const handleUpdate = require('../handleUpdate');

/**
 * 配件入库
 */


/**
 * 获取仓库中配件信息
 *
 * @param {any} req
 * @param {any} res
 */
function getFitRepertory(req, res) {
  const attribute = [
    'id',
    'fitCode',
    'fitName',
    'batchNo',
    'batchName',
    'companyId',
    'carRelationId',
    'fitTypeId',
    'isOfficial',
    'closeStatus',
    'marketability',
    'defaultImgSrc',
    'imgSrcs',
    'description',
  ];
  handleGetAll(req, res, 'FitInfo', attribute);
}

/**
 * 配件入库
 *
 * @param {any} req
 * @param {any} res
 */
function postFitRepertory(req, res) {
  handleCreate(req, res, 'FitInfo');
}

/**
 * 更新配件库存信息
 *
 * @param {any} req
 * @param {any} res
 */
function updateFitRepertory(req, res) {
  handleUpdate(req, res, 'FitInfo');
}

/**
 * TODO: 需要写计算库存数量的逻辑代码
 * 1. 列出所有进库的配件，
 * 2. sumOfIn: 累计配件的所有批次的数量
 * 3. sumOfOut: 累计出已经出库的配件数据
 * 4. sum = sumOfIn - sumOfOut : 库存量
 * 5. return [{
 *        fitId,
 *        stockNumber, // 库存数量
 *        companyId,
 *      }]
 */

/**
 * 获取配件库存量
 *
 * @param {object} req
 * @param {object} res
 */
function getAccessoriesResidueSum(req, res) {

}


module.exports = {
  getFitRepertory,
  updateFitRepertory,
  getAccessoriesResidueSum,
  postFitRepertory,
};

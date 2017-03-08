const { resJson } = require('../../utils');
const models = require('../../models');
const handleGetAll = require('../handleGetAll');
const handleUpdate = require('../handleUpdate');
/**
 * 合同财务管理
 */


/**
 * 查询合同
 *
 * @param {any} req
 * @param {any} res
 */
function getOrder(req, res) {
  handleGetAll(req, res, 'OrderInfo');
}

/**
 * 更新合同
 *
 * @param {any} req
 * @param {any} res
 */
function updateOrder(req, res) {
  handleUpdate(req, res, 'OrderInfo');
}

/**
 * 删除合同
 * 只是把orderStatus 的状态改成 5
 *
 * @param {any} req
 * @param {any} res
 */
function deleteOrder(req, res) {
  const body = {
    orderStatus: 5,
  };
  handleUpdate(req, res, 'OrderInfo', body);
  // const params = req.params;
  // models['OrderInfo']
  //   .update({
  //     orderId: params.id,
  //     orderStatus: 5,
  //   })
  //   .then((result) => {
  //     return res.status(200).json(resJson(null, '\'OrderInfo\' set \'status\' is cancel'));
  //   })
  //   .catch((err) => {
  //     return res.status(403).json(resJson(err, '\'OrderInfo\' set fail'));
  //   });
}

module.exports = {
  getOrder,
  updateOrder,
  deleteOrder,
};

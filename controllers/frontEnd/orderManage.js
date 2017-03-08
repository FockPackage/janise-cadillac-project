const { resJson } = require('../../utils');
const models = require('../../models');

const handleGetAll = require('../handleGetAll');
const handleCreate = require('../handleCreate');
const handleUpdate = require('../handleUpdate');
const handleDeleteById = require('../handleDeleteById');

/**
 * 订单管理
 * 财务不可见，销售可操作
 */

const attributes = [
  'id',
  'orderCode',
  'carIndentify',
  'customId',
  'carPrice',
  'fitPrice',
  'insurancePrice',
  'loanPrice',
  'outStockFee',
  'profit',
  'commision1',
  'commision2',
  'commision3',
  'commision4',
  'manangerId',
  'manangerName',
  'saleId',
  'saleName',
  'carStoreId',
  'carStoreName',
  'deposit',
  'dePostitDate',
  'paymentDate',
  'deliveryCarDate',
  'orderStatus',
  'printDate',
  'printer',
  'description',
];

/**
 *  查询订单/合同
 *
 * @param {any} req
 * @param {any} res
 */
function getOrder(req, res) {
  handleGetAll(req, res, 'OrderInfo');
}

// /**
//  * TODO: 查询客户所拥有的订单（通过名字）
//  */
// function getOrderByClientName(req, res){

// }

/**
 * 新建订单/合同
 *
 * @param {any} req
 * @param {any} res
 */
function postOrder(req, res) {
  handleCreate(req, res, 'OrderInfo');
  // const query = req.query;
  // models['OrderInfo'].findOne({
  //   where: {
  //     mobile: query.mobile,
  //   },
  // }).then((order) => {
  //   if (order) {
  //     return res.status(428).json(resJson(null, 'the \'OrderInfo\' is existing', order));
  //   }
  //   models['OrderInfo']
  //     .create(query)
  //     .then((result) => {
  //       return res.status(200).json(resJson(null, 'create \'OrderInfo\' success'));
  //     })
  //     .catch((err) => {
  //       return res.status(415).json(resJson(err, 'create \'OrderInfo\' fail'));
  //     });
  // }).catch((err) => {
  //   return res.status(500).json(resJson(err, 'create \'OrderInfo\' fail'));
  // });
}

/**
 * TODO: 需要增加当状态发生变化时，修改isReadOfSale 为 fals
 */

/**
 * 更新订单/信息
 *
 * @param {any} req
 * @param {any} res
 */
function updateOrder(req, res) {
  const body = req.body;
  const { orderStatus } = body;
  if (orderStatus && orderStatus >= parseInt(2, 10)) {
    return res.status(403).json(resJson({
      name: '更新失败',
      message: `参数 orderStatus 不允许改成${orderStatus}`,
    }, 'update \'OrderInfo\' fail'));
  }
  handleUpdate(req, res, 'OrderInfo');
}

/**
 * TODO: 处理订单转合同
 */
function orderTOFinance(req, res) {

}

/**
 * 根据id删除订单
 *
 * @param {any} req
 * @param {any} res
 */
function deleteOrder(req, res) {
  const params = req.parmas;

  models['OrderInfo']
    .findById(params.id)
    .then((order) => {
      order.update({
        orderStatus: 1,
      }).then((result) => {
        return res.status(200).json(resJson(null, 'delete \'order\' success'));
      }).catch((err) => {
        return res.status(403).json(resJson(err, 'delete \'order\' fail'));
      });
    }).catch((err) => {
      return res.status(403).json(resJson(err, 'update \'order\' fail'));
    });
}


const attributesOfItems = [
  'id',
  'orderId',
  'itemCode',
  'itemBatch',
  'itemName',
  'itemMean',
  'itemType',
  'costPrice',
  'prePrice',
  'salePrice',
  'profit',
  'batchNo',
  'batchName',
  'itemStatus',
  'printDate',
  'printer',
  'isExcess',
  'description',
];

/**
 * TODO: 增加返回的时候带所有的订单明细表
 */
/**
 * 根据订单/合同id查询订单明细表
 *
 * @param {any} req
 * @param {any} res
 */
function getItemsOfOrder(req, res) {
  handleGetAll(req, res, 'ItemInfo', attributesOfItems);
}

/**
 *  TODO: 前台提交的时候是一个数组
 * [{},{},{}]
 */
/**
 * 创建订单明细表
 *
 * @param {any} req
 * @param {any} res
 */
function postItems(req, res) {
  handleCreate(req, res, 'ItemInfo');
}

/**
 * 更新订单明细表
 *
 * @param {any} req
 * @param {any} res
 */
function updateItems(req, res) {
  handleUpdate(req, res, 'ItemInfo');
}

/**
 * 根据订单明细表id删除订单明细表
 *
 * @param {any} req
 * @param {any} res
 */
function deleteItems(req, res) {
  handleDeleteById(req, res, 'ItemInfo');
}

module.exports = {
  getOrder,
  postOrder,
  updateOrder,
  deleteOrder,
  getItemsOfOrder,
  postItems,
  updateItems,
  deleteItems,
};

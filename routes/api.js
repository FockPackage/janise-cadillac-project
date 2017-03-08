const express = require('express');

const router = express.Router();

const sync = require('../controllers/sync');
const model = require('../controllers/model');
const classify = require('../controllers/classIfy');

const sales = require('../controllers/frontEnd/sales');
const carWarehouse = require('../controllers/frontEnd/carWarehouse');
const clientManage = require('../controllers/frontEnd/clientManage');
const financeManage = require('../controllers/frontEnd/financeManage');
const fitWarehouse = require('../controllers/frontEnd/fitWarehouse');
const orderManage = require('../controllers/frontEnd/orderManage');
const priceMangae = require('../controllers/frontEnd/priceMangae');

/**
 * TODO: 准备去掉此接口
 */
/**
 * 分类查询
 */
router.get('/classify/:type', (req, res) => {
  const params = req.params;
  classify[params.type](req, res);
});

/**
 * 获取车辆相关的类型
 */
router.get('/getClassify', (req, res) => {
  classify.getCarClassify(req, res);
});

/**
 * 销售模块
 */
router.get('/sales/getCarRelation', sales.getCarRelation);
router.get('/sales/getCarRepertory', sales.getCarRepertory);
router.get('/sales/getFitRepertory', sales.getFitRepertory);

/**
 * 客户管理
 */
router.get('/client/getClientMessage', clientManage.getClientMessage);
router.post('/client/postClientMessage', clientManage.postClientMessage);
router.put('/client/updateClientMessage/:id', clientManage.updateClientMessage);
router.delete('/client/deleteClientMessage/:id', clientManage.deleteClientMessage);

/**
 * 报价单管理（销售）
 */
// 订单
router.get('/order/getOrder', orderManage.getOrder);
router.post('/order/postOrder', orderManage.postOrder);
router.put('/order/updateOrder/:id', orderManage.updateOrder);
router.delete('/order/deleteOrder/:id', orderManage.deleteOrder);
// 订单明细表
router.get('/order/getItemsOfOrder', orderManage.getItemsOfOrder);
router.post('/order/postItems', orderManage.postItems);
router.put('/order/updateItems/:id', orderManage.updateItems);
router.delete('/order/deleteItems/:id', orderManage.deleteItems);

/**
 * 合同(财务)
 */
router.get('finance/getOrder', financeManage.getOrder);
router.put('finance/updateOrder/:id', financeManage.updateOrder);
router.delete('/finance/deleteOrder/:id', financeManage.deleteOrder);
/**
 * 车辆入库
 */

router.get('/carWarehouse/getCarRepertory', carWarehouse.getCarRepertory);
router.put('/carWarehouse/updateCarRepertory/:id', carWarehouse.updateCarRepertory);
router.post('/carWarehouse/postCarRepertory', carWarehouse.postCarRepertory);

/**
 * 配件入库
 */
router.get('/fitWarehouse/getFitRepertory', fitWarehouse.getFitRepertory);
router.put('/fitWarehouse/updateFitRepertory/:id', fitWarehouse.updateFitRepertory);
router.get('/fitWarehouse/getAccessoriesResidueSum', fitWarehouse.getAccessoriesResidueSum);
router.post('/fitWarehouse/postFitRepertory', fitWarehouse.postFitRepertory);


/**
 * 价格、是否可卖 。。。。
 */
router.put('/price/updateCarSelingPrice/:id', priceMangae.updateCarSelingPrice);
router.put('/price/updateCarConfig/:id', priceMangae.updateCarConfig);
router.put('/price/updateFitSelingPric/:id', priceMangae.updateFitSelingPric);
router.put('/price/updateFitConfig/:id', priceMangae.updateFitConfig);


/**
 * 同步所有模型到数据库 会删除数据({force: ture})
 */
router.route('/common/sync/:model').get(sync.syncModuleById);
router.route('/common/sync').get(sync.syncModule);

/**
 * 通用基础api 返回原生数据
 */
router.route('/common/:model/:id')
  .put(model.updateModelById)
  .delete(model.deleteModelById)
  .get(model.getModelById);
router.route('/common/:model')
  .post(model.postModel)
  .get(model.getModels);


module.exports = router;

// /**
//  * 配件模块
//  */
// router.get('/warehouseAccessories/getAccessories', warehouseAccessories.getAccessories)
// router.get('/warehouseAccessories/getAccessoriesResidueSum', warehouseAccessories.getAccessoriesResidueSum);

// /**
//  * 车辆入库模块
//  */
// // 获取车辆库存信息
// router.get('/warehouseVehicles/getCarRepertory', warehouseVehicles.getCarRepertory);

// /**
//  * 客户管理模块
//  */
// // 查询客户信息
// router.get('/clientMessage/getClientMessage', clientMessage.getClientMessage)
// router.post('/clientMessage/postClientMessage', clientMessage.postClientMessage)
// router.put('/clientMessage/updateClientMessage', clientMessage.updateClientMessage)
// router.delete('/clientMessage/deleteClientMessage/:id', clientMessage.deleteClientMessage)

// /**
//  * 订单/合同模块
//  */
// // 订单/合同
// router.get('/orderManage/getOrder', orderManage.getOrder)
// router.post('/orderManage/postOrder', orderManage.postOrder)
// router.put('/orderManage/updateOrder', orderManage.updateOrder)
// router.delete('/orderManage/deleteOrder/:id', orderManage.deleteOrder)
// // 订单明细表
// router.get('/orderManage/getItemsOfOrder', orderManage.getItemsOfOrder)
// router.post('/orderManage/postItems', orderManage.postItems)
// router.put('/orderManage/updateItems', orderManage.updateItems)
// router.delete('/orderManage/deleteItems/:id', orderManage.deleteItems)


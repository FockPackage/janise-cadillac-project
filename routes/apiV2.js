const express = require('express');

const router = express.Router();

const sync = require('../controllers/sync');
const model = require('../controllers/model');
const classify = require('../controllers/classIfy');

const sales = require('../controllers/frontEndV2/sales');
const carWarehouse = require('../controllers/frontEndV2/carWarehouse');
const custom = require('../controllers/frontEndV2/custom');
const finance = require('../controllers/frontEndV2/finance');
const fitWarehouse = require('../controllers/frontEndV2/fitWarehouse');
const order = require('../controllers/frontEndV2/order');
const price = require('../controllers/frontEndV2/price');
const accessories = require('../controllers/frontEndV2/accessories');
const checkAuth = require('../controllers/checkAuth');

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
router.get('/sales/getCarRelation', checkAuth('/sales/getCarRelation'), sales.getCarRelation);
router.get('/sales/getCarRepertory', checkAuth('/sales/getCarRepertory'), sales.getCarRepertory);
router.get('/sales/getInsurance', checkAuth('/sales/getInsurance'), sales.getInsurance);
router.get('/sales/getAccessories', checkAuth('/sales/getAccessories'), sales.getAccessories);

/**
 * 客户管理
 */
router.get('/custom/getCustom', checkAuth('/custom/getCustom'), custom.getCustom);
router.post('/custom/postCustom', checkAuth('/custom/postCustom'), custom.postCustom);
router.put('/custom/updateCustom/:id', checkAuth('/custom/updateCustom'), custom.updateCustom);
router.delete('/custom/deleteCustom/:id', checkAuth('/custom/deleteCustom'), custom.deleteCustom);

/**
 * 报价单管理（销售）
 */
// 订单
router.get('/order/getOrder', checkAuth('/order/getOrder'), order.getOrder);
router.post('/order/postOrder', checkAuth('/order/postOrder'), order.postOrder);
router.put('/order/updateOrder/:id', checkAuth('/order/updateOrder'), order.updateOrder);
router.delete('/order/deleteOrder/:id', checkAuth('/order/deleteOrder'), order.deleteOrder);
// 订单明细表
router.post('/order/postOrderItem', checkAuth('/order/postOderItem'), order.postOrderItem);
router.get('/order/getOrderItem/:id', checkAuth('/order/getOrderItemById'), order.getOrderItemById);
router.put('/order/updateOrderItem/:id', checkAuth('/order/updateOrderItemById'), order.updateOrderItemById);
router.delete('/order/deleteOrderItem/:id', checkAuth('/order/deleteOrderItemById'), order.deleteOrderItemById);
// router.delete('/order/deleteItems/:id', order.deleteItems);

/**
 * 合同(财务)
 */
router.get('/finance/getOrder', checkAuth('/finance/getOrder'), finance.getOrder);
router.put('/finance/updateOrder/:id', checkAuth('/finance/updateOrder'), finance.updateOrder);
router.delete('/finance/deleteOrder/:id', checkAuth('/finance/deleteOrder'), finance.deleteOrder);

/**
 * 车辆入库
 */
router.get('/carWarehouse/getCarWarehouse', checkAuth('/carWarehouse/getCarWarehouse'), carWarehouse.getCarWarehouse);
router.put('/carWarehouse/updateCarWarehouse/:id', checkAuth('/carWarehouse/updateCarWarehouse'), carWarehouse.updateCarWarehouse);
router.post('/carWarehouse/postCarWarehouse', checkAuth('/fitWarehouse/postFitWarehouse'), carWarehouse.postCarWarehouse);

/**
 * 配件入库
 */
router.get('/fitWarehouse/getFitWarehouse', checkAuth('/fitWarehouse/getFitWarehouse'), fitWarehouse.getFitWarehouse);
router.put('/fitWarehouse/updateFitWarehouse/:id', checkAuth('/fitWarehouse/updateFitWarehouse'), fitWarehouse.updateFitWarehouse);
// router.get('/fitWarehouse/getAccessoriesResidueSum', fitWarehouse.getFitWarehouse);
router.post('/fitWarehouse/postFitWarehouse', checkAuth('/fitWarehouse/postFitWarehouse'), fitWarehouse.postFitWarehouseAndAccessories);
// router.get('/fitWarehouse/getAccessoreisAndSum', fitWarehouse.getAccessoriesAndSum);
/**
 * 配件类型
 */
router.get('/accessories/getAccessories', accessories.getAccessories);
router.put('/accessories/updateAccessories/:id', checkAuth('/accessories/updateAccessories'), accessories.updateAccessories);

/**
 * 价格、是否可卖 。。。。
 */
router.get('/price/getCarChanged', checkAuth('/price/getCarWarehouse'), price.getCarChanged);
router.get('/price/getFitChanged', checkAuth('/price/getFitWarehouse'), price.getFitChanged);
router.put('/price/updateCarSelingPrice/:id', checkAuth('/price/updateCarSelingPrice'), price.updateCarSelingPrice);
router.put('/price/updateFitSelingPric/:id', checkAuth('/price/updateFitSelingPric'), price.updateFitSelingPric);
router.put('/price/updateCarConfig/:id', price.updateCarConfig);
router.put('/price/updateFitConfig/:id', price.updateFitConfig);


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

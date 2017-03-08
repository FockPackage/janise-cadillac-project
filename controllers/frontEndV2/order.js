const { resJson, removeOjbSpare } = require('../../utils');
const models = require('../../models');
const handleGetAll = require('../handleGetAll');
const handleCreate = require('../handleCreate');
const handleUpdate = require('../handleUpdate');
const handleGetById = require('../handleGetById');
const handleDeleteById = require('../handleDeleteById');

/**
 * 订单管理
 */

/**
 * 查询订单
 *
 * @param {any} req
 * @param {any} res
 */
function getOrder(req, res, next) {
  const query = req.query;
  const { limit, offset, customName, mobile, orderCode, carRelationId, date, carType } = query;

  const where = {};
  if (orderCode) {
    where.orderCode = orderCode;
  }
  if (carRelationId) {
    where.carRelationId = carRelationId;
  }
  // 处理带时间的查询
  if (date) {
    const dateArr = date.split(',');
    if (dateArr.length > 1) {
      where.createAt = {
        $between: [dateArr[0], dateArr[1]],     // BETWEEN 6 AND 10
      };
    } else {
      where.createAt = date;
    }
  }

  const custom = {
    model: models['Custom'],
    as: 'custom',
  };
  if (customName || mobile) {
    custom.where = removeOjbSpare({
      customName,
      mobile,
    });
  }

  const includeOfCarType = {
    model: models['VqValue'],
    as: 'carType',
    attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'],
  };

  if (carType) {
    includeOfCarType.where = {
      meaning: carType,
    };
  }

  const body = {
    where,
    include: [
      {
        model: models['CarRelation'],
        as: 'carRelation',
        include: [
          { model: models['VqValue'], as: 'carInsideColor', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
          { model: models['VqValue'], as: 'carOutsideColor', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
          // { model: models['VqValue'], as: 'carType', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
          { model: models['VqValue'], as: 'carConfig', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
          { model: models['VqValue'], as: 'carYear', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
          { model: models['VqValue'], as: 'carDisplace', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
          { model: models['VqValue'], as: 'carHub', attributes: ['id', 'value', 'defaultImgSrc', 'meaning', 'valueSetId'] },
        ],
      },
      { model: models['CarWarehouse'], as: 'carWarehouse' },
      { model: models['AdUser'], as: 'manager' },
      { model: models['AdUser'], as: 'sale' },
      { model: models['OrderItem'] },
    ],
  };
  body.include.push(custom);
  body.include[0].include.push(includeOfCarType);

  const modelName = 'Order';
  handleGetAll(req, res, 'Order', body, limit, offset)
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
 * 创建订单
 *
 * @param {any} req
 * @param {any} res
 */
function postOrder(req, res, next) {
  const body = req.body;

  const modelName = 'Order';
  handleCreate(req, res, 'Order', body)
    .then(() => {
      res.json(resJson(null, `create ${modelName} success!`));
    })
    .catch((err) => {
      return next(err);
    });
}

/**
 * TODO: 当 orderStatus = 2 时，固话订单相关的所有数据到一个字段中
 */

/**
 * 根据id更新订单
 *
 * @param {any} req
 * @param {any} res
 */
function updateOrder(req, res, next) {
  const body = req.body;

  const modelName = 'Order';
  handleUpdate(req, res, 'Order', body)
    .then(() => {
      res.json(resJson(null, `update ${modelName} success!`));
    })
    .catch((err) => {
      return next(err);
    });
}

/**
 * 删除订单
 * 把 orderStatus 设置为 1
 *
 * @param {any} req
 * @param {any} res
 */
function deleteOrder(req, res, next) {
  const params = req.params;

  const modelName = 'Order';
  models['Order']
    .findById(params.id)
    .then((order) => {
      order.update({
        orderStatus: 1,
      }).then(() => {
        return res.json(resJson(null, `delete ${modelName} success`));
      }).catch((err) => {
        const error = err;
        error.status = error.status || 403;
        if (error.status === 403) {
          error.message = `delete ${modelName} fail`;
        }
        return next(error);
        // return res.status(403).json(resJson(err, 'delete \'order\' fail'));
      });
    }).catch((err) => {
      const error = err;
      error.status = error.status || 403;
      if (error.status === 403) {
        error.message = `delete ${modelName} fail`;
      }
      return next(error);
      // return res.status(403).json(resJson(err, 'update \'order\' fail'));
    });
}

/**
 * 根据id查询订单明细表
 *
 * @param {any} req
 * @param {any} res
 */
function getOrderItemById(req, res, next) {
  const modelName = 'OrderItem';
  handleGetById(req, res, 'OrderItem')
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
 * 创建订单详情表
 *
 * @param {any} req
 * @param {any} res
 */
function postOrderItem(req, res, next) {
  const body = req.body;
  const { items } = body;
  if (!Array.isArray(items)) {
    const error = new Error('items is not find or items is not array');
    error.status = 403;
    return next(error);
    // return res.status(200).json(resJson(err, 'create "OrderItem" fail'));
  }

  const modelName = 'OrderItem';
  const arr = items.map((item) => {
    return models['OrderItem'].create(item);
  });
  Promise.all(arr)
    .then((result) => {
      res.json(resJson(null, `create ${modelName} is success!`, result));
    })
    .catch((err) => {
      const error = err;
      error.status = error.status || 500;
      if (error.status === 500) {
        error.message = `create ${modelName} fail!`;
      }
      return next(error);
      // res.json(resJson(err, 'create "OrderItem" is fail!'));
    });
}


/**
 * 根据id更新订单详情表
 *
 * @param {any} req
 * @param {any} res
 */
function updateOrderItemById(req, res, next) {
  const body = req.body;

  const modelName = 'OrderItem';
  handleUpdate(req, res, 'OrderItem', body)
    .then(() => {
      res.json(resJson(null, `update ${modelName} success`));
    })
    .catch((err) => {
      return next(err);
    });
}

function deleteOrderItemById(req, res, next) {
  const modelName = 'OrderItem';
  handleDeleteById(req, res, modelName)
    .then(() => {
      res.json(resJson(null, `delete ${modelName} success`));
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = {
  getOrder,
  postOrder,
  updateOrder,
  deleteOrder,
  postOrderItem,
  getOrderItemById,
  updateOrderItemById,
  deleteOrderItemById,
};

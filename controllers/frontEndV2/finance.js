const models = require('../../models');
const handleGetAll = require('../handleGetAll');
const handleUpdate = require('../handleUpdate');
const { resJson, removeOjbSpare } = require('../../utils');

/**
 * 财务管理
 */

/**
 * TODO: 获取合同列表
 */
/**
 * 获取合同列表
 *
 * @param {any} req
 * @param {any} res
 */
function getOrder(req, res, next) {
  const query = req.query;
  const { limit, offset, customName, mobile, orderCode, carRelationId, date } = query;

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
  const body = {
    where,
    include: [
      { model: models['CarWarehouse'], as: 'carWarehouse' },
      { model: models['AdUser'], as: 'manager' },
      { model: models['AdUser'], as: 'sale' },
    ],
  };
  body.include.push(custom);

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
 * 更新合同
 *
 * @param {any} req
 * @param {any} res
 */
function updateOrder(req, res, next) {
  const body = req.body;
  const { deposit, dePostitDate, paymentDate, description } = body;
  const obj = {
    dePostitDate,
    paymentDate,
    description,
  };
  if (deposit && dePostitDate) {
    obj.deposit = deposit;
    obj.dePostitDate = dePostitDate;
    obj.orderStatus = 3;
    obj.isReadOfSale = false;
  }
  if (paymentDate) {
    obj.paymentDate = paymentDate;
    obj.orderStatus = 4;
    obj.isReadOfSale = false;
  }

  const modelName = 'Order';
  handleUpdate(req, res, 'Order', obj)
    .then(() => {
      res.json(resJson(null, `update ${modelName} success`));
    })
    .catch((err) => {
      return next(err);
    });
}

/**
 * 删除合同
 * 只把 orderStatus 设置为 5
 *
 * @param {any} req
 * @param {any} res
 */
function deleteOrder(req, res, next) {
  const body = {
    orderStatus: 6,
  };

  const modelName = 'Order';
  handleUpdate(req, res, 'Order', body)
    .then(() => {
      res.json(resJson(null, `update ${modelName} success`));
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = {
  getOrder,
  updateOrder,
  deleteOrder,
};


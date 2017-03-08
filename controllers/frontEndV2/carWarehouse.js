const moment = require('moment');

const handleGetAll = require('../handleGetAll');
const handleCreate = require('../handleCreate');
const handleUpdate = require('../handleUpdate');
const { removeOjbSpare, resJson } = require('../../utils');
const models = require('../../models');

/**
 * 车辆入库管理
 */


/**
 * 获取入库车辆列表
 *
 * @param {any} req
 * @param {any} res
 */
function getCarWarehouse(req, res, next) {
  const query = req.query;
  const { carIdentify, carRelationId, date, limit, offset, carType } = query;

  const where = {};
  if (carIdentify) {
    where.carIdentify = carIdentify;
  }
  if (carRelationId) {
    where.carRelationId = carRelationId;
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
  if (date) {
    const dateArr = date.split(',');
    if (dateArr.length > 1) {
      where.createdAt = {
        $between: [moment(dateArr[0]).toDate(), moment(dateArr[1]).add(1, 'day').toDate()],
        // $between: [new Date(dateArr[0]), new Date(dateArr[1])],     // BETWEEN 6 AND 10
      };
    } else {
      // where.createdAt = '2016-12-29';
      where.createdAt = {
        $between: [moment(date).toDate(), moment(date).add(1, 'day').toDate()],
      };
    }
  }
  const obj = {
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
    ],
  };

  obj.include[0].include.push(includeOfCarType);

  const modelName = 'CarWarehouse';
  handleGetAll(req, res, 'CarWarehouse', obj, limit, offset)
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
 * 创建车辆入库
 *
 * @param {any} req
 * @param {any} res
 */
function postCarWarehouse(req, res, next) {
  const body = req.body;
  const { carIdentify, imgSrcs, description, carRelationId } = body;
  const obj = {
    carRelationId,
    carIdentify,
    imgSrcs,
    description,
  };

  const modelName = 'CarWarehouse';
  handleCreate(req, res, 'CarWarehouse', removeOjbSpare(obj))
    .then(() => {
      res.json(resJson(null, `create ${modelName} success`));
    })
    .catch((err) => {
      return next(err);
    });
}

/**
 * 更新入库车辆信息
 *
 * @param {any} req
 * @param {any} res
 */
function updateCarWarehouse(req, res, next) {
  const body = req.body;
  const { carIdentify, imgSrcs, description, carRelationId, stockStatus } = body;
  if (stockStatus > 1) {
    const error = new Error('stockStatus value is error!');
    error.status = 403;
    return next(error);
  }
  const obj = {
    carRelationId,
    carIdentify,
    stockStatus,
    imgSrcs,
    description,
    isChanged: true,
  };

  const modelName = 'CarWarehouse';
  handleUpdate(req, res, 'CarWarehouse', removeOjbSpare(obj))
    .then(() => {
      res.json(resJson(null, `update ${modelName} success`));
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = {
  getCarWarehouse,
  postCarWarehouse,
  updateCarWarehouse,
};

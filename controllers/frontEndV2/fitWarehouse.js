const moment = require('moment');

const handleGetAll = require('../handleGetAll');
const handleCreate = require('../handleCreate');
const handleUpdate = require('../handleUpdate');
const models = require('../../models');
const { removeOjbSpare, resJson } = require('../../utils');
/**
 * 配件入库 配件库存表
 */

/**
 * 获取配件入库表
 *
 * @param {any} req
 * @param {any} res
 */
function getFitWarehouse(req, res, next) {
  const query = req.query;
  const { limit, offset, date, fitCode, fitName, batchNo, fitType } = query;
  const where = {};
  const accessWhere = {};
  if (batchNo) {
    where.batchNo = batchNo;
  }
  if (fitName) {
    accessWhere.fitName = fitName;
  }
  if (fitCode) {
    accessWhere.fitCode = fitCode;
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

  const accessModel = {
    model: models['Accessories'],
    as: 'accessories',
    include: [
      {
        model: models['VqValue'],
        as: 'fitType',
      },
    ],
  };
  if (fitType) {
    accessModel.include[0].where = {
      meaning: fitType,
    };
  }
  accessModel.where = accessWhere;

  const obj = {
    where,
    include: [
    ],
  };
  obj.include.push(accessModel);

  const modelName = 'FitWarehouse';
  handleGetAll(req, res, 'FitWarehouse', obj, limit, offset)
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
 * 创建配件入库
 *
 * @param {any} req
 * @param {any} res
 */
// function postFitWarehouse(req, res) {
//   const body = req.body;
//   const { accessoriesId, fitCode, fitName, batchNo, batchName, imgSrcs, fitType, isOfficial, description } = body;
//   const obj = {
//     accessoriesId,
//     fitCode,
//     fitName,
//     batchNo,
//     batchName,
//     imgSrcs,
//     fitType,
//     isOfficial,
//     description,
//   };

//   handleCreate(req, res, 'FitWarehouse', removeOjbSpare(obj));
// }

/**
 * 创建配件入库（同时判断是否存在配件类型，如果不存在则先创建配件类型）
 *
 * @param {any} req
 * @param {any} res
 */
function postFitWarehouseAndAccessories(req, res, next) {
  const body = req.body;
  const {
    fitCode,
    fitName,
    batchNo,
    batchName,
    fitNumber,
    fitTypeId,
    isOfficial,
    description,
    suitableForCar,
    defaultImgSrc,
  } = body;

  // 判断配件是否存在
  models['Accessories']
    .findOne({
      where: {
        fitCode,
      },
    })
    .then((item) => {
      // 类库中存在配件类型， 配件入库
      if (item) {
        const modelName = 'FitWarehouse';
        handleCreate(req, res, 'FitWarehouse', removeOjbSpare({
          accessoriesId: item.accessoriesId,
          fitCode: item.fitCode,
          fitName: item.fitName,
          batchNo,
          batchName,
          fitNumber,
          fitTypeId,
          description,
        }))
          .then(() => {
            return res.json(resJson(null, `create ${modelName} success`));
          })
          .catch((err) => {
            return next(err);
          });
      } else {
        // 类库中不存在配件类型， 先创建配件类型，再配件入库
        models['Accessories']
          .create(removeOjbSpare({
            fitCode,
            fitName,
            fitTypeId,
            suitableForCar,
            isOfficial,
            defaultImgSrc,
          }))
          .then((access) => {
            const modelName = 'FitWarehouse';
            handleCreate(req, res, 'FitWarehouse', removeOjbSpare({
              fitCode,
              fitName,
              batchNo,
              batchName,
              fitNumber,
              description,
              accessoriesId: access.id,
            }))
              .then(() => {
                return res.json(resJson(null, `create ${modelName} success`));
              })
              .catch((err) => {
                return next(err);
              });
          })
          .catch((err) => {
            return next(err);
            // return res.status(500).json(resJson(err, 'post "FitWarehouse" fail'));
          });
      }
    })
    .catch((err) => {
      return next(err);
      // return res.status(500).json(resJson(err, 'post "FitWarehouse" fail'));
    });
}

/**
 * 更新配件入库
 *
 * @param {any} req
 * @param {any} res
 */
function updateFitWarehouse(req, res, next) {
  const body = req.body;
  // const { accessoriesId, fitCode, fitName, batchNo, batchName, imgSrcs, fitType, isOfficial, description } = body;
  const { accessoriesId, batchNo, batchName, fitNumber, description } = body;

  const modelName = 'FitWarehouse';
  handleUpdate(req, res, 'FitWarehouse', removeOjbSpare({
    accessoriesId,
    batchNo,
    batchName,
    fitNumber,
    description,
  }))
    .then(() => {
      res.json(resJson(null, `update ${modelName} success`));
    })
    .catch((err) => {
      return next(err);
    });
  // let obj = {};
  // if (accessoriesId) {
  //   obj = {
  //     accessoriesId,
  //     fitCode,
  //     fitName,
  //     batchNo,
  //     batchName,
  //     imgSrcs,
  //     fitType,
  //     isOfficial,
  //     description,
  //     isChanged: true,
  //   };
  //   handleUpdate(req, res, 'FitWarehouse', removeOjbSpare(obj));
  // } else {

  // models['Accessories']
  //   .findOne({
  //     where: {
  //       fitCode,
  //     },
  //   })
  //   .then((access) => {
  //     if (access) {
  //       handleUpdate(req, res, 'FitWarehouse', removeOjbSpare({
  //         accessoriesId: access.id,
  //         fitCode: access.fitCode,
  //         fitName: access.fitName,
  //         batchNo,
  //         batchName,
  //         fitTypeId: access.fitTypeId,
  //         description,
  //         isChanged: true,
  //       }));
  //     } else {
  //       return res.status(404).json(resJson(null, 'fitCode is not find'));
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).json(resJson(err, 'updateFitWarehouse fail'));
  //   });
  // }
}

module.exports = {
  getFitWarehouse,
  // postFitWarehouse,
  postFitWarehouseAndAccessories,
  updateFitWarehouse,
};

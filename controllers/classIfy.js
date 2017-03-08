const { resJson } = require('../utils');
const models = require('../models');
const handleGetAll = require('./handleGetAll');

const { VqValueSet, VqValue } = models;

const attributes = [
  'id',
  'value',
  'meaning',
  'description',
  'valueSetId',
  'defaultImgSrc',
];

function asyncGet(typeName) {
  return VqValue.findAndCount({
    include: [
      {
        model: models['VqValueSet'],
        where: { valueSetName: typeName },
      },
    ],
  });

  // return new Promise((resolve, reject) => {
  //   VqValueSet.findOne({ where: { valueSetName: typeName } })
  //     .then((vqValueSet) => {
  //       VqValue.findAndCount({
  //         attributes,
  //         where: { vqValueSetId: vqValueSet.id },
  //       })
  //         .then((vq) => {
  //           resolve(vq);
  //         }).catch((err) => {
  //           reject(err);
  //         });
  //     }).catch((err) => {
  //       reject(err);
  //     });
  // });
}

/**
 * 获取车型
 *
 * @param {object} req 请求
 * @param {object} res 返回
 */
function getCarType(req, res) {
  const classIfy = '车型';
  asyncGet(classIfy)
    .then((result) => {
      res.status(200).json(resJson(null, `find "${classIfy}" success`, result.rows, result.count));
    })
    .catch((err) => {
      res.status(500).json(resJson(err, `find "${classIfy}" fail`));
    });
}

/**
 * 获取年份分类
 *
 * @param {object} req 请求
 * @param {object} res 返回
 */
function getYear(req, res) {
  const classIfy = '年份';
  asyncGet(classIfy)
    .then((result) => {
      res.status(200).json(resJson(null, `find "${classIfy}" success`, result.rows, result.count));
    })
    .catch((err) => {
      res.status(500).json(resJson(err, `find "${classIfy}" fail`));
    });
}

/**
 * 获取排量分类
 *
 * @param {object} req 请求
 * @param {object} res 返回
 */
function getDisplace(req, res) {
  const classIfy = '排量';
  asyncGet(classIfy)
    .then((result) => {
      res.status(200).json(resJson(null, `find "${classIfy}" success`, result.rows, result.count));
    })
    .catch((err) => {
      res.status(500).json(resJson(err, `find "${classIfy}" fail`));
    });
}

/**
 * 获取车身颜色分类
 *
 * @param {object} req 请求
 * @param {object} res 返回
 */
function getOutsideColor(req, res) {
  const classIfy = '车身颜色';
  asyncGet(classIfy)
    .then((result) => {
      res.status(200).json(resJson(null, `find "${classIfy}" success`, result.rows, result.count));
    })
    .catch((err) => {
      res.status(500).json(resJson(err, `find "${classIfy}" fail`));
    });
}

/**
 * 获取内饰颜色分类
 *
 * @param {object} req 请求
 * @param {object} res 返回
 */
function getInsideColor(req, res) {
  const classIfy = '内饰颜色';
  asyncGet(classIfy)
    .then((result) => {
      res.status(200).json(resJson(null, `find "${classIfy}" success`, result.rows, result.count));
    })
    .catch((err) => {
      res.status(500).json(resJson(err, `find "${classIfy}" fail`));
    });
}

/**
 * 获取配置分类
 *
 * @param {object} req 请求
 * @param {object} res 返回
 */
function getConfig(req, res) {
  const classIfy = '配置';
  asyncGet(classIfy)
    .then((result) => {
      res.status(200).json(resJson(null, `find "${classIfy}" success`, result.rows, result.count));
    })
    .catch((err) => {
      res.status(500).json(resJson(err, `find "${classIfy}" fail`));
    });
}

/**
 * 获取轮毂分类
 *
 * @param {object} req 请求
 * @param {object} res 返回
 */
function getHub(req, res) {
  const classIfy = '轮毂';
  asyncGet(classIfy)
    .then((result) => {
      res.status(200).json(resJson(null, `find "${classIfy}" success`, result.rows, result.count));
    })
    .catch((err) => {
      res.status(500).json(resJson(err, `find "${classIfy}" fail`));
    });
}

/**
 * 获取配件分类
 *
 * @param {object} req 请求
 * @param {object} res 返回
 */
function getAccessories(req, res) {
  handleGetAll(req, res, 'Accessories');
}

/**
 * 获取车辆的销售类型
 *
 * @param {any} req
 * @param {any} res
 */
function getCarSalesClass(req, res) {
  const classIfy = '销售类型';
  asyncGet(classIfy)
    .then((result) => {
      res.status(200).json(resJson(null, `find "${classIfy}" success`, result.rows, result.count));
    })
    .catch((err) => {
      res.status(500).json(resJson(err, `find "${classIfy}" fail`));
    });
}

/**
 * 获取和车辆有关的分类信息
 *
 * @param {any} req 请求(无需参数)
 * @param {any} res 返回
 */
function getCarClassify(req, res) {
  const attributesOfCar = [
    'id',
    'code',
    'valueSetName',
    'setDesc',
    // 'items',
  ];
  models['VqValueSet']
    .findAndCount({
      attributes: attributesOfCar,
      include: [
        { model: models['VqValue'], as: 'items', attributes: ['id', 'value', 'meaning', 'description', 'defaultImgSrc'] },
      ],
    })
    .then((result) => {
      res.status(200).json(resJson(null, 'find "classIfy" success', result.rows, result.count));
    })
    .catch((err) => {
      res.status(500).json(resJson(err, 'find "classIfy" fail'));
    });
}

function getFitType(req, res) {
  const classIfy = '配件类型';
  asyncGet(classIfy)
    .then((result) => {
      res.status(200).json(resJson(null, `find "${classIfy}" success`, result.rows, result.count));
    })
    .catch((err) => {
      res.status(500).json(resJson(err, `find "${classIfy}" fail`));
    });
}

module.exports = {
  getCarType,
  getYear,
  getDisplace,
  getOutsideColor,
  getInsideColor,
  getConfig,
  getHub,
  getAccessories,
  getCarSalesClass,
  getCarClassify,
  getFitType,
};

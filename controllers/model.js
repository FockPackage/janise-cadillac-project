const { isModel, resJson } = require('../utils');
const models = require('../models');

/**
 * 新建model
 *
 * @param {any} req
 * @param {any} res
 */
function postModel(req, res) {
  const params = req.params;
  const modelName = params.model;
  const body = req.body;
  if (isModel(modelName, models)) {
    models[modelName].create(body).then((result) => {
      res.json(resJson(null, `create '${modelName}' is success!`, result));
    }).catch((err) => {
      res.json(resJson(err, `create '${modelName}' is fail!`));
    });
  }
}

/**
 * 查询model
 *
 * @param {any} req
 * @param {any} res
 */
function getModels(req, res) {
  const modelName = req.params.model;
  const query = req.query;
  const body = query;
  const { limit, offset } = query;
  delete body.limit;
  delete body.offset;
  if (isModel(modelName, models)) {
    // 分页查询记录
    if (limit && offset) {
      models[modelName].findAndCount({
        where: body,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      }).then((result) => {
        if (result.count > 0) {
          res.json(resJson(null, `find '${modelName}' success!`, result.rows, result.count));
        } else {
          res.status(404).json(resJson(null, `find '${modelName}' is none!`));
        }
      }).catch((err) => {
        res.status(500).json(resJson(err, `find '${modelName}' fail!`));
        throw err;
      });
    } else {
      // 查询所有记录
      models[modelName].findAll({
        where: body,
      }).then((result) => {
        if (result.length > 0) {
          res.json(resJson(null, `find '${modelName}' success!`, result));
        } else {
          res.status(404).json(resJson(null, `find '${modelName}' is none!`));
        }
      }).catch((err) => {
        res.status(500).json(resJson(err, `find '${modelName}' fail!`));
        throw err;
      });
    }
  } else {
    res.status(404).json(resJson(null, `find '${modelName}' fail! `));
  }
}

/**
 * 根据id更新模型
 *
 * @param {any} req
 * @param {any} res
 */
function updateModelById(req, res) {
  const params = req.params;
  const id = params.id;
  const modelName = params.model;
  const body = req.body;
  if (isModel(modelName, models)) {
    models[modelName].findById(id).then((instance) => {
      instance.update(body).then((result) => {
        res.json(resJson(null, `update '${modelName}' of '${id}' success!`, result));
      }).catch((err) => {
        res.json(resJson(err, `update '${modelName}' of '${id}' fail!`));
      });
    });
  }
}

/**
 * 根据id删除mox
 *
 * @param {any} req
 * @param {any} res
 */
function deleteModelById(req, res) {
  const params = req.params;
  const id = params.id;
  const modelName = params.model;
  if (isModel(modelName, models)) {
    models[modelName].findById(id).then((instance) => {
      if (instance) {
        return instance.destroy();
      } else {
        throw Error('instance is not find');
      }
    }).then((r) => {
      console.log(r);
      res.status(204).json(resJson(null, `delete '${modelName}' of '${id}' success!`));
    }).catch((err) => {
      // console.log(err);
      if (err.message === 'instance is not find') {
        res.status(404).json(resJson(null, `delete '${modelName}' of '${id}' not find!`));
      } else {
        res.status(500).json(resJson(err, `delete '${modelName}' of '${id} is fail!'`));
        throw err;
      }
    });
  }
}

/**
 * 根据id查询模型
 *
 * @param {any} req
 * @param {any} res
 */
function getModelById(req, res) {
  const params = req.params;
  const id = params.id;
  const modelName = params.model;
  if (isModel(modelName, models)) {
    models[modelName].findById(id).then((result) => {
      res.json(resJson(null, `find '${modelName}' of '${id} success!'`, result));
    }).catch((err) => {
      res.json(resJson(err, `find '${modelName}' of '${id}' fail!`));
    });
  }
}

module.exports = {
  postModel,
  getModels,
  updateModelById,
  deleteModelById,
  getModelById,

};

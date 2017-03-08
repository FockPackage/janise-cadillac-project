const models = require('../models');
const { isModel, resJson } = require('../utils');


/**
 * 把model同步到数据库做映射
 * 当 req.query.force = true 时 强制映射
 *
 * @param {object} req
 * @param {object} res
 */
function syncModule(req, res) {
  const query = req.query;
  const { force } = query;
  const sequelize = models.sequelize;
  sequelize.sync({
    force: (() => { const f = (force === 'true' ? true : false); console.log(f); return f; })(),
  }).then((result) => {
    console.log(result);
    res.status(200).json(resJson(null, `create tables of force=${force} success!`));
  }).catch((err) => {
    res.status(500).json(resJson(err, 'create tables error!'));
    throw err;
  });
}

/**
 * 把model同步到数据库做映射
 * req.params.model 为model名
 * 当 req.query.force = true 时 强制映射
 *
 * @param {object} req
 * @param {object} res
 */
function syncModuleById(req, res) {
  const params = req.params;
  const modelName = params.model;
  if (isModel(modelName, models)) {
    models[modelName].sync({ force: true }).then((result) => {
      console.log(result);
      res.json(resJson(null, `create table: '${modelName}' is success!`));
    });
  }
}

module.exports = {
  syncModule,
  syncModuleById,
};

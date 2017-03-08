const { resJson } = require('../../utils');
const models = require('../../models');
const handleGetAll = require('../handleGetAll');

function getModule(req, res, next) {
  const query = req.query;
  const { limit, offset } = query;
  const body = {
    include: [
      {
        model: models['SubModule'],
        as: 'subModule',
      },
    ],
  };

  const modelName = 'AdUser';
  handleGetAll(req, res, 'AdUser', body, limit, offset)
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

module.exports = {
  getModule,
};


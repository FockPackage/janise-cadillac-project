const { resJson } = require('../../utils');
const models = require('../../models');
// const handleGetAll = require('../handleGetAll');

function handleGetRoleById(id) {
  const attributes = {
    exclude: [
      'createBy',
      'updateBy',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
  };
  return new Promise((resolve, reject) => {
    models['AdRole']
      .findOne({
        where: { id },
      })
      .then((adRole) => {
        if (adRole) {
          const arr = adRole.moduleCodes.split(',');
          // console.log(arr);
          models['AdModule']
            .findAll({
              where: {
                moduleCode: { $in: arr },
              },
              attributes,
              include: [{
                model: models['SubModule'],
                as: 'subModule',
                attributes,
              }],
            })
            .then((adModules) => {
              const role = adRole;
              role.setDataValue('module', adModules);
              resolve(role);
            })
            .catch((err) => {
              const error = err;
              error.status = error.status || 500;
              reject(error);
              // throw err;
            });
        } else {
          const error = new Error('find "Role" is none');
          error.status = 500;
          reject(error);
        }
      })
      .catch((err) => {
        const error = err;
        error.status = error.status || 500;
        reject(error);
      });
  });
}

function getRoleById(req, res, next) {
  handleGetRoleById(req.params.id)
    .then((result) => {
      res.status(200).json(resJson(null, 'find "Role" success', result));
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  getRoleById,
  handleGetRoleById,
};


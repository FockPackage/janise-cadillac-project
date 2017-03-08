const { resJson } = require('../../utils');
const models = require('../../models');
const handleGetAll = require('../handleGetAll');

/**
 * 客户管理
 */

const attributes = [
  'id',
  'customName',
  'age',
  'sex',
  'address',
  'IDNumber',
  'birthday',
  'mobile',
  'education',
  'weixin',
  'email',
  'description',
];

/**
 * 查询客户信息
 *
 * @param {any} req
 * @param {any} res
 */
function getClientMessage(req, res) {
  handleGetAll(req, res, 'CustomInfo', attributes);
}

/**
 * 新建客户信息
 *
 * @param {any} req
 * @param {any} res
 */
function postClientMessage(req, res) {
  const query = req.query;
  models.CustomInfo.findOne({
    where: {
      mobile: query.mobile,
    },
  }).then((custom) => {
    if (custom) {
      return res.status(428).json(resJson(null, 'the \'Custom\' is existing', custom));
    }
    models.CustomInfo
      .create(query)
      .then((result) => {
        return res.status(200).json(resJson(null, 'create \'Custom\' success'));
      })
      .catch((err) => {
        return res.status(415).json(resJson(err, 'create \'Custom\' fail'));
      });
  }).catch((err) => {
    return res.status(500).json(resJson(err, 'create \'Custom\' fail'));
  });
}

/**
 * 更新客户信息
 *
 * @param {any} req
 * @param {any} res
 */
function updateClientMessage(req, res) {
  const query = req.query;
  models.CustomInfo
    .update(query)
    .then((result) => {
      return res.status(200).json(resJson(null, 'update \'Custom\' success'));
    })
    .catch((err) => {
      return res.status(403).json(resJson(err, 'update \'Custom\' fail'));
    });
}

/**
 * 删除客户信息
 *
 * @param {any} req
 * @param {any} res
 */
function deleteClientMessage(req, res) {
  // const query = req.query;
  const params = req.parmas;
  models.CustomInfo
    .destroy({
      where: {
        customId: params.id,
      },
    })
    .then((result) => {
      return res.status(200).json(resJson(null, 'delete \'Custom\' success'));
    })
    .catch((err) => {
      return res.status(403).json(resJson(err, 'delete \'Custom\' fail'));
    });
}

module.exports = {
  getClientMessage,
  postClientMessage,
  updateClientMessage,
  deleteClientMessage,
};

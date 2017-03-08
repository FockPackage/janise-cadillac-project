const express = require('express');

const router = express.Router();

// const models = require('../models');
// const utils = require('../utils');
// const {resJson} = utils;
/* GET users listing. */
router.get('/', function (req, res) {
  res.send('respond with a resource');
});

// router.post('/login', (req, res) => {
//   const body = req.body;
//   const { userName, password } = body;
//   if (userName && password) {
//     models['AdUser'].findOne({
//       where: {
//         userName,
//         password: utils.gengratingCiphertext(password),
//       }
//     }).then(result => {
//       if (result) {
//         req.session.user = result;
//         res.status(200).json(resJson(null, 'login is success!', result));
//         // res.json({
//         //   code: 0,
//         //   message: 'login is success!',
//         //   result,
//         // })
//       } else {
//         res.status(401).json(resJson(null, 'login is fail!'));
//         // res.redirect('/');
//       }
//     }).catch(err => {
//       res.status(500).json(resJson(err, 'login is fail!'));
//     })
//   } else {
//     res.status(400).json(resJson(null, `'${userName}' or '${password}' is error!, login is fail!`))
//   }
// })

module.exports = router;

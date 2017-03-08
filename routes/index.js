const multer = require('multer');
const path = require('path');
const express = require('express');

const router = express.Router();

const config = require('../config');
const { login } = require('../controllers/jwtAuth');

const upload = multer({
  dest: path.join(config.rootPath, 'public/', 'uploads/'),
});

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

/**
 * TODO: 需要写逻辑
 */
/* 文件上传 */
router.post('/upload', upload.any(), (req, res) => {
  res.send('上传成功');
});


/* 登陆 获取jwt */
router.get('/login', (req, res) => {
  res.render('login', { title: '登陆页面' });
});
router.post('/login', login);

/* 创建车型demo */
router.get('/create', (req, res) => {
  res.render('create', {
    title: '创建车辆记录',
  });
});

router.get('/car', (req, res) => {
  res.render('createCarClass', { title: '创建车辆记录' });
});

router.get('/accessories', (req, res) => {
  res.render('createAccessories', { title: '创建配件类型' });
});

module.exports = router;

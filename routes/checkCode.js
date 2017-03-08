const captchapng = require('captchapng');
const express = require('express');

const router = express.Router();

router.use('/img', (req, res) => {
  const width = 100;
  const height = 30;
  const code = parseInt((Math.random() * 9000 + 1000), 10);
  req.session.checkcode = code;

  const p = new captchapng(width, height, code);
  p.color(123, 123, 123, 0);
  p.color(80, 80, 80.255);

  const img = p.getBase64();
  const imgBase64 = new Buffer(img, 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/png',
  });
  res.end(imgBase64);
});

module.exports = router;

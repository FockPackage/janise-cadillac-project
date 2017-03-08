const path = require('path');

const env = process.env.NODE_ENV || 'development';
const config = {
  development: {
    secret: 'ilovecadillac',
    rootPath: path.join(__dirname, '../')
  },
  production: {
    secret: 'ilovecadillac',
    rootPath: path.join(__dirname, '../')
  }
}

module.exports = config[env];

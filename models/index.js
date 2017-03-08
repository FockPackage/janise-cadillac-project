

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
console.log(env);
// const config = require(__dirname + '/..\\config\\config.json')[env];
const config = require(path.join(__dirname, '../', 'config', 'config.json'))[env];
const db = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

const { database, username, password, host, dialect } = config;
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  timezone: '+08:00',
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
});

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 分类
db['VqValue'].belongsTo(db['VqValueSet'], {
  foreignKey: 'valueSetId',
  targetKey: 'id',
});
db['VqValueSet'].hasMany(db['VqValue'], {
  as: 'items',
  foreignKey: 'valueSetId',
  targetKey: 'id',
});

// 用户
db['AdUser'].belongsTo(db['AdRole'], {
  as: 'role',
  foreignKey: 'roleId',
  targetKey: 'id',
});

db['AdModule'].hasMany(db['SubModule'], {
  as: 'subModule',
  foreignKey: 'adModuleId',
  targetKey: 'id',
});

// db['SubModule'].belongsTo(db['AdModule'], {

// });

// 车型，配置，内外饰.... 关系
db['CarRelation'].belongsTo(db['VqValue'], {
  as: 'carInsideColor',
  foreignKey: 'carInsideColorId',
  targetKey: 'id',
});
db['CarRelation'].belongsTo(db['VqValue'], {
  as: 'carOutsideColor',
  foreignKey: 'carOutsideColorId',
  targetKey: 'id',
});
db['CarRelation'].belongsTo(db['VqValue'], {
  as: 'carType',
  foreignKey: 'carTypeId',
  targetKey: 'id',
});
db['CarRelation'].belongsTo(db['VqValue'], {
  as: 'carConfig',
  foreignKey: 'carConfigId',
  targetKey: 'id',
});
db['CarRelation'].belongsTo(db['VqValue'], {
  as: 'carYear',
  foreignKey: 'carYearId',
  targetKey: 'id',
});
db['CarRelation'].belongsTo(db['VqValue'], {
  as: 'carDisplace',
  foreignKey: 'carDisplaceId',
  targetKey: 'id',
});
db['CarRelation'].belongsTo(db['VqValue'], {
  as: 'carHub',
  foreignKey: 'carHubId',
  targetKey: 'id',
});

// 配件类型
db['Accessories'].belongsTo(db['VqValue'], {
  as: 'fitType',
  foreignKey: 'fitTypeId',
  targetKey: 'id',
});
// db['Accessories'].belongsToMany(db['CarRelation'], {
//   through: 'AccessoriesCarRelation',
// });
db['CarRelation'].belongsToMany(db['Accessories'], {
  through: 'AccessoriesCarRelation',
});

// 配件入库
db['FitWarehouse'].belongsTo(db['Accessories'], {
  as: 'accessories',
  foreignKey: 'accessoriesId',
  targetKey: 'id',
});

// 车辆入库
db['CarWarehouse'].belongsTo(db['CarRelation'], {
  as: 'carRelation',
  foreignKey: 'carRelationId',
  targetKey: 'id',
});
db['CarWarehouse'].belongsTo(db['VqValue'], {
  as: 'carSalesClass',
  foreignKey: 'carSalesClassId',
  targetKey: 'id',
});

// 客户
db['Custom'].hasMany(db['Order'], {
  foreignKey: 'customId',
  targetKey: 'id',
});

// 订单
db['Order'].belongsTo(db['CarWarehouse'], {
  as: 'carWarehouse',
  foreignKey: 'carWarehouseId',
  targetKey: 'id',
});
db['Order'].belongsTo(db['CarRelation'], {
  as: 'carRelation',
  foreignKey: 'carRelationId',
  targetKey: 'id',
});
db['Order'].belongsTo(db['Custom'], {
  as: 'custom',
  foreignKey: 'customId',
  targetKey: 'id',
});
db['Order'].belongsTo(db['AdUser'], {
  as: 'manager',
  foreignKey: 'managerId',
  targetKey: 'id',
});
db['Order'].belongsTo(db['AdUser'], {
  as: 'sale',
  foreignKey: 'saleId',
  targetKey: 'id',
});
db['Order'].hasMany(db['OrderItem'], {
  // as: 'order',
  foreignKey: 'orderId',
  targetKey: 'id',
});

// 订单详情
db['OrderItem'].belongsTo(db['Order'], {
  as: 'order',
  foreignKey: 'orderId',
  targetKey: 'id',
});
db['OrderItem'].belongsTo(db['Accessories'], {
  as: 'accessories',
  foreignKey: 'accessoriesId',
  targetKey: 'id',
});
db['OrderItem'].belongsTo(db['FitWarehouse'], {
  as: 'fitWarehouse',
  foreignKey: 'fitWarehouseId',
  targetKey: 'id',
});
db['OrderItem'].belongsTo(db['CarWarehouse'], {
  as: 'carWarehouse',
  foreignKey: 'carWarehouseId',
  targetKey: 'id',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

/**
 * 车辆入库表 （整车库存表）
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('CarWarehouse', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      comment: '入库ID',
    },
    carIdentify: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '车辆识别代码',
    },
    carPrice1: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '总经理车辆价格',
    },
    carPrice2: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '分店经理车辆价格',
    },
    carPrice3: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '销售预计车辆价格',
    },
    callCarStore: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Call车门店',
    },
    callCarDate: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Call车开始时间',
    },
    existCarStore: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '现存门店',
    },
    closeStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '是否关闭', // 默认 false,理解为可卖状态。 当值未true时 此车为不能再卖
    },
    stockStatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: '整车库存状态', // 0: 不可出库状态， 1: 可出库状态 2: 已经出库状态
    },
    allocateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '调拨时间',
    },
    isPromotion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '是否促销',
    },
    promotionPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '促销价格',
    },
    promotionComm: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '促销提成',
    },
    imgSrcs: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '图片集',
    },
    isChanged: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '记录被改变',
    },
    updateBy: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '修改人',
    },
    createBy: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '新建人',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '备注',
    },
  }, {
    tableName: 'carwarehouse',
    paranoid: true,
    timestamps: true,
  });
};

/**
 * 车系、车型、颜色对应关系表
 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('CarRelation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      comment: '关系id',
    },
    officialGuidePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: '官方指导价',
    },
    callCarPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'call车价格（成本价）',
    },
    profit: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '预设利润 ',
    },
    defaultImgSrc: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '默认图片',
    },
    carSummary1: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '车辆描述1',
    },
    carSummary2: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '车辆描述2',
    },
    carSummary3: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '车辆描述3',
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
    tableName: 'carrelation',
    paranoid: true,
    timestamps: true,
  });
};

/**
 * 配件类型
 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Accessories', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      comment: '关系id',
    },
    fitCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '配件代码',
    },
    fitName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '配件名称',
    },
    costPrice: {
      type: DataTypes.FLOAT,
      comment: '含税成本价格',
    },
    profit: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '预设利润 ',
    },
    suitableForCar: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '适合车型',
    },
    isOfficial: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '是否官方配件',
    },
    closeStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      comment: '是否关闭',
    },
    defaultImgSrc: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '默认图片',
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
    tableName: 'accessories',
    paranoid: true,
    timestamps: true,
  });
};

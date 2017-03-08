/**
 * 保险
 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Insurance', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    insuranceCompany: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '保险公司',
    },
    insurancePrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '保险返利',
    },
    loanPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '贷款手续费',
    },
    description: {
      type: DataTypes.STRING,
      comment: '描述信息', // 如果中间需要前端插入内容则用 "|" 进行分割
    },
  }, {
    tableName: 'insurance',
    paranoid: true,
    timestamps: true,
  });
};

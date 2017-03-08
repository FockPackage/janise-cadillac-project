/* jshint indent: 2 */
/**
 * 公司管理
 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('AdCompany', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    parentId: {
      type: DataTypes.CHAR(38),
      allowNull: true,
    },
    companyCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isShow: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    sortNo: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
  }, {
    tableName: 'adcompany',
    paranoid: true,
    timestamps: true,
  });
};

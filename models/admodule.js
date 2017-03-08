/* jshint indent: 2 */

/**
 * 模块管理
 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('AdModule', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    parentId: {
      type: DataTypes.CHAR(38),
      allowNull: true,
    },
    moduleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    moduleCode: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isShow: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isLeaf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sortNo: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      unique: true,
    },
  }, {
    tableName: 'admodule',
    paranoid: true,
    timestamps: true,
  });
};

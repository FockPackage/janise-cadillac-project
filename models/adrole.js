/* jshint indent: 2 */

/**
 * 角色管理
 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('AdRole', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '角色名称',
    },
    moduleButtons: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '角色按钮',
    },
    categories: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '分类',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '描述',
    },
    sort: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '排序',
    },
    moduleCodes: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '模块code数组',
    },
    roleType: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '角色类型',
    },
    defaultPage: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '角色默认页面',
    },
  }, {
    tableName: 'adrole',
    paranoid: true,
    timestamps: true,
  });
};

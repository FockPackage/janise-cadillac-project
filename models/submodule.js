/**
 * 子模块
 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('SubModule', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '子模块值',
    },
    meaning: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '描述',
    },
    isShow: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      comment: '是否显示',
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
  }, {
    tableName: 'submodule',
    paranoid: true,
    timestamps: true,
  });
};

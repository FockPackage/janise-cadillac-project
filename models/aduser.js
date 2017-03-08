/* jshint indent: 2 */

const utils = require('../utils');

/**
 * 用户表
 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('AdUser', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    userNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      set(val) {
        this.setDataValue('password', utils.gengratingCiphertext(val));
      },
    },
    userType: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.STRING,
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobileStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    enableFlag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createBy: {
      type: DataTypes.CHAR(38),
      allowNull: true,
    },
    updateBy: {
      type: DataTypes.CHAR(38),
      allowNull: true,
    },
    // roleId: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    portrait: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'aduser',
    paranoid: true,
    timestamps: true,
  });
};

/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('SysLog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    sysLogType: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    operateId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    operateUser: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    source: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    operator: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'syslog',
    paranoid: true,
    timestamps: true,
  });
};

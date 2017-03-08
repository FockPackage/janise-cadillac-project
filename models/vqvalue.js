/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('VqValue', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meaning: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    defaultImgSrc: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '默认图片路径',
    },
    enableFlag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    confirmedFlag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDateActive: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDateActive: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.CHAR(38),
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.CHAR(38),
      allowNull: true,
    },
  }, {
    tableName: 'vqvalue',
    paranoid: true,
    timestamps: true,
  });
};

/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('VqValueSet', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    valueSetName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    setDesc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    formatType: {
      type: DataTypes.STRING,
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
    code: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'vqvalueset',
    paranoid: true,
      // timestamps: true,
  });
};

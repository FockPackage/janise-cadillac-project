
/**
 * 工单信息表 （维修保养表）
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('SheetInfo', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      comment: '通知id',
    },
    sheetTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '通知标题',
    },
    sheetBody: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '通知内容',
    },
    sheetTo: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '通知接收人',
    },
    sheetDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '通知时间',
    },
    sheetStatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '通知状态',
    },
    isDelete: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '是否删除',
    },
    extfld1: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '预留字段1',
    },
    extfld2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '预留字段2',
    },
    extfld3: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '预留字段3',
    },
    extfld4: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '预留字段4',
    },
    extfld5: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '预留字段5',
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
    tableName: 'sheetinfo',
    paranoid: true,
    timestamps: true,
  });
};

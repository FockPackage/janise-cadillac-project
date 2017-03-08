
/**
 * 通知信息表
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('NotifyInfo', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      comment: '通知id',
    },
    notifyTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '通知标题',
    },
    notifyBody: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '通知内容',
    },
    notifyURL: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '通知URL',
    },
    notifyTo: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '通知接收人',
    },
    notifyDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '通知时间',
    },
    notifyType: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '通知方式(手机/微信/邮件)',
    },
    notifyFrom: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '通知发起人',
    },
    notifyStatus: {
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
    tableName: 'notifyinfo',
    paranoid: true,
    timestamps: true,
  });
};

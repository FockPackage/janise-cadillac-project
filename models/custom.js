
/**
 * 客户信息表
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Custom', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      comment: '客户id',
    },
    customName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      comment: '客户名称',
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '年龄',
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '性别',
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '地址',
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '公司',
    },
    IDNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '身份证',
    },
    postal: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '邮编',
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '生日',
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '手机',
    },
    weixin: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '微信',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '邮件',
    },
    isSendMail: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '是否需要发邮件',
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
    tableName: 'custom',
    paranoid: true,
    timestamps: true,
  });
};

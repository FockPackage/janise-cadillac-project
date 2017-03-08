
/**
 * 订单表
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      comment: '订单ID',
    },
    orderCode: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '订单编号',
    },
    carIndentify: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '车辆识别码',
    },
    carPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '整车价格',
    },
    fitPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '配件价格',
    },
    isBuyCar: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: '是否买车',
    },
    isBuyAccessory: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: '是否买配件',
    },
    isInsurance: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '是否需要保险',
    },
    insurancePrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '保险返利',
    },
    isLoanPrice: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '是否需要贷款',
    },
    loanPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '贷款手续费',
    },
    outStockFee: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '出库费',
    },
    profit: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '总利润',
    },
    commision1: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '总额提成',
    },
    commision2: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '利润提成',
    },
    commision3: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '其他提成',
    },
    commision4: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '总经理提成',
    },
    commision5: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '预留提成1',
    },
    deposit: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '订金',
    },
    dePostitDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '订金日期',
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '全款时间',
    },
    deliveryCarDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '交车时间',
    },
    orderStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '订单/合同状态', // [订单 0| 订单取消 1| 合同 2| 已付订金 3| 已付全款4 |合同完成 5| 合同取消 6]
    },
    isReadOfSale: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      comment: '销售是否已读', // 每次订单/合同状态变化的时候修改次项为未读状态(false)
    },
    printDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '合同打印时间',
    },
    printer: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '合同打印人',
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
    tableName: 'order',
    paranoid: true,
    timestamps: true,
  });
};

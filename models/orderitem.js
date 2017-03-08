
/**
 * 订单明细表 （出库表）
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('OrderItem', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      comment: '订单明细id',
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '订单明细名称',
    },
    itemMean: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '订单描述',
    },
    itemType: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '订单明细类型',
    },
    itemNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '明细数量',
    },
    salePrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '实际销售价格',
    },
    profit: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '利润',
    },
    batchNo: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '批次编号',
    },
    itemStatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '明细状态',
    },
    printDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '打印出门单时间',
    },
    printer: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '出门单打印人',
    },
    isExcess: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '是否超卖(修改itemcode)',
    },
    // fitWarehouseId: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: 'FitWarehouse',
    //     key: 'id',
    //   },
    // },
    // carWarehouseId: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: 'CarWarehouse',
    //     key: 'id',
    //   },
    // },
    // accessoriesId: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: 'Accessories',
    //     key: 'id',
    //   },
    // },
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
    tableName: 'orderitem',
    paranoid: true,
    timestamps: true,
  });
};

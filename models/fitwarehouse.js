/**
 * 配件入库 (配件仓库)
 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('FitWarehouse', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      comment: '配件ID',
    },
    // fitCode: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   comment: '配件代码',
    // },
    // fitName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   comment: '配件名称',
    // },
    batchNo: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '批次号',
    },
    batchName: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '批次名称',
    },
    fitNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '入库数量',
    },
    stockCode: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '库位编码',
    },
    stockNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '库存数量',
    },
    salePrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: '销售预计价格',
    },
    closeStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      comment: '是否关闭',
    },
    marketability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '是否可销售',
    },
    imgSrcs: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '图片集',
    },
    isChanged: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '记录被改变',
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
    tableName: 'fitwarehouse',
    paranoid: true,
    timestamps: true,
  });
};

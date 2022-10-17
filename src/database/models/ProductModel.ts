import { DataTypes } from "sequelize";
import { db } from "../db";

export const ProductModel = db.define('product', {
    idProduct: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salePrice: { // preco de venda
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    maxDiscountPercentage: { // desconto percentual maximo na venda
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    minIntentory: { // quantidade minima para estoque
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dataTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    underscored: true
});

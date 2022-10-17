import {DataTypes} from "sequelize";
import {db} from "../db";
import { ProductModel } from "./ProductModel";

export const BuyModel = db.define('buy', {
    idBuy: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: { 
        type: DataTypes.DOUBLE,
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

ProductModel.hasMany(BuyModel, {
    constraints: true,
    foreignKey: 'idProduct',
    onDelete: 'CASCADE',
    hooks: true
});
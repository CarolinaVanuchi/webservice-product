import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MessagesUtils from "../utils/MessagesUtils";
import { ProductModel } from "../database/models/ProductModel";

class ProductController {
   
    async create(req: Request, res: Response) {

        try {
            const salePrice                 = req.body.salePrice;
            const maxDiscountPercentage     = req.body.maxDiscountPercentage;
            const minIntentory              = req.body.minIntentory;
            const quantity                  = req.body.quantity;
            const name                      = req.body.name;

            if(!salePrice)                  return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_PRICE);
            if(!maxDiscountPercentage)      return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_DISCOUNT);
            if(!minIntentory)               return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_QTD_INVENTORY);
            if(!quantity)                   return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_QTD_PRODUCT);
            if(!name)                       return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_NAME_PRODUCT);
            
            const product = await ProductModel.create({ 
                salePrice: salePrice,
                maxDiscountPercentage: maxDiscountPercentage,
                minIntentory: minIntentory,
                quantity: quantity,
                name: name
            });

            return res.status(StatusCodes.CREATED).json(product);

        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    async findAll(req: Request, res: Response) {
        const idProduct = req.params.idProduct;
        const product = await ProductModel.findAll();
        return product.length > 0? res.status(StatusCodes.OK).json(product) : res.status(StatusCodes.NO_CONTENT).send();
    }
    
    async findOne(req: Request, res: Response) {
        const idProduct = req.params.id;
        const product = await ProductModel.findOne( { where: {idProduct: idProduct}});
        return res.status(StatusCodes.OK).json(product);
    }

    async update(req: Request, res: Response) {

        try {

            const idProduct                 = req.params.id;
            const salePrice                 = req.body.salePrice;
            const maxDiscountPercentage     = req.body.maxDiscountPercentage;
            const minIntentory              = req.body.minIntentory;
            const quantity                  = req.body.quantity;
            const name                      = req.body.name;

            if(!salePrice)                  return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_PRICE);
            if(!maxDiscountPercentage)      return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_DISCOUNT);
            if(!minIntentory)               return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_QTD_INVENTORY);
            if(!quantity)                   return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_QTD_PRODUCT);
            if(!name)                       return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_NAME_PRODUCT);
            
            const product = await ProductModel.update({ 
                name: name,
                salePrice: salePrice,
                maxDiscountPercentage: maxDiscountPercentage,
                minIntentory: minIntentory,
                quantity: quantity
             }, { where: { idProduct: idProduct } });

            return res.status(StatusCodes.OK).json(product);

        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        const idProduct = req.params.id;
        await ProductModel.destroy( { where: {idProduct: idProduct}});
        try {
            res.status(StatusCodes.OK).send();
        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    async addQtProduct(idProduct, quantity) {
        let productRet = await (await ProductModel.findOne( { where: {idProduct: idProduct}} )).toJSON();
            await ProductModel.update({  quantity: productRet.quantity + quantity
            }, { where: { idProduct: idProduct } });
    }

    async removeQtProduct(idProduct, quantity) {
        let productRet = await (await ProductModel.findOne( { where: {idProduct: idProduct}} )).toJSON();
            await ProductModel.update({  quantity: productRet.quantity - quantity
            }, { where: { idProduct: idProduct } });
    }
}



export default new ProductController();
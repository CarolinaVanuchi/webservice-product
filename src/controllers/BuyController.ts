import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MessagesUtils from "../utils/MessagesUtils";
import { BuyModel } from "../database/models/BuyModel";
import ProductController from "../controllers/ProductController";

class BuyController {
   
    async create(req: Request, res: Response) {

        try {
            const quantity   = req.body.quantity;
            const price      = req.body.price;
            const product    = req.body.product;

            if(!quantity)          return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_QTD_PRODUCT);
            if(!price)             return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_PRICE);
            
            const buy = await BuyModel.create({ quantity, price, idProduct: product});

            let pc = ProductController;
            pc.addQtProduct(product, quantity);
            return res.status(StatusCodes.CREATED).json(buy);

        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }


    async findAll(req: Request, res: Response) {
        const product = await BuyModel.findAll();
        return product.length > 0? res.status(StatusCodes.OK).json(product) : res.status(StatusCodes.NO_CONTENT).send();
    }

    async findAllProduct(req: Request, res: Response) {
        const idProduct = req.params.idProduct;
        const product = await BuyModel.findAll({ where: {idProduct: idProduct}});
        return product.length > 0? res.status(StatusCodes.OK).json(product) : res.status(StatusCodes.NO_CONTENT).send();
    }

}

export default new BuyController();
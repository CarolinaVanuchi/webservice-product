import express from "express";
import UserController from "../controllers/UserController";
import LoginController from "../controllers/LoginController";
import ProductController from "../controllers/ProductController";
import BuyController from "../controllers/BuyController";
import SaleController from "../controllers/SaleController";
const router = express.Router();

router.post("/auth/login", LoginController.login);
router.get("/auth/login/:id", LoginController.authMiddleware, LoginController.returnInfoUser);

router.post("/create", UserController.create);
router.post("/users", LoginController.authMiddleware, UserController.create);
router.get("/users", LoginController.authMiddleware, UserController.findAll);
router.put("/users/:id", LoginController.authMiddleware, UserController.update);
router.delete("/users/:id", LoginController.authMiddleware, UserController.delete);

router.post("/product", LoginController.authMiddleware, ProductController.create);
router.put("/product/:id", LoginController.authMiddleware, ProductController.update);
router.get("/product/", LoginController.authMiddleware, ProductController.findAll);
router.get("/product/:id", LoginController.authMiddleware, ProductController.findOne);
router.delete("/product/:id", LoginController.authMiddleware, ProductController.delete);

router.post("/buy", LoginController.authMiddleware, BuyController.create);
router.get("/buy/", LoginController.authMiddleware, BuyController.findAll);
router.get("/buy/:idProduct", LoginController.authMiddleware, BuyController.findAllProduct);

router.post("/sale", LoginController.authMiddleware, SaleController.create);
router.get("/sale/", LoginController.authMiddleware, SaleController.findAll);
router.get("/sale/:idProduct", LoginController.authMiddleware, SaleController.findAllProduct);

export { router };
import { Router } from "express";
import multer from 'multer'

import { CreateUserController } from "./controllers/User/CreateUserController";
import { AuthUserController } from "./controllers/User/AuthUserController";
import { DetailUserController } from "./controllers/User/DetailUserController";
import { CreateCategoryController } from "./controllers/Category/CreateCategoryController";
import { ListCategoryController } from "./controllers/Category/ListCategoryController";
import { CreateProductController } from "./controllers/Product/CreateProductController";
import { ListByCategoryController } from "./controllers/Product/ListByCategoryController";
import { CreateOrderController } from "./controllers/Order/CreateOrderController";
import { RemoveOrderController } from "./controllers/Order/RemoveOrderController";
import { AddItemController } from "./controllers/Order/AddItemController";
import { RemoveItemController } from "./controllers/Order/RemoveItemController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

// -- ROTAS USER --
router.post("/users", new CreateUserController().handle)

router.post("/session", new AuthUserController().handle)

router.get("/me", isAuthenticated, new DetailUserController().handle)


// -- ROTAS CATEGORY --
router.post("/category", isAuthenticated, new CreateCategoryController().handle)

router.get("/category", isAuthenticated, new ListCategoryController().handle)


// -- ROTAS PRODUCT --
router.post("/product", isAuthenticated, upload.single('file'), new CreateProductController().handle)

router.get("/category/product", isAuthenticated, new ListByCategoryController().handle)


// -- ROTAS ORDER --
router.post("/order", isAuthenticated, new CreateOrderController().handle)

router.delete("/order", isAuthenticated, new RemoveOrderController().handle)

router.post("/order/add", isAuthenticated, new AddItemController().handle)

router.delete("/order/remove", isAuthenticated, new RemoveItemController().handle)


export {router};


"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("./controllers/User/CreateUserController");
const AuthUserController_1 = require("./controllers/User/AuthUserController");
const DetailUserController_1 = require("./controllers/User/DetailUserController");
const CreateCategoryController_1 = require("./controllers/Category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/Category/ListCategoryController");
const CreateProductController_1 = require("./controllers/Product/CreateProductController");
const ListByCategoryController_1 = require("./controllers/Product/ListByCategoryController");
const CreateOrderController_1 = require("./controllers/Order/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/Order/RemoveOrderController");
const AddItemController_1 = require("./controllers/Order/AddItemController");
const RemoveItemController_1 = require("./controllers/Order/RemoveItemController");
const SendOrderController_1 = require("./controllers/Order/SendOrderController");
const ListOrdersController_1 = require("./controllers/Order/ListOrdersController");
const DetailOrderController_1 = require("./controllers/Order/DetailOrderController");
const FinishOrderController_1 = require("./controllers/Order/FinishOrderController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const multer_2 = __importDefault(require("./config/multer"));
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
// -- ROTAS USER --
router.post("/users", new CreateUserController_1.CreateUserController().handle);
router.post("/session", new AuthUserController_1.AuthUserController().handle);
router.get("/me", isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
// -- ROTAS CATEGORY --
router.post("/category", isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
router.get("/category", isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
// -- ROTAS PRODUCT --
router.post("/product", isAuthenticated_1.isAuthenticated, upload.single('file'), new CreateProductController_1.CreateProductController().handle);
router.get("/category/product", isAuthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle);
// -- ROTAS ORDER --
router.post("/order", isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
router.delete("/order", isAuthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle);
router.post("/order/add", isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle);
router.delete("/order/remove", isAuthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle);
router.put("/order/send", isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
router.get("/orders", isAuthenticated_1.isAuthenticated, new ListOrdersController_1.ListOrdersController().handle);
router.get("/order/detail", isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle);
router.put("/order/finish", isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle);

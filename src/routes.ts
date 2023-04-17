import { Router } from "express";

import { CreateUserController } from "./controllers/User/CreateUserController";
import { AuthUserController } from "./controllers/User/AuthUserController";
import { DetailUserController } from "./controllers/User/DetailUserController";
import { CreateCategoryController } from "./controllers/Category/CreateCategoryController";
import { ListCategoryController } from "./controllers/Category/ListCategoryController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// -- ROTAS USER --
router.post("/users", new CreateUserController().handle)

router.post("/session", new AuthUserController().handle)

router.get("/me", isAuthenticated, new DetailUserController().handle)


// -- ROTAS CATEGORY --
router.post("/category", isAuthenticated, new CreateCategoryController().handle)

router.get("/category", isAuthenticated, new ListCategoryController().handle)


// -- ROTAS PRODUCT --



export {router};


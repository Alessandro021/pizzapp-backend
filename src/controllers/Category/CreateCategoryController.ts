import { Request, Response, response } from "express";
import { CreateCategoryService } from "../../services/Category/CreateCategoryService";


class CreateCategoryController{
    async handle(req: Request, res: Response){
        const {name} = req.body;

        const createCategoryService = new CreateCategoryService();

        const category = await createCategoryService.execute({
            name
        });

        return res.json(category);

    }
}

export { CreateCategoryController };
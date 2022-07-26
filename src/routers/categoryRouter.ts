import { Router } from "express";

import { getCategories } from "../controllers/categoryController.js";
import validationToken from "../middlewares/authMiddleware.js";

const categoryRouter = Router();

categoryRouter.get('/categories', validationToken, getCategories);

export default categoryRouter;

import { Router } from "express";
import  authRouter  from "./auth.routes.js";
import productsRouter from "./products.routes.js";

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/products', productsRouter);

export default mainRouter;
import { Router } from "express";
import { SearchController } from "../controllers/SearchController";

export const searchRouter = Router();

searchRouter.get("/", SearchController.get);



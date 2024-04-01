import { Router } from "express";
import { getSearchQuery } from "./search.controller.js";

const searchRouter = Router();

searchRouter.get("/", getSearchQuery);

export default searchRouter;

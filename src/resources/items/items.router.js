import { Router } from "express";
import { getItemDetails } from "./items.controller";

const itemsRouter = Router();

itemsRouter.get("/:id", getItemDetails);

export default itemsRouter;

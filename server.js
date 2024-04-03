import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import morgan from "morgan";

import searchRouter from "./src/resources/search/search.router";
import itemsRouter from "./src/resources/items/items.router";
import authRouter from "./src/resources/auth/auth.router";

const PORT = process.env.PORT || 3000;

const app = express();

/* Middlewares */
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", authRouter);
app.use("/api/items", searchRouter);
app.use("/api/items", itemsRouter);

export const start = () => {
  app.listen(PORT, () => console.log(`App listenin on PORT: ${PORT}`));
};

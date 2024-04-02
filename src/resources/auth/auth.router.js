import { Router } from "express";
import { initiateOauthFlow, authorizationResponse } from "./auth.controller";

const authRouter = Router();

authRouter.get("/auth/mercadolibre", initiateOauthFlow);

authRouter.get("/auth/mercadolibre/callback", authorizationResponse);

export default authRouter;

import { Router } from "express";
import { roomController } from "../controllers/room.controller";

const roomRouter: Router = Router();

roomRouter.post('/',roomController)

export default roomRouter;

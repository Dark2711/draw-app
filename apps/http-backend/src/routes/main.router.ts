import {Router} from 'express'
import authRouter from './auth.routes';
import roomRouter from './room.routes';
import { authMiddleware } from '../middlewares/auth.middleware';

const mainRouter: Router = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/room',authMiddleware, roomRouter)

export default mainRouter;
import {Router} from 'express'
import { ShowController } from '../controller/ShowController';

export const showRouter = Router();

const showController = new ShowController();

showRouter.post("/create", showController.createShow)
showRouter.get("/", showController.getShowsByDay)
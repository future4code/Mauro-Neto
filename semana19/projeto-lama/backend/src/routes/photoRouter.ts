import {Router} from 'express'
import {PhotoController} from '../controller/PhotoController';

export const photoRouter = Router();

const photoController = new PhotoController();

photoRouter.post("/add", photoController.addPhoto)
photoRouter.get("/:show_id", photoController.getPhotosFromShow)
import {Router} from 'express'
import { BandController } from '../controller/BandController';

export const bandRouter = Router();

const bandController = new BandController;

bandRouter.post("/register", bandController.registerBand)
bandRouter.get("/", bandController.viewBandDetails)
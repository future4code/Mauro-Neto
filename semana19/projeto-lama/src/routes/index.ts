import {Router} from 'express'
import { userRouter } from './userRouter'
import {bandRouter} from './bandRouter'

export const routes = Router()

routes.use("/user", userRouter)
routes.use("/band", bandRouter)
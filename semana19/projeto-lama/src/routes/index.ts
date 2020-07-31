import {Router} from 'express'
import {userRouter} from './userRouter'
import {bandRouter} from './bandRouter'
import {showRouter} from './showRouter'

export const routes = Router()

routes.use("/user", userRouter)
routes.use("/band", bandRouter)
routes.use("/show", showRouter)
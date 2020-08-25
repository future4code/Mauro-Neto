import {Router} from 'express'
import {userRouter} from './userRouter'
import {bandRouter} from './bandRouter'
import {showRouter} from './showRouter'
import {ticketRouter} from './ticketRouter'
import {photoRouter} from './photoRouter'

export const routes = Router()

routes.use("/user", userRouter)
routes.use("/band", bandRouter)
routes.use("/show", showRouter)
routes.use("/ticket", ticketRouter)
routes.use("/photo", photoRouter)
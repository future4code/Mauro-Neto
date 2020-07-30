import {UserSignupDTO, UserLoginDTO} from '../model/User'
import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { BaseDatabase } from '../data/BaseDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { IdGenerator } from '../service/IdGenerator';
import { HashManager } from '../service/HashManager';
import { Authenticator } from '../service/Authenticator';

export class UserController{
    private static UserBusiness = new UserBusiness(new UserDatabase, new IdGenerator, new HashManager, new Authenticator)

    public async signup(req: Request, res: Response){
        try {
            const input: UserSignupDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role || "NORMAL"
            }

            const token = await UserController.UserBusiness.signup(input)

            res.status(200).send({token})

        } catch (error) {
            res.status(error.code || 400).send({error: error.message})
        }

        await BaseDatabase.destroyConnnection();
    }

    public async login(req: Request, res: Response){
        try {
            const input: UserLoginDTO = {
                email: req.body.email,
                password: req.body.password
            }
            
            const token = await UserController.UserBusiness.login(input)

            res.status(200).send({token})

        } catch (error) {
            res.status(error.code || 400).send({error: error.message})
        }

        await BaseDatabase.destroyConnnection();
    }
}
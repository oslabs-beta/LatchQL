import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

dotenv.config();
let key: string;
//read secret KEY from .env file -- if not set-up, default to a generic key
if(process.env.SECRET_KEY)  key = process.env.SECRET_KEY;
else key = "GENERICKEY";

type locals = {
    authLevel?: string,
    userName?: string
}

interface authRes extends Response {
    locals : locals,
}

type jwtController = {
    setJwt: (req: Request, res: authRes, next: NextFunction) => any,
}

//middleware to be setup in dev user's authentication process:
    /*
        dev user will pass in the user's auth level and username to the jwt contorller through 
        the res.locals element so that an authenticating jwt can be set on the user
    */
export const jwtController: jwtController = {
    setJwt : (req: Request, res: authRes, next: NextFunction) => {
        if(!res.locals.authLevel || !res.locals.userName){
            return next();
        }
        let authLevel: string = res.locals.authLevel;
        let userName: string = res.locals.userName;
        const payload = {userName: userName, authLevel: authLevel};
        const token: string= jwt.sign(payload, key, {expiresIn: "5d"});
        return res.json({token});
    }
};

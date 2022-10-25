import cors from "cors";
import express, { NextFunction } from "express";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import { updateShorthandPropertyAssignment } from "typescript";
import * as dotenv from 'dotenv';

dotenv.config();
let key: string;
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



export const jwtController: jwtController = {
    setJwt : (req, res, next) => {
        if(!res.locals.authLevel || !res.locals.userName){
            return next();
        }
        let authLevel: string = res.locals.authLevel;
        let userName: string = res.locals.userName;
        
        const payload = {userName: userName, authLevel: authLevel};
        const token: string = jwt.sign(payload, key, {expiresIn: "5d"});
        return res.json({token});
    }
};

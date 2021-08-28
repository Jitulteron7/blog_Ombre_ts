import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import {UserModel } from '../models';
import AuthService from '../services/auth.services';
import MailService from '../services/externalService/email.service';

declare global {
    namespace Express {
        interface Request {
            token: string;
            user: any | null;
        }
    }
}

const authService = new AuthService({ UserModel, MailService: new MailService() });

const multipleRouteAuth = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            req.token = <string>req.headers['auth'];
            req.user = await authService.checkAuthToken(req.token);
            
            if (req.user == null) {
                const error: any = new Error('Unauthorized user');
                error.StatusCode = 401;
                error.name = 'Unauthorized user';
                throw error;
            } else {
                        next();                
            }
            
        } catch (error:any) {
            console.log(error, 'error from middleware');
            throw new Error(error);
        }
    });
};

export default multipleRouteAuth;

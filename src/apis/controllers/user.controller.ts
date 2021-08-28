import { NextFunction, Request, Response,Express } from 'express';
import asyncHandler from 'express-async-handler';
import { UserModel, } from '../models';
import AuthService from '../services/auth.services';
// import UserService from '../services/user.service';
import MailService from '../services/externalService/email.service';

const authService = new AuthService({
    UserModel,
    MailService: new MailService(),
});


declare global {
    namespace Express{
        interface Request {
            file? : any,
            files? : any,
        }
    }

}

export   const userController = {

    //post
    create: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {        
        const { author,email,password} = req.body;        
        const { user, token } = await authService.signUp(author,email,password,req.file.filename);
        res.status(200).json({ user, token });
    }),
    logout: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {         
 
        await authService.logoutAll(req.user)
        res.status(200).json({ message:"logout"});
    }),
    login: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {         
        const {email,password}=req.body
        const {user,token}=await authService.login(email,password)
        res.status(200).json({ user,token});
    }),
    //get
    getAllAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // const data = await adminService.getAllAdmin();
        // res.status(200).json({
        //     data
        // });
    }),

   
    //delete
    deleteAllAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // const data = await adminService.deleteAllAdmin(req.body.deleteAdmins);
        // res.status(200).json({
        //     data
        // });
    }),

   
    //patch
    updateOneAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // const data = await adminService.updateOneAdmin(req.params.id, req.body.data);
        // res.status(200).json({
        //     data
        // });
    }),

   
};



import express, { Request, Response, NextFunction, Router } from 'express';
import { userController } from '../controllers';
import Auth from '../middleware';
import {upload} from '../middleware/upload';

const router = express.Router();

//post
router.post('/create',upload.single("myPic"),userController.create);
router.post('/logout',Auth(),userController.logout);
router.post('/login',userController.login);
//get

//delete


//patch




export const UserRoutes: Router = router;

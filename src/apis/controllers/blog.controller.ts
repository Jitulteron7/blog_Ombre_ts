import { NextFunction, Request, Response,Express } from 'express';
import asyncHandler from 'express-async-handler';
import { UserModel,BlogModel } from '../models';
import BlogService from '../services/blog.services';

const blogService = new BlogService({
    UserModel,
    BlogModel,
});


declare global {
    namespace Express{
        interface Request {
            file? : any,
            files? : any,
        }
    }

}

export   const blogController = {

    //post
    create: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {        
        const {title,body,description,dateCreated} = req.body;        
        const data = await blogService.create(req.user._id,title,body,description,dateCreated,req.file.filename);
        res.status(200).json({ data});
    }),
    
    //get
    getAllBlogs: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await blogService.getAllBlogs();
        res.status(200).json({
            data
        });
    }),
    getOneBlog: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await blogService.getOneBlog(req.params.id);
        res.status(200).json({
            data
        });
    }),
    myBlogs: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
   
        const data = await blogService.myBlogs(req.user._id);
        res.status(200).json({
            data
        });
    }),

    //delete
    deleteOne: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
        const data = await blogService.deleteOne(req.params.id);
        res.status(200).json({
            data,
            message:"deleted successfully"
        });
    }),

    //patch
    comment: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {        
        const { idComment,text} = req.body;        
        const data = await blogService.comment( idComment,text,req.user._id);
        res.status(200).json({ data });
    }),

    editOneBlog: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        
        const data = await blogService.editOneBlog(req.params.id, req.body, req.file.filename);
        res.status(200).json({
            data
        });
    }),

   
};



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
        // const data = await adminService.getAllAdmin();
        // res.status(200).json({
        //     data
        // });
    }),
    getOneBlog: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // const data = await adminService.deleteAllAdmin(req.body.deleteAdmins);
        // res.status(200).json({
        //     data
        // });
    }),
    myBlogs: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // const data = await adminService.updateOneAdmin(req.params.id, req.body.data);
        // res.status(200).json({
        //     data
        // });
    }),
    //delete
    deleteAllBlog: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // const data = await adminService.deleteAllAdmin(req.body.deleteAdmins);
        // res.status(200).json({
        //     data
        // });
    }),

    deleteOne: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        let isPresent = await BlogModel.findById(req.body.id)
        if(isPresent?.author!==req.user._id){
            res.status(401).json({
                message:"you cannot delete others blog"
            })
        }
        const data = await blogService.deleteOne(req.body.id);
        res.status(200).json({
            data
        });
    }),

    //patch
    comment: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {        
        const { idComment,text,by} = req.body;        
        const data = await blogService.comment( idComment,text,by);
        res.status(200).json({ data });
    }),
    editOneBlog: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // const data = await adminService.updateOneAdmin(req.params.id, req.body.data);
        // res.status(200).json({
        //     data
        // });
    }),

   
};



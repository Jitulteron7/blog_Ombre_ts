import express, {Router } from 'express';
import { blogController } from '../controllers';
import Auth from '../middleware';
import {upload} from '../middleware/upload';

const router = express.Router();

//post
router.post('/create',upload.single("myPic"),Auth(),blogController.create);

//get
router.get('/getAllBlogs', Auth(), blogController.getAllBlogs);
router.get('/getOneBlog/:id', Auth(), blogController.getOneBlog);
router.get('/myBlogs', Auth(), blogController.myBlogs);

//delete
router.delete('/deleteOne/:id', Auth(), blogController.deleteOne);

//patch
router.patch('/comment',Auth(),blogController.comment);
router.patch('/editOneBlog/:id',upload.single("myPic"),Auth(),blogController.editOneBlog);




export const BlogRoutes: Router = router;

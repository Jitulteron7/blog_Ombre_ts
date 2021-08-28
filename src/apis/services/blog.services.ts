import { UserDocument,BlogDocument } from '../models';
import { Model } from 'mongoose';

/**
 *  @Authservice by Jitul Teron
 */

class BlogService {
    private UserModel;
    private _BlogModel;

    constructor({ UserModel, BlogModel }: { UserModel: Model<UserDocument>; BlogModel: Model<BlogDocument> }) {
        this.UserModel = UserModel;
        this._BlogModel = BlogModel;
    }

    
    async create(author: string, title: string, body: string,description:string,dateCreated:string,image:string) {
        
       let data = await this._BlogModel.create({
            author,
            title,
            body,
            description,
            shareLink:"link",
            dateCreated,
            image
        })
       return data
    }

    async comment(idComment:string,text:string,by:string) {
        try {
            let comment={
                    text:text,
                    by:by
            }
          let data = await this._BlogModel.findByIdAndUpdate(idComment,{
                $push:{comments:comment}
            },{
                new:true
            }).populate("comments.by","author _id")
            .populate("author","author _id")
            .exec()
            return data
        } catch (error:any) {
            throw new Error(error);
        }
    }

    async getAllBlogs() {
        let data =await this._BlogModel.find({})
        .populate("comments.by","author _id")
        .populate("author","author _id")
        .exec()
        
        return data
    }

    async getOneBlog(id:string) {
        let data =await this._BlogModel.findById(id)
        .populate("comments.by","author _id")
        .populate("author","author _id")
        .exec()

        return data
    }

    async myBlogs(id: string) {
        
        try {
            const data = await this._BlogModel.find({ author:id })
            .populate("comments.by","author _id")
            .populate("author","author _id")
            .exec()  

            return data
        } catch (error:any) {
            console.log(error.message);
            if (error.name === 'NoEmail') {
                const error: any = new Error('Enter the email once again');
                error.statusCode = 404;
                error.name = 'NoEmail';
                throw error;
            }
            throw new Error('Service couldnot be completed');
        }
    }

 

    async deleteOne(id: string) {
        
        const data = await this._BlogModel.findByIdAndDelete(id);
        return data
    }

    async  editOneBlog(id: string,blog:any, image:string) {
    
        const {description,dateCreated,body,author,title} =blog

        const data = await this._BlogModel.findByIdAndUpdate(id,{
            description,
            dateCreated,
            body,
            title,
            image
        });
        
        return data
    }

}

export default BlogService;

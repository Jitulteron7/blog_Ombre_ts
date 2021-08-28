import mongoose, { Mongoose } from 'mongoose'
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces';

/**
 * Define interface for Admin Model
 *
 * @author Jitul Teron
 */

export interface BlogDocument extends  mongoose.Document {
    author:string;
    title:string;
    body:string;
    dateCreated:string;
    shareLink:string;
    description:string;
    image:string;
    comments:Array<string>;
}

const blogSchema = new mongoose.Schema(
    {   
        author:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
        },
        title:String,       
        body: String,
        description:String,
        shareLink:String,
        dateCreated:String,     
        comments:[{
            text:String,
            by:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            }
        }],
        image:String,
    },
    { timestamps: true }
);


export const BlogModel = mongoose.model<BlogDocument>('blog', blogSchema);

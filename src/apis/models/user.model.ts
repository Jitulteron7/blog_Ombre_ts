import mongoose from 'mongoose'
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces';

/**
 * Define interface for Admin Model
 *
 * @author Jitul Teron
 */

export interface UserDocument extends mongoose.Document {
    author: string;
    email:string;
    password?:string;
    image:string
    tokens?:Array<string>
}

const userSchema = new mongoose.Schema(
    {   
        author: String,
        email:String,
        password:String,
        image:String,
        tokens:Array
    },
    { timestamps: true }
);


 userSchema.pre('save', async function (next) {
    let user = this as UserDocument;

    if (!user.isModified('password')) return next();

    const hash = await bcrypt.hashSync(user?.password!, 8);

    user.password = hash;
    return next();
});



export const UserModel = mongoose.model<UserDocument>('user', userSchema);

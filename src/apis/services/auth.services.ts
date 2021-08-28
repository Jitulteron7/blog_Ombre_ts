import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { isValid } from '../utils/isValid';
import { UserDocument } from '../models';
import { Model } from 'mongoose';
import MailService from './externalService/email.service';
/**
 *  @Authservice by Jitul Teron
 */

class AuthService {
    private UserModel;
    private _MailService;

    constructor({ UserModel, MailService }: { UserModel: Model<UserDocument>; MailService: MailService }) {
        this.UserModel = UserModel;
        this._MailService = MailService;
    }

    async generateAuthToken(user: UserDocument) {
        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRECT as string);
        user.tokens?.push(token);
        await user.save();
        return token;
    }

    toJson(user: UserDocument) {
        let userObj = user.toObject();
        delete userObj.password;
        delete userObj.tokens;
        return userObj;
    }
    generateForgotPasswordToken(user: any) {
        const payload = {
            email: user.email,
            _id: user._id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRECT as string);
        return token;
    }

    checkResetToken(token: string) {
        jwt.verify(token, process.env.JWT_SECRECT as string, function (err: any, decoded) {
            if (err.name === 'TokenExpiredError') {
                const error: any = new Error('Token Expired');
                error.StatusCode = 401;
                error.name = 'Unauthorized';
                throw error;
            }
        });
    }

    async checkAuthToken(token: string) {
        const decode: any = jwt.verify(token, process.env.JWT_SECRECT as string);
        
        const user: any = await this.UserModel.findById(decode.id);
        
        if (!isValid(user) || !user.tokens.includes(token)) {
            const error: any = new Error('Unauthorized Admin');
            error.StatusCode = 401;
            error.name = 'Unauthorized Admin';
            throw error;
        }

        return user;
    }
    async login(email: string, password: string) {
        console.log(email)
        const user = await this.UserModel.findOne({email});
        
        if (!user) {
            const error: any = new Error('Account not found !');
            error.statusCode = 401;
            error.name = 'Unauthorized';
            throw error;
        }

        const isMatched = await bcrypt.compare(password, user?.password!);

        if (!isMatched) {
            const error: any = new Error('Password is invalid');
            error.statusCode = 401;
            error.name = 'Unauthorized';
            throw error;
        }
        const token = <string>await this.generateAuthToken(user);
        return { user: this.toJson(user), token };
    }

    async signUp(author:string,email:string,password:string,image:string) {
        try {
            let check=await this.UserModel.findOne({email})
            if(check){
                const error:any=new Error(`User already exists`);
                error.statusCode=400;
                throw error;
            }
            const user = await this.UserModel.create({
                author,
                email,
                password,
                image
            });

            const token = await this.generateAuthToken(user);
            return { user: this.toJson(user), token };
        } catch (error:any) {
            throw new Error(error);
        }
    }

    async logout(user: any, token: string) {
        for (var i = 0; i < user.tokens.length; i++) {
            if (user.tokens[i] === token) user.tokens.splice(i, 1);
        }

        await user.save();
    }

    async logoutAll(user: any) {
        user.tokens = [];
        await user.save();
    }

    async forgotpassword(email: string) {
        const user = await this.UserModel.findOne({ email });
        try {
            if (!user) {
                const error = new Error();
                error.name = 'NoEmail';
                throw error;
            }
            const token = await this.generateAuthToken(user);
            await this._MailService.sendForgotPasswordMail(user, token);
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

    async resetpassword(id: string, token: string, password: string) {
        const user = await this.UserModel.findById(id);
        console.log(user);
        if (!user) {
            const error: any = new Error('No Such User');
            error.statusCode = 404;
            error.name = 'NotFound';
            throw error;
        }
        this.checkResetToken(token);
        user.password = password;
        await user.save();
        return this.toJson(user);
    }
}

export default AuthService;

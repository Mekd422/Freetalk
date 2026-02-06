import { postDoc } from "./post";
import { authenticationService } from "../../common";
import mongoose from "mongoose";

export interface userDoc extends mongoose.Document{
    email: string,
    password: string,
    posts?: Array<postDoc>
}

export interface CreateUserDto{
    email: string,
    password: string
}

export interface UserModel extends mongoose.Model<userDoc>{
    build(dto: CreateUserDto): userDoc
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

userSchema.pre("save", async function(done){
    if(this.isModified("password") || this.isNew){
        const hashedPwd = authenticationService.pwdToHash(this.get("password"));
        this.set("password", hashedPwd)
    }

    done()
})

userSchema.statics.build = ( createUserDto: CreateUserDto) => {
    return new User(createUserDto);
}

export const User = mongoose.model<userDoc, UserModel>('User', userSchema); 

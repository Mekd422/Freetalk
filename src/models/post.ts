import mongoose from "mongoose";
import { commentDoc } from "./comment";

export interface postDoc extends mongoose.Document{
    title: string,
    content: string,
    comments?: Array<commentDoc>
}

export interface CreatePostDto{
    title: string,
    content: string
}

export interface PostModel extends mongoose.Model<postDoc>{
    build(dto: CreatePostDto): postDoc
}

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

postSchema.statics.build = ( createPostDto: CreatePostDto) => {
    return new Post(createPostDto);
}

const Post = mongoose.model<postDoc, PostModel>("Post", postSchema);

export default Post;


import mongoose from "mongoose";

export interface commentDoc extends mongoose.Document{
    userName: string,
    content: string
}

export interface CreateCommentDto{
    userName: string,
    content: string
}

export interface CommentModel extends mongoose.Model<commentDoc>{
    build(dto: CreateCommentDto): commentDoc
}

const commentSchema = new mongoose.Schema({
    userName: { type: String },
    content: { type: String, required: true },
});

commentSchema.statics.build = ( createCommentDto: CreateCommentDto) => {
    return new Comment(createCommentDto);
}

const Comment = mongoose.model<commentDoc, CommentModel>("Comment", commentSchema);

export default Comment;

 
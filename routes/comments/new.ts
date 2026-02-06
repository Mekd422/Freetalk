import { Router, Request, Response, NextFunction } from "express";
import Post from "../../src/models/post";
import Comment from "../../src/models/comment";
import { BadRequestError } from "common";

const router = Router();

router.post('/api/comments/new/:postId', async (req: Request, res: Response, next: NextFunction) => {
	const {userName, content } = req.body;
	const { postId } = req.params;

	if(!content){
		return next(new BadRequestError('Content is required'));
		
	}

	const newComment = Comment.build({
		userName: userName ? userName : 'Anonymous',
		content
	})

	await newComment.save();

	const updatedPost = await Post.findOneAndUpdate(
		{_id: postId}, 
		{ $push: { comments: newComment } }, 
		{ new: true }
	)

	res.status(201).send(updatedPost);
});

export { router as newCommentRouter };


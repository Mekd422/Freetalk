import { Router, Request, Response, NextFunction } from "express";
import Post from "../../src/models/post";
import Comment from "../../src/models/comment";
import { BadRequestError } from "common";

const router = Router();

router.delete('/api/comments/:commentId/delete/:postId', async (req: Request, res: Response, next: NextFunction) => {
	const { postId, commentId } = req.params;

	if(!postId || !commentId){
		return next(new BadRequestError('postId and commentId must be provided'));
	}

	try {
		await Comment.findOneAndDelete({_id: commentId});
	} catch (error) {
		next(new Error('Error deleting comment'));
	}

	await Post.findOneAndUpdate({_id: postId}, { $pull: { comments: commentId } });

	res.status(200).json({success: true});
});

export { router as deleteCommentRouter };


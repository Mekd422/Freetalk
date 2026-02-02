import { Router, Request, Response, NextFunction } from "express";
import Post from "../../src/models/post";
import Comment from "../../src/models/comment";

const router = Router();

router.delete('/api/comments/:id', async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;

	try {
		const comment = await Comment.findById(id);
		if (!comment) return res.status(404).send({ error: 'Comment not found' });

		// remove reference from any post
		await Post.updateOne({ comments: id }, { $pull: { comments: id } });

		await comment.deleteOne();
		return res.status(204).send({});
	} catch (err) {
		return next(err);
	}
});

export { router as deleteCommentRouter };


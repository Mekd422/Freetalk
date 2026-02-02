import { Router, Request, Response, NextFunction } from "express";
import Post from "../../src/models/post";
import Comment from "../../src/models/comment";

const router = Router();

router.delete('/api/post/:id', async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;

	try {
		const post = await Post.findById(id);
		if (!post) return res.status(404).send({ error: 'Post not found' });

		// delete associated comments
		if (post.comments && post.comments.length > 0) {
			await Comment.deleteMany({ _id: { $in: post.comments } });
		}

		await post.deleteOne();
		return res.status(204).send({});
	} catch (err) {
		return next(err);
	}
});

export { router as deletePostRouter };


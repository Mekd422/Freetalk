import { Router, Request, Response, NextFunction } from "express";
import Post from "../../src/models/post";
import Comment from "../../src/models/comment";

const router = Router();

router.post('/api/comments/new', async (req: Request, res: Response, next: NextFunction) => {
	const { postId, userName, content } = req.body;

	if (!postId || !content) return res.status(400).send({ error: 'postId and content are required' });

	try {
		const post = await Post.findById(postId);
		if (!post) return res.status(404).send({ error: 'Post not found' });

		const comment = new Comment({ userName, content });
		await comment.save();

		post.comments.push(comment._id);
		await post.save();

		return res.status(201).send(comment);
	} catch (err) {
		return next(err);
	}
});

export { router as newCommentRouter };


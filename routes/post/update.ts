import { Router, Request, Response, NextFunction } from "express";
import Post from "../../src/models/post";

const router = Router();

router.put('/api/post/:id', async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const { title, content } = req.body;

	try {
		const post = await Post.findById(id);
		if (!post) return res.status(404).send({ error: 'Post not found' });

		if (title !== undefined) post.title = title;
		if (content !== undefined) post.content = content;

		await post.save();
		return res.status(200).send(post);
	} catch (err) {
		return next(err);
	}
});

export { router as updatePostRouter };


import { Router, Request, Response, NextFunction } from "express";
import Post from "../../src/models/post";

const router = Router();

router.get('/api/post/:id', async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;

	try {
		const post = await Post.findById(id).populate('comments');
		if (!post) {
			return res.status(404).send({ error: 'Post not found' });
		}
		return res.status(200).send(post);
	} catch (err) {
		return next(err);
	}
});

export { router as showPostRouter };


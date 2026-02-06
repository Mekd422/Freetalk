import { Router, Request, Response, NextFunction } from "express";
import Post from "../../src/models/post";
import { BadRequestError } from "../../common";

const router = Router();

router.delete('/api/post/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;

	if(!id){
		return next(new BadRequestError('Post ID is required'));
	}

	try {
		await Post.findByIdAndDelete(id);
	} catch (err) {
		return next(err);
	}

	res.status(200).json({ success: true });
});

export { router as deletePostRouter };


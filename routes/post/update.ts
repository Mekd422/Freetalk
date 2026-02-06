import { Router, Request, Response, NextFunction } from "express";
import Post from "../../src/models/post";
import { BadRequestError } from "../../common";

const router = Router();

router.post('/api/post/update/:id', async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const { title, content } = req.body;

	if(!id){
		return next(new BadRequestError('Post ID is required'));
	}

	let updatedPost;

	try {
		updatedPost = await Post.findByIdAndUpdate(
			id, 
			{ title, content }, 
			{ new: true }
		);
	} catch (error) {
		return next(new BadRequestError('Error updating post'));
	}

	res.status(200).send(updatedPost);
});

export { router as updatePostRouter };


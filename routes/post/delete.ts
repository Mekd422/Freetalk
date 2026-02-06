import { Router, Request, Response, NextFunction } from "express";
import Post from "../../src/models/post";
import { User, userDoc } from "../../src/models/user";
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

	const user = await User.findByIdAndUpdate({
		_id: req.currentUser!.userId
	}, {
		$pull: { posts: id }
	},
    { new: true}
);
	
	if(!user) return next(new Error())

	res.status(200).send(user);
});

export { router as deletePostRouter };


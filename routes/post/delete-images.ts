import { Router, Request, Response, NextFunction } from "express";
import Post from "../../src/models/post";


const router = Router();

router.post('/post/:id/delete/images', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const {imagesIds} = req.body;

    const post = await Post.findByIdAndUpdate(id, {
        $pull: { images: { _id: { $in: imagesIds } } }
    }, { new: true });

    res.status(200).send(post);

});

export { router as deleteImagesRouter };

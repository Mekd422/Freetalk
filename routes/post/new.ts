import { Router, Request, Response, NextFunction } from "express";
import Post from "../../src/models/post";

const router = Router();

router.post("/api/post/new", async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send({ error: 'Title and content are required' });
    }

    try {
        const post = new Post({ title, content });
        await post.save();
        return res.status(201).send(post);
    } catch (err) {
        return next(err);
    }
});

export { router as newPostRouter };
import { Router, Request, Response, NextFunction } from "express";
import Post from "../../src/models/post";
import { BadRequestError } from "../../common";

const router = Router();

router.post("/api/post/new", async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return next(new BadRequestError('Title and content are required'));
    }

    const newPost = new Post({
        title,
        content
    });

    await newPost.save();

    res.status(201).send(newPost);
});

export { router as newPostRouter };
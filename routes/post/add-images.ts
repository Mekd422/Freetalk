import { Router, Request, Response, NextFunction } from "express";
import Post from "../../src/models/post";
import {User} from "../../src/models/user";
import {BadRequestError, uploadImages} from "../../common";
import fs from 'fs';
import path from 'path';


const router = Router();

router.post('/post/:id/add/images',uploadImages, async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    if(!req.files) return next(new BadRequestError('At least one image is required'));

    let images: Array<Express.Multer.File>

    if(typeof req.files === "object"){
        images = Object.values(req.files)
    } else{
        images = req.files ? [...req.files] : [];
    }

    const imagesArray = images.map((file: Express.Multer.File) =>{
        let srcObj = {src: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`};
        fs.unlink(path.join(`uploads/` + file.filename), () => {})
        return srcObj;
    })

    const post = await Post.findByIdAndUpdate(id, {
        $push: { images: { $each: imagesArray } }
    }, { new: true });

    res.status(200).send(post);

    

});

export { router as addImagesRouter };



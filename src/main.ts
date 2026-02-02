import express from 'express';
import { json, urlencoded } from 'body-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { newPostRouter } from '../routes/post/new';
import { showPostRouter } from '../routes/post/show';
import { updatePostRouter } from '../routes/post/update';
import { deletePostRouter } from '../routes/post/delete';
import { newCommentRouter } from '../routes/comments/new';
import { deleteCommentRouter } from '../routes/comments/delete';


dotenv.config();



const app = express();
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))
app.set('trust proxy', true);
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: false,
}));


const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        throw new Error('Failed to connect to MongoDB');
    }

    // Register routes
    app.use(newPostRouter);
    app.use(showPostRouter);
    app.use(updatePostRouter);
    app.use(deletePostRouter);
    app.use(newCommentRouter);
    app.use(deleteCommentRouter);

    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
}

// Start the application
start();
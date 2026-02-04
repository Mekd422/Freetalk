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
import { signinRouter } from '../routes/auth/signin';
import { signoutRouter } from '../routes/auth/signout';
import { signupRouter } from '../routes/auth/signup';
import { currentUser, requireAuth } from '../common';


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

app.use(currentUser);

app.use(requireAuth,newPostRouter);
app.use(showPostRouter);
app.use(requireAuth,updatePostRouter);
app.use(requireAuth,deletePostRouter);

app.use(requireAuth,newCommentRouter);
app.use(requireAuth,deleteCommentRouter);

app.all('*', (req, res, next) => {
    const error = new Error("not found") as CustomError;
    error.status = 404;
    next(error);
});

declare global{
    interface CustomError extends Error{
        status?: number;
    }
}

app.use((err: CustomError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(err.status){
        return res.status(err.status).send({ message: err.message });
    }

    res.status(500).send({ message: 'Something went wrong' });
});

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        throw new Error('Failed to connect to MongoDB');
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
}

// Start the application
start();
import express from 'express';
import {json, urlencoded} from 'body-parser';

const app = express();

app.use(json());
app.use(urlencoded({extended: false}));

app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
})
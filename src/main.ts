import express from 'express';
import { json, urlencoded } from 'body-parser';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();



const app = express();
app.use(cors({
    origin: '*'
}))

app.use(urlencoded({ extended: true }));
app.use(json());

let pool;

const start = async () => {
    if (
        !process.env.MYSQL_HOST ||
        !process.env.MYSQL_USER ||
        !process.env.MYSQL_PASSWORD ||
        !process.env.MYSQL_DATABASE
    ) {
        throw new Error('MySQL environment variables must be defined in .env');
    }

    try {
        // Connect to MySQL
        pool = await mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            port: parseInt(process.env.MYSQL_PORT || "3306"),
            connectionLimit: 10
        });

        console.log("Connected to MySQL database successfully");

    } catch (error) {
        console.error(error);
        throw new Error('Failed to connect to MySQL');
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
}

// Start the application
start();
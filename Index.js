import express from 'express';
import cors from 'cors';
import BlogPostRoute from './routes/BlogPostRoute.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

export class Index {
    static app = express();
    static router = express.Router();

    static main() {
        dotenv.config();
        Index.setUpServer();
        Index.setUpDatabase();
    }

    static setUpServer() {
        Index.app.use(cors());
        Index.app.use(express.json());

        Index.app.use('/api/v1/blogPost', BlogPostRoute.configRoutes(Index.router));
        Index.app.use('*', (req, res) => {
            res.status(404).json({
                error: 'not found'
            });
        });
    }

    static async setUpDatabase() {

        const port = process.env.PORT || 8000;
        try {
            mongoose.connect("mongodb://127.0.0.1:27017/blog", { useNewUrlParser: true });

            Index.app.listen(port, () => {
                console.log(`server is running on port: ${port}`);
            });
        } catch (e) {
            console.error();
            process.exit(-1);
        }
    }
}

Index.main();

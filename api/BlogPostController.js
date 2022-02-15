import BlogPostDao from '../dao/BlogPostDao.js';

export default class BlogPostController {
    static async apiGetBlogPostById(req, res, next) { 
        try {
            const blogPostId = req.params.id;

            console.log(req.params);
            console.log(blogPostId);
            const blogPostResponse = await BlogPostDao.getBlogPostById(blogPostId);

            res.status(200).json(blogPostResponse);
        } catch (e) { 
            res.status(404).json({
                status: 'ID not found',
                message: e.message
            });
        }
    }

    static async apiGetBlogPost(req, res, next) {
        const blogPostsPerPage = req.query.blogPostPerPage ? parseInt(req.query.blogPostPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        const filters = {};
        if (req.query.title) {
            filters.title = req.query.title;
        }

        const {
            blogPostList,
            totalNumBlogPosts
        } = await BlogPostDao.getBlogPosts({
            filters,
            page,
            blogPostsPerPage
        });

        const response = {
            blogPosts: blogPostList,
            page,
            filters,
            entries_per_page: blogPostsPerPage,
            total_results: totalNumBlogPosts
        };

        res.json(response);
    }

    static async apiCreateBlogPost(req, res, next) {
        try {

            const blogPost = req.body;
            const date = new Date();

            const blogPostResponse = await BlogPostDao.addBlogPost(blogPost, date);

            res.status(201).json({
                status: 'success',
                blogPost: blogPostResponse
            });
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            });
        }
    }

    static async apiUpdateBlogPost(req, res, next) {
        try {

            const blogPostId = req.body._id;
            const blogPost = req.body;

            const date = new Date();
            const blogPostResponse = await BlogPostDao.updateBlogPost(blogPostId, blogPost, date);
            res.json({
                status: 'success',
                blogPost: blogPostResponse
            });
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            });
        }
    }

    static async apiDeleteBlogPost(req, res, next) {
        try {
            const blogPostId = req.body._id;

            await BlogPostDao.deleteBlogPost(blogPostId);

            res.json({
                status: 'success'
            })
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            });
        }
    }
}
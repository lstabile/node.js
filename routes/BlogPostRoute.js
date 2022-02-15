import BlogPostController from "../api/BlogPostController.js";

export default class BlogPostRoute {
    static configRoutes(router) {
        router
            .route('/')
            .get(BlogPostController.apiGetBlogPost)
            .post(BlogPostController.apiCreateBlogPost)
            .put(BlogPostController.apiUpdateBlogPost)
            .delete(BlogPostController.apiDeleteBlogPost);

        router
            .route('/:id')
            .get(BlogPostController.apiGetBlogPostById)

        return router;
    }
}

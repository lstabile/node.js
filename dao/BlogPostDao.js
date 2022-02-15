import BlogPost from '../model/BlogPost.js';

export default class BlogPostDao {

    static async getBlogPostById(blogPostId) { 
        const blogPostResponse = await BlogPost
            .findById(blogPostId);
        
        console.log(`Se obtuvo por ID el BlogPost: ${blogPostResponse}`);

        return blogPostResponse;
    }

    static async getBlogPosts({
        filters = null,
        page = 0,
        blogPostsPerPage = 20,
    } = {}) {

        let query = {};
        if (filters) {
            if ('title' in filters) {
                query = {
                    $text: {
                        $search: filters.title // Busca por palabra completa, no por substring
                    }
                };
            }
        }

        try {
            const blogPostList = await BlogPost
                .find(query)
                .limit(blogPostsPerPage)
                .skip(blogPostsPerPage * page);

            console.log(`El resultado de la consulta tiene: ${blogPostList.length} documentos`);

            if (blogPostList == null) {
                blogPostList = [];
            }

            const totalNumBlogPosts = await BlogPost
                .countDocuments(query);

            return {
                blogPostList,
                totalNumBlogPosts
            };
        } catch (e) {
            console.error(`No se pudo invocar el comando find, ${e}`);
            return {
                blogPostList: [],
                totalNumBlogPosts: 0
            };
        }
    }

    static async addBlogPost(blogPost, date) {

        try {
            const blogPostResponse = await BlogPost.create({
                title: blogPost.title,
                body: blogPost.body,
                created: date
            });
            console.log(`Se agregó el BlogPost: ${blogPostResponse}`);

            return blogPostResponse;
        } catch (e) {
            console.trace(e)

            throw e;
        }

    }

    static async updateBlogPost(blogPostId, blogPost, date) {
        try {
            const blogPostResponse = await BlogPost.findByIdAndUpdate(
                blogPostId, {
                    title: blogPost.title,
                    body: blogPost.body,
                    updated: date
                }, {
                    new: true
                }
            );
            console.log(`Se modificó el BlogPost: ${blogPostResponse}`);

            return blogPostResponse;
        } catch (e) {
            console.trace(e)

            throw e;
        }
    }

    static async deleteBlogPost(blogPostId) {
        try {
            await BlogPost.findByIdAndDelete(blogPostId);
            console.log(`Se eliminó el BlogPost con id: ${blogPostId}`);
        } catch (e) {
            console.trace(e)

            throw e;
        }
    }
}
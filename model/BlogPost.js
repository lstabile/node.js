import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    body: String,
    created: Date,
    updated: Date
});

BlogPostSchema.index({ title: 'text' });

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

export default BlogPost;

import * as db from "../db/queries/postQueries.js";

async function createNewPost(req, res, next) {

    const data = {
        title: req.body.title,
        content: req.body.content,
        authorId: req.user.id
    }

    try{
        await db.createPost(data)

        res.status(201).json({
            message: "Post Created"
        })
    } catch(err) {
        next(err)
    }
}

async function deletePost(req, res, next) {

    const data = {
        postId: parseInt(req.params.postId)
    }
    try{
        await db.deletePostById(data)

        res.status(200).json({
            message: "Post Deleted"
        })
    } catch(err) {
        next(err)
    }
}

async function deleteAllPosts(req, res, next) {

    const data = {
        authorId: req.user.id
    }

    try{
        await db.deletePostsByAuthorId(data)

        res.status(200).json({
            message: "Posts Deleted"
        })
    } catch(err) {
        next(err)
    }
}

async function updateExistingPost(req, res, next ) {
    const data = {
        postId: parseInt(req.params.postId),
        title: req.body.title,
        content: req.body.content
    }
    try {
        await db.updatePost(data)

        res.status(200).json({
            message: "Post Updated"
        })
    }catch(err) {
        next(err)
    }
}

async function findPost(req, res, next) {

    const data = {
        postId: parseInt(req.params.postId)
    }
    try{
        const post = await db.findPostbyId(data)

        if(!post){
            return res.status(404).json({
                message: "Post Not Found"
            })
        }

        res.status(200).json({
            post: post
        })
    } catch(err){
        next(err)
    }
}

async function findAllPosts(req, res, next) {
    try{
        const posts = await db.findAllPosts()

        if(!posts){
            res.status(404).json({
                message: "No Posts available"
            })
        }

        res.status(200).json({
            posts: posts
        })
    }catch(err) {
        next(err)
    }
}

export {
    createNewPost,
    deletePost,
    deleteAllPosts,
    updateExistingPost,
    findPost,
    findAllPosts
}
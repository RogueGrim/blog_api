import * as db from "../db/queries/postQueries.js";

async function createNewPost(req, res, next) {

    const data = {
        title: req.body.title,
        content: req.body.content,
        authorId: req.params.authorId
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
    try{
        await db.deletePostById({postId: req.params.postId})

        res.status(200).json({
            message: "Post Deleted"
        })
    } catch(err) {
        next(err)
    }
}

async function deleteAllPosts(req, res, next) {
    try{
        await db.deletePostsByAuthorId({postId: req.params.authorId})

        res.status(200).json({
            message: "Posts Deleted"
        })
    } catch(err) {
        next(err)
    }
}

 async function updateExistingPost(req, res, next ) {
    const data = {
        postId: req.params.postId,
        title: req.body?.title,
        content: req.body?.content
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

 export {
    createNewPost,
    deletePost,
    deleteAllPosts,
    updateExistingPost
 }
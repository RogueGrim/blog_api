import * as db from "../db/queries/commentQueries.js"

async function createNewComment(req, res, next) {
    const data = {
        authorId: parseInt(req.params.userId),
        postId: parseInt(req.params.postId),
        content: req.body.content
    }

    try{
        await db.createComment(data)

        res.status(201).json({
            message: "Comment Created"
        })
    }catch(err) {
        next(err)
    }
}

async function deleteExistingComment(req, res, next) {
    const data = {
        commentId: parseInt(req.params.commentId),
        postId: parseInt(req.params.postId)
    }
    try {
        await db.deleteComment(data)

        res.status(200).json({
            message: "Comment Deleted"
        })
    }catch(err) {
        next(err)
    }
}

async function deleteAllComments(req, res, next) {
    const data = {
        postId: parseInt(req.params.postId)
    }
    try {
        await db.deleteCommentsByPostId(data)

        res.status(200).json({
            message: "Comments Deleted"
        })
    }catch(err) {
        next(err)
    }
}

async function deleteAllCommentsByAuthor(req, res, next) {
    const data = {
        authorId: parseInt(req.params.userId),
        postId: parseInt(req.params.postId)
    }
    try {
        await db.deleteCommentsByAuthorId(data)

        res.status(200).json({
            message: "Comments Deleted"
        })
    }catch(err) {
        next(err)
    }
}

async function updateExistingComment(req, res, next) {
    const data = {
        commentId: parseInt(req.params.commentId),
        authorId: parseInt(req.params.userId)
    }
    try {
        await db.updateComment(data)

        res.status(200).json({
            message: "Comment Updated"
        })
    }catch(err) {
        next(err)
    }
}

async function findComment(req, res, next) {
    const data = {
        commentId: parseInt(req.params.commentId),
        postId: parseInt(req.params.postId)
    }
    
    try{
        const comment = await db.findCommentById(data)

        res.status(200).json({
            comment: comment
        })
    }catch(err){
        next(err)
    }
}

async function findAllCommentsOnPost(req, res, next) {

    const data = {
        postId: parseInt(req.params.postId)
    }
    try{
        const comments = await db.findCommentsByPostId(data)

        res.status(200).json({
            comments: comments
        })
    } catch(err) {
        next(err)
    }
}

async function findAllCommentsByAuthor(req, res, next) {

    const data = {
        authorId: parseInt(req.params.userId)
    }
    try{
        const comments = await db.findCommentsByAuthorId(data)

        res.status(200).json({
            comments: comments
        })
    } catch(err) {
        next(err)
    }
}

export { 
    createNewComment,
    deleteExistingComment,
    deleteAllComments,
    deleteAllCommentsByAuthor,
    updateExistingComment,
    findComment,
    findAllCommentsOnPost,
    findAllCommentsByAuthor
}
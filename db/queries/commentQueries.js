import { prisma } from "../../lib/prisma.js"

async function createComment(data) {
    await prisma.comment.create({
        data: {
            authorId: data.authorId,
            postId: data.postId,
            content: data.content
        }
    })
}

async function findCommentById(data) {
    const comment = await prisma.comment.findUnique({
        where: {
            id: data.commentId,
            postId: data.postId
        }
    })

    return comment
}

async function findCommentsByAuthorId(data) {
    const comment = await prisma.comment.findMany({
        where: {
            authorId: data.authorId
        }
    })

    return comment
}

async function findCommentsByPostId(data) {
    const comment = await prisma.comment.findMany({
        where: {
            postId: data.postId,
        }
    })

    return comment
}

async function deleteComment(data) {
    await prisma.comment.delete({
        where: {
            id: data.CommentId,
            postId: data.postId
        }
    })
}

async function deleteCommentsbyAuthorId(data) {
    await prisma.comment.deleteMany({
        where: {
            authorId: data.authorId
        }
    })
}

async function deleteCommentsByPostId(data) {
    await prisma.comment.deleteMany({
        where: {
            postId: data.postId
        }
    })
}

async function updateComment(data) {
    await prisma.comment.update({
        where: {
            id: data.postId,
            authorId: data.authorId
        },
        data: {
            content: data?.content
        }
    })
}


export { 
    createComment,
    findCommentById,
    findCommentsByAuthorId,
    findCommentsByPostId,
    deleteComment,
    deleteCommentsbyAuthorId,
    deleteCommentsByPostId,
    updateComment
}
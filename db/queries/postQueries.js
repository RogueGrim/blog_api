import { prisma } from "../../lib/prisma.js";


async function createPost(data) {
    await prisma.post.create({
        data: {
            title: data.title,
            content: data.content,
            authorId: data.userId,
        },
        include: {
            comments: true
        }
    })
}

async function findPostbyId(data) {
    const post = prisma.post.findUnique({
        where: {
            id: data.postId
        }
    })

    return post
}

async function findPostsbyAuthorId(data) {
    const post = prisma.post.findMany({
        where: {
            authorId: data.authorId
        }
    })

    return post
}

async function deletePostById(data) {
    prisma.post.delete({
        where: {
            id: data.postId
        }
    })
}

async function deletePostsByAuthorId(data) {
    prisma.post.deleteMany({
        where: {
            authorId: data.authorId
        }
    })
}

async function updatePost(data) {
    prisma.post.update({
        where: {
            id: data.postId
        },
        data: {
            title: data?.title,
            content: data?.content
        }
    })
}


export {
    createPost,
    findPostbyId,
    findPostsbyAuthorId,
    deletePostById,
    deletePostsByAuthorId,
    updatePost
}
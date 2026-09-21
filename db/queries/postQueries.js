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

async function findAllPosts(data) {
    const posts = await prisma.post.findMany()

    return posts
}

async function findPostbyId(data) {
    const post = await prisma.post.findUnique({
        where: {
            id: data.postId
        }
    })

    return post
}

async function findPostsbyAuthorId(data) {
    const post = await prisma.post.findMany({
        where: {
            authorId: data.authorId
        }
    })

    return post
}

async function deletePostById(data) {
    await prisma.post.delete({
        where: {
            id: data.postId
        }
    })
}

async function deletePostsByAuthorId(data) {
    await prisma.post.deleteMany({
        where: {
            authorId: data.authorId
        }
    })
}

async function updatePost(data) {
    await prisma.post.update({
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
    findAllPosts,
    findPostsbyAuthorId,
    deletePostById,
    deletePostsByAuthorId,
    updatePost
}
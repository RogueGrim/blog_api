import { prisma } from "../../lib/prisma.js"

async function createUser(data) {
    await prisma.user.create({
        data: {
            username: data.username,
            password: data.password
        },
        include: {
            userDetails: true,
            posts: true,
            comments: true
        }
    })
}

async function createUserDetails(data) {
    await prisma.userDetails.create({
        data: {
            userId: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data?.phone
        }
    })
}

async function findUserById(data) {
    const user = await prisma.user.findUnique({
        where: {
            id: data.userId
        }
    })

    return user
}

export { 
    createUser,
    createUserDetails,
    findUserById
}
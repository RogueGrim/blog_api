import { prisma } from "../../lib/prisma.js"
import bcrypt from "bcryptjs";

async function createUser(data) {
    const hashedPass =  await bcrypt.hash(data.password, 10)

    await prisma.user.create({
        data: {
            username: data.username,
            password: hashedPass
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

async function findUserDetails(data) {
    const user = await prisma.userDetails.findFirst({
        where: {
            userId: data.userId
        }
    })

    return user
}

export { 
    createUser,
    createUserDetails,
    findUserById,
    findUserDetails
}
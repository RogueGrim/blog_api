import { prisma } from "../lib/prisma.js"

async function main() {
    const user  = await prisma.user.create({
        data: {
            username: "admin",
            password: "admin@123",
            userDetails: {
                create : {
                    first_name: "Admin",
                    last_name: "The administrator",
                    email: "admin@123",
                    phone: 69420247,
                },
            },
        },
        include: {
            userDetails: true,
            posts: true,
            comments: true,
        }
    })
    console.log("User Created: ", user) 
}

main().then(async () =>{
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
});
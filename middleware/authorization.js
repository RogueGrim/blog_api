import { prisma } from "../lib/prisma.js"

async function postAuthorization(req, res, next){

    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(req.params.postId)
        }
    })

    if(!post) {
        return res.status(404).json({
            message: "Not found"
        })
    }

    if(post.authorId != req.user.id){
        return res.status(403).json({
            message: "User is unauthorized"
        })
    }
    
    next()
}

async function  commentAuthorization(req, res, next) {
    const comment = await prisma.comment.findUnique({
        where: {
            id: parseInt(req.params.commentId)
        }
    })

    if(!comment) {
        return res.status(404).json({
            message: "Not found"
        })
    }

    if(comment.authorId != req.user.id ){
        return res.status(403).json({
            message: "User is unauthorized"
        })
    }

    next()
}

export { postAuthorization, commentAuthorization } 
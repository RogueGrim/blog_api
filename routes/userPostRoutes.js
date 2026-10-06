import express from "express"
import { passport } from "../middleware/authentication.js"
import * as postController from "../controllers/postControllers.js"
import { postAuthorization } from "../middleware/authorization.js"

const userPostRouter = express.Router({
    mergeParams: true
})

userPostRouter.post('/createPost', 
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    postController.createNewPost
)

userPostRouter.delete('/:postId/deletePost',
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    postAuthorization,
    postController.deletePost   
)

userPostRouter.delete('/:postId/deleteAllPosts',
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    postController.deleteAllPosts
)

userPostRouter.put(':postId/updatePost',
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    postController.updateExistingPost
)

export { userPostRouter }

import express from "express"
import { passport } from "../middleware/authentication.js"
import * as postController from "../controllers/postControllers.js"

const postRouter = express()

postRouter.post('/:userId/createPost', 
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    postController.createNewPost
)

postRouter.delete('/:userId/:postId/deletePost',
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    postController.deletePost   
)

postRouter.delete('/:userId/posts/:postId/deleteAllPosts',
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    postController.deleteAllPosts
)

postRouter.put('/:userId/posts/:postId/updatePost',
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    postController.updateExistingPost
)

postRouter.get('/posts/:postId/', postController.findPost)

postRouter.get('/posts', postController.findAllPosts)


export { postRouter }

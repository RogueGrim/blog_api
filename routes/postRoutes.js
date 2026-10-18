import express from "express"
import * as postController from "../controllers/postControllers.js"

const postRouter = express.Router()

postRouter.get('/:postId/', postController.findPost)

postRouter.get('/', postController.findAllPosts)

export { postRouter }
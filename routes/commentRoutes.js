import * as commentController from "../controllers/commentControllers.js"
import express from "express"

const commentRouter = express.Router()

commentRouter.get('/:commentId/findComment', commentController.findComment)

commentRouter.get('/posts/:postId/findAllComments', commentController.findAllCommentsOnPost)

commentRouter.get('/:userId/:postId/findAllCommentsByUser', commentController.findAllCommentsByAuthor)

export { commentRouter }
import * as commentController from "../controllers/commentControllers.js"
import express from "express"
import { passport } from "../middleware/authentication.js"

const commentRouter = express()

commentRouter.post('/:userId/posts/:postId/comments/createComment',
    passport.authenticate(
        "jwt",
        { session: false }
    ),
    commentController.createNewComment
)

commentRouter.delete('/:userId/posts/:postId/comments/:commentId/deleteComment',
    passport.authenticate(
        "jwt",
        {session: false }
    ),
    commentController.deleteExistingComment
)

commentRouter.delete('/:userId/posts/:postId/comments/deleteAllComments',
    passport.authenticate(
        "jwt",
        {session: false }
    ),
    commentController.deleteAllComments
)

commentRouter.delete('/:userId/posts/:postId/comments/deleteCommentByUser',
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    commentController.deleteAllCommentsByAuthor
)

commentRouter.put('/:userId/posts/:postId/comments/:commentId/updateComment',
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    commentController.updateExistingComment
)

commentRouter.get('/:postId/:commentId/findComment', commentController.findComment)

commentRouter.get('/:postId/findAllComments', commentController.findAllCommentsOnPost)

commentRouter.get('/:userId/:postId/findAllCommentsByUser', commentController.findAllCommentsByAuthor)

export   { commentRouter }
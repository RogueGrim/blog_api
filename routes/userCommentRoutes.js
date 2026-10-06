import * as commentController from "../controllers/commentControllers.js"
import express from "express"
import { passport } from "../middleware/authentication.js"

const userCommentRouter = express.Router({
    mergeParams: true
})

userCommentRouter.post('/createComment',
    passport.authenticate(
        "jwt",
        { session: false }
    ),
    commentController.createNewComment
)

userCommentRouter.delete('/:commentId/deleteComment',
    passport.authenticate(
        "jwt",
        {session: false }
    ),
    commentController.deleteExistingComment
)

userCommentRouter.delete('/deleteAllComments',
    passport.authenticate(
        "jwt",
        {session: false }
    ),
    commentController.deleteAllComments
)

userCommentRouter.delete('/deleteCommentByUser',
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    commentController.deleteAllCommentsByAuthor
)

userCommentRouter.put('/:commentId/updateComment',
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    commentController.updateExistingComment
)

export   { userCommentRouter }
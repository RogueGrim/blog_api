import * as commentController from "../controllers/commentControllers.js"
import express from "express"
import { passport } from "../middleware/authentication.js"
import { commentAuthorization, postAuthorization } from "../middleware/authorization.js"

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
    commentAuthorization,
    commentController.deleteExistingComment
)

userCommentRouter.delete('/deleteAllComments',
    passport.authenticate(
        "jwt",
        {session: false }
    ),
    postAuthorization,
    commentController.deleteAllComments
)

userCommentRouter.put('/:commentId/updateComment',
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    commentAuthorization,
    commentController.updateExistingComment
)

export   { userCommentRouter }
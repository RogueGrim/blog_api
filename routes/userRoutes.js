import express from "express";
import { passport } from "../middleware/authentication.js";
import * as UserController from "../controllers/userController.js";

const userRouter = express.Router()

userRouter.post('/login',
    passport.authenticate(
        "local",
        {session: false}
    ),
    UserController.login
)

userRouter.post('/logout', UserController.logout)

userRouter.post('/createUser',  UserController.createNewUser)

userRouter.post('/createUser/:userId/userDetails', UserController.createUserDetails)

userRouter.get('/user/:userId',
    passport.authenticate(
        "jwt",
        {session: false}
    ),
     UserController.findUser
)

export { userRouter }
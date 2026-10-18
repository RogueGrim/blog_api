import express from "express";
import { passport } from "../middleware/authentication.js";
import * as UserController from "../controllers/userController.js";

const userRouter = express.Router()

userRouter.post('/login',
    //passport middleware with local strategy for login creadentials
    passport.authenticate(
        "local",
        {session: false}
    ),
    //login controller
    UserController.login
)

userRouter.post('/logout', UserController.logout)

userRouter.post('/createUser',  UserController.createNewUser)

userRouter.post('/createUser/:userId/userDetails', UserController.createUserDetails)

userRouter.get('/user/:userId',
    //passport middleware for authenticating login using jwt strategy
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    //protected route controller
     UserController.findUser
)

userRouter.get('/user/:userId/userDetails',
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    UserController.findUserDetails
)
export { userRouter }
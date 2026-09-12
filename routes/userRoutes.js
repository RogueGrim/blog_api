import express from "express";
import { passport } from "../middleware/authentication.js";
import { login, logout } from "../controllers/userController.js";

const userRouter = express.Router()

userRouter.post('/login',
    passport.authenticate("local", {
        session: false,
    }),
    login
)

userRouter.post('/logout', logout)

export { userRouter }
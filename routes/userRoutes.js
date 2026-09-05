import express from "express";
import { passport } from "../middleware/authentication.js";
import { generateJwt } from "../controllers/userController.js";

const userRouter = express.Router()

userRouter.post('/login',
    passport.authenticate("local", {
        session: false,
    }),
    generateJwt
)

userRouter.post('/logout',
    (req, res, next) => {
       res.clearCookie("token");

       res.json({
        message: "logged out"
       })
    }
)

userRouter.get("/test", (req, res) => res.send("Hello World"))

export { userRouter }
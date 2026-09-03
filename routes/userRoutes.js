import express from "express";
import { passport } from "../middleware/authentication.js";
import jwt from "jsonwebtoken";

const userRouter = express.Router()

userRouter.post('/login',
    passport.authenticate("local", {
        session: false,
    }),
    (req, res) => {
        const token = jwt.sign(
            {
                userId: req.user.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        ) 

        res.json({
            message: "Login Sucessful!",
            token,
        })
    }
)

userRouter.get("/test", (req, res) => res.send("Hello World"))

export { userRouter }
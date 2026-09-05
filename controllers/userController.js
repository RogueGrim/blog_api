import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";

async function generateJwt(req, res ) {
    const token = jwt.sign(
        {
            userId: req.user.id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })

    res.json({
        message: "Login Sucessful!",
    })
}

export {
    generateJwt
}
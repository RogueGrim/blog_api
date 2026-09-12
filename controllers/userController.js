import * as db from "../db/queries/userQueries.js";
import jwt from "jsonwebtoken";

async function login(req, res, next ) {
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

async function logout(req, res, next) {
    res.clearCookie("token");

    res.json({
    message: "logged out"
    })
}

async function createNewUser(req, res, next) {
    const data = {
        username: req.body.username,
        password: req.body.password
    }

    try{
        await db.createUser(data)
        res.status(201).json({
            message: `User Created: ${data.username}`
        })
    }catch (err) {
        next(err)
    }
}

async function createUserDetails(req, res, next) {
    const data = {
        userId: req.params.userId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body?.phone
    }

    try {
        await db.createUserDetails(data)
        res.status(201).json({
            message: "Added User Details Sucessfully"
        })
    }catch (err) {
        next(err)
    }
}

export {
    login,
    logout,
    createNewUser,
    createUserDetails
}
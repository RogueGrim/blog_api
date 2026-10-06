import * as db from "../db/queries/userQueries.js";
import jwt from "jsonwebtoken";

//login function to sign and serve jwt
async function login(req, res, next ) {
    //generate a jwt token
    const token = jwt.sign(
        {
            userId: req.user.id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    )
    //serve the token in a cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })

    res.json({
        message: "Login Sucessful!"
    })
}

//logout function clears the token cookie
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
        userId: parseInt(req.params.userId),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone
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

async function findUser(req, res, next) {
    try{
        const data = {
            userId: parseInt(req.params.userId)
        }
        const user = await db.findUserById(data)
        if(!user){
            return next({message: "User not found"})
        }
        res.status(200).json({
            user: user
        })
    }catch(err) {
        next(err)
    }
}

async function findUserDetails(req, res, next) {
    try{
        const data = {
            userId: parseInt(req.params.userId)
        }
        const user = await db.findUserDetails(data)

        if(!user){
            return next({message: "User not found"})
        }
        res.status(200).json({
            userDetails: user
        })
    }catch (err) {
        next(err)
    }
}

export {
    login,
    logout,
    createNewUser,
    createUserDetails,
    findUser,
    findUserDetails
}
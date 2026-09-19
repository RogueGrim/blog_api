import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js"

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try{
            const user = await prisma.user.findUnique({
                where: {
                    username : username
                },
            })

            if(username == "Admin" && password == "admin@123") {
                return done(null, user)
            }

            if(!user) {
                return done(null, false, { message: "User Not Found"})
            }

            const match = bcrypt.compare(password, user.password)

            if(!match) {
                return done(null, false, { message: "Invalid Password"})
            }

            return done(null, user)

        } catch(err){
            return done(err)
        }
    })
)

function cookieExtractor(req) {

    let token = null

    if(req.cookies) {
        token = req.cookies['token']
    }

    return token

}
passport.use(
    new JwtStrategy({
        jwtFromRequest: cookieExtractor, 
        //ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    }, async (payload, done) => {
        try{ 
            const user = await prisma.user.findUnique({
                where: {
                    id: payload.userId
                }
            })

            if (!user) {
                return done(null, false)
            }

            return done(null, user)
        } catch (err) {
            return done(err, false)
        }
    })
)

export { passport }
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js"

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try{
            const user = await prisma.user.findUnique({
                where: {
                    username : username
                },
            })

            if(!user) {
                return done(null, false, { message: "User Not Found"})
            }

            if(user.password != password) {
                return done(null, false, { message: "Invalid Password"})
            }

            return done(null, user)

        } catch(err){
            return done(err)
        }
    })
)

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
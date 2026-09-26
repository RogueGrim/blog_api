import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRoutes.js";
import { userPostRouter } from "./routes/userPostRoutes.js";
import { userCommentRouter } from "./routes/userCommentRoutes.js";
import { postRouter } from "./routes/postRoutes.js";
import { commentRouter } from "./routes/commentRoutes.js";

const app = express()

const port = process.env.PORT; 

//middleware lets express read json format
app.use(express.json())

//middleware lets express read url data convert into req.body
//not really necessary for an API
app.use(express.urlencoded({extended:true}))

//middleware lets express read cookies
app.use(cookieParser())

app.use("/", userRouter)

//routes for all posts
app.use('/posts', postRouter)

//routes for posts related to user
app.use("/users/:userId/posts", userPostRouter)

//routes for all comments
app.use("/comments", commentRouter)

//routes for comments of user under a post
app.use("/users/:userId/posts/:postId/comments", userCommentRouter)

app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message
    })
})

app.listen(port, () => {
    console.log(`App is listening on PORT: ${port}`)
})
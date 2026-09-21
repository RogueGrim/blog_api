import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRoutes.js";

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

app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message
    })
})

app.listen(port, () => {
    console.log(`App is listening on PORT: ${port}`)
})
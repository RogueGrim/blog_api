import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRoutes.js";

const app = express()

const port = process.env.PORT; 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
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
import "dotenv/config"
import express from "express"
import { userRouter } from "./routes/userRoutes.js";

const app = express()

const port = process.env.PORT; 

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/", userRouter)

app.listen(port, () => {
    console.log(`App is listening on PORT: ${port}`)
})
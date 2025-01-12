const express  = require("express")
const app = express()
require('dotenv').config()
const PORT = process.env.PORT;
const MongoConnect = require("./config/db")
const UserRouter = require("./Router/user.router")
var cors = require('cors')

app.use(express.json())
app.use(cors())
app.use("/api",UserRouter)

app.get("/health",(req,res)=>[
    res.send({message : "Connected!! OK"})
])

app.listen(PORT,async()=>{
    await MongoConnect()
    console.log(`App is listeneing on the port : ${PORT}`)
})
const mongoose = require("mongoose")

const connect = async()=>{
   try {
    await mongoose.connect(process.env.MONGOURI)
    console.log("DB is connected")
   } catch (error) {
    console.log("Error in connecting db")
   }
     
}

module.exports = connect
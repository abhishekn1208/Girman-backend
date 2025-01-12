const express = require("express")
const routes = express.Router()
const {getAllUser,getSearchedUser,specificUser,createUser,updateUser,deleteUser} = require("../collections/user.collections")

//get all user
routes.get("/user",getAllUser)
                                                        
//search by user name
routes.get("/user/search",getSearchedUser)

//search user by id
routes.get("/user/:id",specificUser)

//create a new user
routes.post("/user/add",createUser)

//update user details
routes.patch("/user/:id",updateUser)

//delete the user
routes.delete("/user/:id",deleteUser)

module.exports = routes
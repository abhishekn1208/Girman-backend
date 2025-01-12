const User = require("../model/user.model")

const getAllUser=async(req,res)=>{
    try {
        const {page, limit,sortQuery,first_name, last_name} = req.query
    
        const filter = {}
        let sortedData = {}
        
        if(first_name || last_name){
          let searchQuery = '';
          if(first_name){
           searchQuery += first_name + ' '
          }
          if(last_name){
           searchQuery += last_name + ' '
          }
   
          filter.$text = {$search : searchQuery.trim()}
       }

        if(sortQuery==="name"){
            sortedData.first_name = 1
        }
    
        if(sortQuery==="city"){
            sortedData.city = 1
        }

        const pageNumber = Number(page) || 1
        const pageSize = Number(limit) || 6
        const skip = (pageNumber-1)*pageSize


        const user = await User.find(filter).skip(skip).limit(pageSize).sort(sortedData)
        
        const totalUsers = await User.countDocuments()
       
        const totalPages = Math.ceil(totalUsers/pageSize)

         res.status(200).json({
        user,
        currentPage : pageNumber,
        totalPages,
        pageSize,
        totalUsers
    })
    } catch (error) {
        res.status(500).json({message : "Internal Server Error"})
    }
}

const getSearchedUser=async(req,res)=>{
  try {
    const {first_name, last_name,sortQuery} = req.query

    const filter = {}
    

    if(first_name || last_name){
       let searchQuery = '';
       if(first_name){
        searchQuery += first_name + ' '
       }
       if(last_name){
        searchQuery += last_name + ' '
       }

       filter.$text = {$search : searchQuery.trim()}
    }
  

    const user = await User.find(filter)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({message : "Internal Server Error"})
  }
}

const specificUser=async(req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({message : "User not found"})
    
        res.status(200).json(user)
  } catch (error) {
    res.status(500).json({message : "Internal Server Error"})
  }
}

const createUser=async(req,res)=>{
try {
    const {contact_number} = req.body
    console.log(contact_number)
    const user = await User.findOne({contact_number:contact_number})
    if(user) return res.status(400).json({message : "User already exists or try with anothe contact number"})
    
    const newUser = new User({...req.body})
    await newUser.save()
    res.status(200).json(newUser)
} catch (error) {
    res.status(500).json({message : "Internal Server Error"})
}
}


const updateUser=async(req,res)=>{
 try {
    const user = await User.findById(req.params.id)
    if(user) return res.status(400).json({message : "User already exists"})
    
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{...req.body},{new : true})
    await updatedUser.save()
    res.status(200).json(updatedUser)
 } catch (error) {
    res.status(500).json({message : "Internal Server Error"})
 }
}

const deleteUser=async(req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({message : "User not found"}) 
    
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "User deleted Successfully"})
  } catch (error) {
    res.status(500).json({message : "Internal Server Error"})
  }
}

module.exports = {getAllUser,getSearchedUser,specificUser,createUser,updateUser,deleteUser}
const express=require('express')
const user=express.Router()
const userController=require('../controllers/userController')
const {verifyToken}=require('../middlewares/authMiddleware')

user.post('/login',userController.loginUser)
user.post('/register',userController.registerUser)
user.post('/updateprofile',verifyToken,userController.updateUserProfile)



module.exports=user
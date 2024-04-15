const express=require('express')
const admin=express.Router()
const adminController=require('../controllers/adminController')
const {verifyAdminToken}=require('../middlewares/adminAuthMiddleware')

admin.post('/login',adminController.loginAdmin)
admin.get('/getusers',verifyAdminToken,adminController.getUsers)
admin.put('/updateuser',verifyAdminToken,adminController.updateUser)
admin.delete('/deleteuser',verifyAdminToken,adminController.deleteUser)
admin.post('/createuser',verifyAdminToken,adminController.createUser)

module.exports=admin
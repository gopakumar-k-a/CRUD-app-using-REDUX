const express=require('express')
const admin=express.Router()
const adminController=require('../controllers/adminController')
admin.get('/',adminController.loadAdmin)

module.exports=admin
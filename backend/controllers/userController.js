// npm install jsonwebtoken
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const userModel = require('../models/userModel')
const { hashPassword } = require('../utils/hashPassword')
const { generateToken } = require('../utils/generateToken')


module.exports = {

    //@desc enter log in credentials in user side
    //@route POST /login
    //@access public
    loginUser: asyncHandler(async (req, res) => {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email })
        if (user && bcrypt.compare(password, user.password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: email,
                token: await generateToken({ id: user._id,name:user.name,email:email })
            })
        } else {
            res.status(400)
            throw new Error('issue in user credentials')
        }
        // res.status(200).json({ message: 'inside user controller', userData: users })
    }),

    //@desc load login page for user
    //@route GET /register
    //@access public
    registerUser: asyncHandler(async (req, res) => {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            res.status(400)
            throw new Error('fill all fileds')
        }
        const existingUser = await userModel.findOne({ email: email })

        if (existingUser) {
            res.status(400)
            throw new Error('user already exists')
        }
        const hashedPassword = await hashPassword(password);
        const data = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        await data.save()

        res.status(201).json({
            message: 'success',
            name: name,
            email: email,
            token: await generateToken({ id: data._id,name:data.name,email:data.email })
        })

    }),

    userProfile:asyncHandler(async(req,res)=>{
        if(req.user){
            console.log('req.user ',req.user);
        }
        // const {_id,name,email}=await userModel.findOne({_id:req.user.id})
        res.status(200).json(req.user)
    })



}

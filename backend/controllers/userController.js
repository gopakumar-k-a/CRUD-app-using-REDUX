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
        const user = await userModel.findOne({ email: email, isAdmin: false })
        if (user && bcrypt.compare(password, user.password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: email,
                imgUrl: user.imgUrl,
                token: await generateToken({ id: user._id, name: user.name, email: email })
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
            token: await generateToken({ id: data._id, name: data.name, email: data.email })
        })

    }),

    updateUserProfile: asyncHandler(async (req, res) => {
        const { name, email, imgUrl } = req.body
        if (!name || !email) {
            res.status(400)
            throw new Error('required fields are missing')
        }
        const userId = req.user._id
        const existingUser=await userModel.findOne({email:email})
        if(existingUser && existingUser._id.toString() != userId){
          res.status(400)
          throw new Error('already used email')
        }
        const updateObject = {
            name: name,
            email: email
        };
        if (imgUrl) {
            updateObject.imgUrl = imgUrl;
        }

        const updatedUser = await userModel.findOneAndUpdate(
            { _id: userId },
            updateObject,
            { new: true }
        );
        if (!updatedUser) {
            res.status(404)
            throw new Error('user is not updated')
        }

        res.status(200).json({
            message: 'User updated successfully!',
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            imgUrl: updatedUser.imgUrl,
            token: await generateToken({ id: updatedUser._id, name: updatedUser.name, email: updatedUser.email })
        });

    }),





}

const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const userModel = require('../models/userModel')
const { generateToken } = require('../utils/generateToken')
const { hashPassword } = require('../utils/hashPassword')

module.exports = {

   loginAdmin: asyncHandler(async (req, res) => {
      const { email, password } = req.body
      console.log('body ', req.body);
      const admin = await userModel.findOne({ email: email, isAdmin: true })
      if (admin && (await bcrypt.compare(password, admin.password))) {
         res.json({
            _id: admin._id,
            name: admin.name,
            email: email,
            token: await generateToken({ id: admin._id, name: admin.name, email: email })
         })
      } else {
         res.status(400)
         throw new Error('issue in user credentials')
      }

   }),

   getUsers: asyncHandler(async (req, res) => {
      const users = await userModel.find({ isAdmin: false }).select('-password -isAdmin');
      if (users) {
         res.status(200).json({ users })
      } else {
         res.status(400)
         throw new Error('cant find any users')
      }
   }),

   updateUser: asyncHandler(async (req, res) => {
      const { name, email, id } = req.body
      const existingUser = await userModel.findOne({ email });

      if (existingUser && existingUser._id.toString() !== id) {
         res.status(400);
         throw new Error('Email is already in use');
      }
      const updatedUser = await userModel.findByIdAndUpdate(id, { name, email }, { new: true });
      if (!updatedUser) {
         res.status(400)
         throw new Error('cant update the user')
      }
      res.status(200).json(updatedUser);
   }),

   deleteUser: asyncHandler(async (req, res) => {
      const id = req.query.id;
      console.log('id in backend ', id);
      const deletedUser = await userModel.findByIdAndDelete(id);

      if (!deletedUser) {
         return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
   }),


   createUser: asyncHandler(async (req, res) => {
      console.log('req.body create user ', req.body);
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

      res.status(200).json({ message: 'success' })
   })
}
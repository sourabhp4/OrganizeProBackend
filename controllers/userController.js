
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Joi = require('joi')

const createUser = asyncHandler( async (req, res) => {
    console.log("User registration: ", req.body)
    const schema = Joi.object({
        name: Joi.string()
        .pattern(/^[A-Za-z-' ]+$/)
        .required(),

        userEmail: Joi.string()
        .required()
    })
    const result = schema.validate(req.body).error
    if(result){
        res.status(400)
        throw new Error(result.details[0].message)
    }

    try{
        const user = await User.findOne({userEmail: req.body.userEmail})
        if(user){
            res.status(400).json({message: "User already exists"})
            return
        }
    }
    catch(err){
        res.status(500)
        throw new Error(err.message)
    }

    try{
        await User.create({
            userEmail: req.body.userEmail,
            name: req.body.name
        })
        .then(res.status(200).json({message: 'Success'}))
    }catch(err){
        res.status(500)
        throw new Error('Profile creation failed... Try again after some time.. :)')
    }
    
})

const validateUser = asyncHandler( async (req, res) => {
    console.log("User Login: ", req.body)
    try{
        const user = await User.findOne({userEmail: req.body.userEmail})
        if(user) res.status(200).json({name: user.name})
    }
    catch(err){
        res.status(200)
        throw new Error(err.message)
    }
})

const updateName = asyncHandler( async (req, res) => {
    console.log("Update Name: ", req.body)
    try {
        const user = await User.findOne({ userEmail: req.body.userEmail })
        if (!user) {
            throw new Error("No user present")
        }
    
        const updatedUser = await User.updateOne(
            { userEmail: req.body.userEmail },
            { name: req.body.name }
        )
    
        console.log("User name updated successfully")
        res.status(200).json({ message: "Success" })
        
    } catch (err) {
        console.error("Error updating user name: ", err.message);
        res.status(500).json({ error: err.message });
    }

})

module.exports = {
    createUser,
    validateUser,
    updateName
}
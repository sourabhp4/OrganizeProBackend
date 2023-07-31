
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Joi = require('joi')

const createUser = asyncHandler( async (req, res) => {
    console.log(req.body)
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
            res.status(400).send("User already exists")
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
        .then(res.status(200).send('Success'))
    }catch(err){
        res.status(500)
        throw new Error('Profile creation failed... Try again after some time.. :)')
    }
    
})

const validateUser = asyncHandler( async (req, res) => {
    console.log(req.body)
    try{
        const user = await User.findOne({userEmail: req.body.userEmail})
        if(user) res.status(200).send(user.name)
    }
    catch(err){
        res.status(200)
        throw new Error(err.message)
    }
})

module.exports = {
    createUser,
    validateUser
}

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    
    userEmail: { 
        type: String
    },

    name: {
        type: String
    }

}, {
    timestamps: true
})

module.exports = mongoose.model( 'User', userSchema )
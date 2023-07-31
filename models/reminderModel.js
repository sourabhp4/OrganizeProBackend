
const mongoose = require('mongoose')

const reminderSchema = mongoose.Schema({
    
    id: { 
        type: Number
    },

    reminderName: {
        type: String
    },

    dateTime: {
        type: String
    },
    
    about: {
        type: String
    },
    
    status: {
        type: String
    },
    
    userEmail: {
        type: String
    }

}, {
    timestamps: true
})

module.exports = mongoose.model( 'Reminder', reminderSchema )
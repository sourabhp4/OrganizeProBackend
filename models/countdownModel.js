
const mongoose = require('mongoose')

const countdownSchema = mongoose.Schema({
    
    id: { 
        type: Number
    },

    countdownName: {
        type: String
    },

    dateTime: {
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

module.exports = mongoose.model( 'Countdown', countdownSchema )
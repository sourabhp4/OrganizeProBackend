
const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    
    id: { 
        type: Number
    },

    noteName: {
        type: String
    },

    content: {
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

module.exports = mongoose.model( 'Note', noteSchema )

const mongoose = require('mongoose')

const todoListSchema = mongoose.Schema({
    
    id: { 
        type: Number
    },

    todoName: {
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

module.exports = mongoose.model( 'TodoList', todoListSchema )
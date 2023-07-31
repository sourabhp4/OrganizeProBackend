
const asyncHandler = require('express-async-handler')
const Reminder = require('../models/reminderModel')
const Countdown = require('../models/countdownModel')
const TodoList = require('../models/todoListModel')
const Note = require('../models/noteModel')

const backupDataReminders = asyncHandler( async (req, res) => {

    if(req.body.reminders == null || req.body.reminders.length == 0){
        res.status(400).send("Data Invalid")
        return
    }
    
    const session = await Reminder.startSession()
    session.startTransaction()

    try {
        await Reminder.deleteMany({userEmail: req.body.userEmail}).session(session)

        const savedReminders = await Reminder.insertMany(req.body.reminders, { session })

        if (savedReminders.length === req.body.reminders.length) {

            await session.commitTransaction()
            session.endSession()
            res.status(200).send("Success")

        } else {

            console.log('Some data could not be saved')
            await session.abortTransaction()
            session.endSession()

            await Reminder.deleteMany({userEmail: req.body.userEmail}).session(session)
            res.status(500).json('Server error')
        }
    } catch (err) {
        console.log('Error storing data to MongoDB:', err)
        await session.abortTransaction()
        session.endSession()
        res.status(500).send('BackupDataNotes: Server Error')
    }
    
})

const backupDataCountdowns = asyncHandler( async (req, res) => {

    if(req.body.countdowns == null || req.body.countdowns.length == 0){
        res.status(400).send("Data Invalid")
        return
    }
    
    const session = await Countdown.startSession()
    session.startTransaction()

    try {
        await Countdown.deleteMany({userEmail: req.body.userEmail}).session(session)

        const savedCountdowns = await Countdown.insertMany(req.body.countdowns, { session })

        if (savedCountdowns.length === req.body.countdowns.length) {

            await session.commitTransaction()
            session.endSession()
            res.status(200).send("Success")

        } else {

            console.log('Some data could not be saved')
            await session.abortTransaction()
            session.endSession()

            await Countdown.deleteMany({userEmail: req.body.userEmail}).session(session)

            res.status(500).json('Server error')
        }
    } catch (err) {
        console.log('Error storing data to MongoDB:', err)
        await session.abortTransaction()
        session.endSession()
        res.status(500).send('BackupDataNotes: Server Error')
    }
    
})

const backupDataTodoLists = asyncHandler( async (req, res) => {

    if(req.body.todoLists == null || req.body.todoLists.length == 0){
        res.status(400).send("Data Invalid")
        return
    }
    
    const session = await TodoList.startSession()
    session.startTransaction()

    try {
        await TodoList.deleteMany({userEmail: req.body.userEmail}).session(session)

        const savedTodoLists = await TodoList.insertMany(req.body.todoLists, { session })

        if (savedTodoLists.length === req.body.todoLists.length) {

            await session.commitTransaction()
            session.endSession()
            res.status(200).send("Success")

        } else {

            console.log('Some data could not be saved')
            await session.abortTransaction()
            session.endSession()

            await TodoList.deleteMany({userEmail: req.body.userEmail}).session(session)

            res.status(500).json('Server error')
        }
    } catch (err) {
        console.log('Error storing data to MongoDB:', err)
        await session.abortTransaction()
        session.endSession()
        res.status(500).send('BackupDataNotes: Server Error')
    }
    
})

const backupDataNotes = asyncHandler( async (req, res) => {

    if(req.body.notes == null || req.body.notes.length == 0){
        res.status(400).send("Data Invalid")
        return
    }
    
    const session = await Note.startSession()
    session.startTransaction()

    try {
        await Note.deleteMany({userEmail: req.body.userEmail}).session(session)

        const savedNotes = await Note.insertMany(req.body.notes, { session })

        if (savedNotes.length === req.body.notes.length) {

            await session.commitTransaction()
            session.endSession()
            res.status(200).send("Success")

        } else {

            console.errlogor('Some data could not be saved')
            await session.abortTransaction()
            session.endSession()

            await Note.deleteMany({userEmail: req.body.userEmail}).session(session)

            res.status(500).json('Server error')
        }
    } catch (err) {
        console.log('Error storing data to MongoDB:', err)
        await session.abortTransaction()
        session.endSession()
        res.status(500).send('BackupDataNotes: Server Error')
    }
    
})

const restoreData = asyncHandler( async (req, res) => {
    
    try{
        const reminders = await Reminder.find().exec()

        const countdowns = await Countdown.find().exec()

        const todoLists = await TodoList.find().exec()

        const notes = await Note.find().exec()

        req.body.data = { reminders, countdowns, todoLists, notes }

        res.status(200).send(req.body.data)
    }
    catch(err){
        res.status(200)
        console.log(err.message)
        throw new Error("RestoreData: Server Error")
    }
})

module.exports = {
    backupDataReminders,
    backupDataCountdowns,
    backupDataTodoLists,
    backupDataNotes,
    restoreData
}
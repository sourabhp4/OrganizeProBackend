
const asyncHandler = require('express-async-handler')
const Reminder = require('../models/reminderModel')
const Countdown = require('../models/countdownModel')
const TodoList = require('../models/todoListModel')
const Note = require('../models/noteModel')

const backupDataReminders = asyncHandler( async (req, res) => {
    console.log('Request to backup reminders')
    if(req.body.reminders == null ){
        res.status(400).json({message: "Data Invalid"})
        return
    }
    
    const session = await Reminder.startSession()
    session.startTransaction()

    try {
        await Reminder.deleteMany({userEmail: req.body.userEmail}).session(session)

        if(req.body.reminders.length == 0){
            await session.commitTransaction()
            session.endSession()
            console.log("Backup Reminders: Success")
            res.status(200).json({message: "Success"})
            return
        }

        const savedReminders = await Reminder.insertMany(req.body.reminders, { session })

        if (savedReminders.length === req.body.reminders.length) {
            
            await session.commitTransaction()
            session.endSession()
            console.log("Backup Reminders: Success")
            res.status(200).json({message: "Success"})

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
        res.status(500).json({message: 'BackupDataReminders: Server Error'})
    }
    
})

const backupDataCountdowns = asyncHandler( async (req, res) => {
    console.log('Request to backup countdowns')
    if(req.body.countdowns == null){
        res.status(400).json({message: "Data Invalid"})
        return
    }
    
    const session = await Countdown.startSession()
    session.startTransaction()

    try {
        await Countdown.deleteMany({userEmail: req.body.userEmail}).session(session)

        if(req.body.countdowns.length == 0){
            await session.commitTransaction()
            session.endSession()
            console.log("Backup Countdowns: Success")
            res.status(200).json({message: "Success"})
            return
        }

        const savedCountdowns = await Countdown.insertMany(req.body.countdowns, { session })

        if (savedCountdowns.length === req.body.countdowns.length) {

            await session.commitTransaction()
            session.endSession()
            console.log("Backup Countdowns: Success")
            res.status(200).json({message: "Success"})

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
        res.status(500).json({message: 'BackupDataCountDowns: Server Error'})
    }
    
})

const backupDataTodoLists = asyncHandler( async (req, res) => {
    console.log('Request to backup todoLists')
    if(req.body.todoLists == null){
        res.status(400).json({message: "Data Invalid"})
        return
    }
    
    const session = await TodoList.startSession()
    session.startTransaction()

    try {
        await TodoList.deleteMany({userEmail: req.body.userEmail}).session(session)

        if(req.body.todoLists.length == 0){
            await session.commitTransaction()
            session.endSession()
            console.log("Backup TodoLists: Success")
            res.status(200).json({message: "Success"})
            return
        }

        const savedTodoLists = await TodoList.insertMany(req.body.todoLists, { session })

        if (savedTodoLists.length === req.body.todoLists.length) {
            await session.commitTransaction()
            session.endSession()
            console.log("Backup TodoLists: Success")
            res.status(200).json({message: "Success"})

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
        res.status(500).json({message: 'BackupDataTodoLists: Server Error'})
    }
    
})

const backupDataNotes = asyncHandler( async (req, res) => {
    console.log('Request to backup notes')
    if(req.body.notes == null){
        res.status(400).json({message: "Data Invalid"})
        return
    }
    
    const session = await Note.startSession()
    session.startTransaction()

    try {
        await Note.deleteMany({userEmail: req.body.userEmail}).session(session)

        if(req.body.notes.length == 0){
            await session.commitTransaction()
            session.endSession()
            console.log("Backup Notes: Success")
            res.status(200).json({message: "Success"})
            return
        }

        const savedNotes = await Note.insertMany(req.body.notes, { session })

        if (savedNotes.length === req.body.notes.length) {

            await session.commitTransaction()
            session.endSession()
            console.log("Backup Notes: Success")
            res.status(200).json({message: "Success"})

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
        res.status(500).json({message: 'BackupDataNotes: Server Error'})
    }
    
})

const restoreData = asyncHandler( async (req, res) => {
    console.log('Restore Request: ', req.body)
    
    try{
        const reminders = await Reminder.find().exec()

        const countdowns = await Countdown.find().exec()

        const todoLists = await TodoList.find().exec()

        const notes = await Note.find().exec()

        req.body.data = { reminders, countdowns, todoLists, notes }

        res.status(200).json({data: req.body.data, message: 'Success'})
    }
    catch(err){
        res.status(500)
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
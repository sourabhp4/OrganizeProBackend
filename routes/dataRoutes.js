const express = require('express')
const router = express.Router()

const { backupDataReminders, backupDataCountdowns, backupDataTodoLists, backupDataNotes, restoreData } = require('../controllers/dataController')

router.route( '/backupReminders' ).post(backupDataReminders)
router.route( '/backupCountdowns' ).post(backupDataCountdowns)
router.route( '/backupTodoLists' ).post(backupDataTodoLists)
router.route( '/backupNotes' ).post(backupDataNotes)
router.route( '/restore' ).post(restoreData)

module.exports = router
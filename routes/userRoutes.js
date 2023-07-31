const express = require('express')
const router = express.Router()

const { createUser, validateUser } = require('../controllers/userController')

router.route( '/login' ).post(validateUser)
router.route( '/register' ).post(createUser)

module.exports = router
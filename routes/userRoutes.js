const express = require('express')
const router = express.Router()

const { createUser, validateUser, updateName } = require('../controllers/userController')

router.route( '/login' ).post(validateUser)
router.route( '/register' ).post(createUser)
router.route( '/update').post(updateName)

module.exports = router
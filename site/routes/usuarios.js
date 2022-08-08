const express = require ('express')
const router = express.Router()
let { login, register, resetPassword} = require('../controllers/usersControllers')

router.get('/login', login)
router.get('/register', register)
router.get('/reset', resetPassword)

module.exports = router
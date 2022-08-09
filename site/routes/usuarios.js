const express = require ('express')
const router = express.Router()
const { login, register, resetPassword} = require('../controllers/usersControllers')

/* GET users listing. */
router.get('/login', login)
router.get('/register', register)
router.get('/reset', resetPassword)

module.exports = router
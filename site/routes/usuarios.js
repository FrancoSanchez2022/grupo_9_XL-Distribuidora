const express = require ('express')
const router = express.Router()
let { login,register} = require('../controllers/usersControllers')

router.get('/login', login)
router.get('/register', register)

module.exports = router
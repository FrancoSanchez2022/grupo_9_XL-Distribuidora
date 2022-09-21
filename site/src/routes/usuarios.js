const express = require ('express')
const router = express.Router()
const {login, register, resetPassword, profile, processRegister, processLogin, logout} = require('../controllers/usersControllers')

const registerValidator = require('../validations/registerValidation')
const loginValidator = require('../validations/loginValidation')
const upload = require('../middlewares/multerUsers')

/* GET users listing. */
router.get('/register', register);
router.post('/register', registerValidator, processRegister);
router.get('/login', login);
router.post('/login', loginValidator, processLogin);
router.get('/reset', resetPassword);
router.get('/profile', profile);
router.delete('/logout', logout);

module.exports = router
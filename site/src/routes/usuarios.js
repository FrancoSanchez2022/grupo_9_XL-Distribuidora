const express = require ('express')
const router = express.Router()
const {login, register, resetPass, profile, processRegister, processLogin, logout, processResetPass} = require('../controllers/usersControllers')

const registerValidator = require('../validations/registerValidation')
const loginValidator = require('../validations/loginValidation')
const resetPassValidator = require('../validations/resetPassValidator')
const upload = require('../middlewares/multerUsers')

/* GET users listing. */
router.get('/register', register);
router.post('/register', registerValidator, processRegister);
router.get('/login', login);
router.post('/login', loginValidator, processLogin);
router.get('/reset', resetPass);
router.post('/reset', resetPassValidator, processResetPass);
router.get('/profile', profile);
/* router.post('/profile',upload.single('avatar'), editProfile);   futura ruta a crear y funcionar */
router.delete('/logout', logout);

module.exports = router
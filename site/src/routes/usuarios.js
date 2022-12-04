const express = require ('express')
const router = express.Router()
const {register, processRegister, login, processLogin, resetPass, processResetPass, profile, profileEdit, profileEdit2, logout, uploadProfileImage} = require('../controllers/usersControllers')

/* requiero middlewares */
const registerValidator = require('../validations/registerValidation')
const loginValidator = require('../validations/loginValidation')
const resetPassValidator = require('../validations/resetPassValidator')
const upload = require('../middlewares/multerUsers')
const userCheck= require('../middlewares/userCheck')
const guestCheck = require('../middlewares/guestCheck')

/* GET users listing. */
router.get('/register', guestCheck, register);
router.post('/register', registerValidator, processRegister);
router.get('/login', guestCheck, login);
router.post('/login', loginValidator, processLogin);
router.get('/reset', guestCheck, resetPass);
router.post('/reset', resetPassValidator, processResetPass);
router.get('/profile', userCheck, profile);
router.put('/profile', upload.single('avatar'), uploadProfileImage);
router.get('/profileEdit', userCheck, profileEdit);
router.put('/profileEdit/:id', upload.single('avatar'),profileEdit2);
router.delete('/logout', logout);

module.exports = router
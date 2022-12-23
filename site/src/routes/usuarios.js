const express = require ('express')
const router = express.Router()
const {register, processRegister, login, processLogin, forgotPass, processForgotPass, recoverPass, processRecoverPass, profile, profileEdit, profileEdit2, logout, uploadProfileImage} = require('../controllers/usersControllers')

/* requiero middlewares */
const registerValidator = require('../validations/registerValidation')
const loginValidator = require('../validations/loginValidation')
const forgotPassValidator = require('../validations/forgotPassValidator')
const upload = require('../middlewares/multerUsers')
const userCheck= require('../middlewares/userCheck')
const guestCheck = require('../middlewares/guestCheck')

/* GET users listing. */
router.get('/register', guestCheck, register);
router.post('/register', registerValidator, processRegister);
router.get('/login', guestCheck, login);
router.post('/login', loginValidator, processLogin);
router.get('/forgotPassword', guestCheck, forgotPass);
router.post('/forgotPassword', forgotPassValidator, processForgotPass);
router.get('/recoverPassword/:id', guestCheck, recoverPass);
router.post('/recoverPassword/:id', processRecoverPass);
router.get('/profile', userCheck, profile);
router.put('/profile', upload.single('avatar'), uploadProfileImage);
router.get('/profileEdit', userCheck, profileEdit);
router.put('/profileEdit/:id', upload.single('avatar'),profileEdit2);
router.delete('/logout', logout);

module.exports = router
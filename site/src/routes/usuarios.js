const express = require ('express')
const router = express.Router()
<<<<<<< HEAD
const {login, register, resetPass, profile, processRegister, processLogin, logout, processResetPass} = require('../controllers/usersControllers')

=======
const {register, processRegister, login, processLogin, resetPass, processResetPass, profile, profileEdit, logout, uploadProfileImage} = require('../controllers/usersControllers')

/* requiero middlewares */
>>>>>>> main
const registerValidator = require('../validations/registerValidation')
const loginValidator = require('../validations/loginValidation')
const resetPassValidator = require('../validations/resetPassValidator')
const upload = require('../middlewares/multerUsers')
<<<<<<< HEAD

/* GET users listing. */
router.get('/register', register);
router.post('/register', registerValidator, processRegister);
router.get('/login', login);
router.post('/login', loginValidator, processLogin);
router.get('/reset', resetPass);
router.post('/reset', resetPassValidator, processResetPass);
router.get('/profile', profile);
router.get('/profile', profile);
=======
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
/*    
router.get('/profileEdit', userCheck, profileEdit)      aùn no se hacen las vistas de estas rutas extras
router.put('/profileEdit', upload.single('avatar'),profileEdit)    aùn no se hacen las vistas de estas rutas extras 
*/
>>>>>>> main
router.delete('/logout', logout);

module.exports = router
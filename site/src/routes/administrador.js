const { list, create, store, edit, update, destroy, history, restore, crash, dashboard, userList, addUser, processAddUser, editUser, processEditUser, deleteUser } = require('../controllers/adminController')
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerProducts');
const adminCheck = require('../middlewares/adminCheck');
const uploadUsers = require('../middlewares/multerUsers')
/* const productValidator = require('../validations/productsValidation') */
const userCreateValidator = require('../validations/userCreateValidation')


/* Admin Dashboard */
router.get('/', adminCheck, dashboard);

/* Lista de usuarios */
router.get('/users', adminCheck, userList);

/* Creación de usuarios */
router.get('/addUser', adminCheck, addUser);
router.post('/addUser', uploadUsers.single('avatar'), userCreateValidator, processAddUser);

/* Edición de usuarios */
router.get('/editUser/:id', adminCheck, editUser);
router.put('/editUser/:id', uploadUsers.single('avatar'), processEditUser);

/* Eliminar usuario */
router.delete('/deleteUser/:id', adminCheck, deleteUser );

/* Lista e historial de productos */
router.get('/list', adminCheck, list);
router.get('/history', adminCheck, history);

/* Creando un producto */
router.get('/create', adminCheck, create);
router.post('/create', upload.array('imagen'), /*productValidator, */store);

/* Editando un producto */
router.get('/edit/:id', adminCheck, edit);
router.put('/edit/:id', upload.array('imagen'), /*productValidator, */update);

/* Eliminando un producto */
router.delete('/destroy/:id', adminCheck, destroy);
router.delete('/restore/:id', adminCheck, restore);
router.delete('/crash/:id', adminCheck, crash);


module.exports = router;
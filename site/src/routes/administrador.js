const { list, create, edit, store, update, destroy, history, crash, restore } = require('../controllers/adminController')
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerProducts');
const adminCheck = require('../middlewares/adminCheck');
/* const productValidator = require('../validations/productsValidation') */

/* Admin Dashboard & users */
router.get('/', adminCheck, function (req, res) { res.render('admin/index') });
router.get('/users', adminCheck, function (req, res) { res.render('admin/userList') });
router.get('/addUser', adminCheck, function (req, res) { res.render('admin/userCreate') });
router.get('/modUser', adminCheck, function (req, res) { res.render('admin/userEdit') });

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
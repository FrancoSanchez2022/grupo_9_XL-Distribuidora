const { list, create, edit, store, update, destroy, history, crash, restore } = require('../controllers/adminController')
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerProducts');
const adminCheck = require('../middlewares/adminCheck');
/* const productValidator = require('../validations/productsValidation') */

/* GET home page. */
router.get('/modUsers', adminCheck, (req, res) => {
	return res.render('admin/userEdit')
},);
router.get('/users', adminCheck, function (req, res, next) {
	res.render('admin/userList', { css: '/css/dashboard.css' });
});
router.get('/addUser', adminCheck, function (req, res, next) {
	res.render('admin/userCreate', { css: '/css/dashboard.css' });
});
router.get('/modUser', adminCheck, function (req, res, next) {
	res.render('admin/userEdit', { css: '/css/dashboard.css' });
});
router.get('/', adminCheck, function (req, res, next) {
	res.render('admin/index', { css: '/css/dashboard.css' });
});


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
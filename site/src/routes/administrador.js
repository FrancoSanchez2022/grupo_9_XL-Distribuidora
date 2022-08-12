const {list,create,edit,store,update,destroy,history} = require('../controllers/adminController')
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/list', list);
router.get('/history', history);

/* Creando un producto */
router.get('/create', create);
router.post('/create',store);

/* Editando un producto */
router.get('/edit/:id', edit);
router.put('/edit/:id', update);

/* Eliminando un producto */
router.delete('/destroy/:id', destroy);

module.exports = router;
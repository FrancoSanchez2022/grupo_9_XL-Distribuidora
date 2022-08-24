const express = require('express');
const {list,create,edit,store,update,destroy,history} = require('../controllers/adminController')
const upload = require('../middlewares/multerProducts');
const router = express.Router();


/* GET home page. */
router.get('/list', list);
router.get('/history', history);

/* Creando un producto */
router.get('/create', create);
router.post('/create',upload.array('imagen'),store);

/* Editando un producto */
router.get('/edit/:id', edit);
router.put('/edit/:id',upload.array('imagen'), update);

/* Eliminando un producto */
router.delete('/destroy/:id', destroy);

module.exports = router;
const {paginacion} = require('../../controllers/api/paginacion');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/products', paginacion);

module.exports = router;
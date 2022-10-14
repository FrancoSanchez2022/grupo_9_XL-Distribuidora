const express = require ('express')
const router = express.Router()
const {home, search} = require('../controllers/indexController')

/* GET home page. */
router.get('/', home)
router.get('/busqueda', search)

module.exports = router
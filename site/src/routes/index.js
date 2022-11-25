const express = require ('express')
const router = express.Router()
const {home, search, query} = require('../controllers/indexController')

/* GET home page. */
router.get('/', home)
router.get('/busqueda', search)
/*router.get ('/', query)*/
module.exports = router
const express = require ('express')
const router = express.Router()
let {home} = require('../controllers/indexController')

router.get('/', home)

module.exports = router
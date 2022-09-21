let aside= require('../data/aside.json')
let productos = require('../data/productos.json')


module.exports = {
    home : (req,res) => {
        return res.render('index', 
        {
            aside,
            productos
        });
    },
    search: (req,res) => {
        return res.render('search')
    }
}
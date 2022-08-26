let aside= require('../data/aside.json')
let productos = require('../data/productos.json')


module.exports = {
    home : (req,res) => {
        return res.render('index', 
        {
            mensaje: 'Aca estamos aprendiendo controladores',
            aside,
            productos
        });
    }
}
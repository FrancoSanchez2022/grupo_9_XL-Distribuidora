let aside = require('../data/aside.json')
let productos = require('../data/productos.json')
let db = require('../database/models')

module.exports = {
    home: (req, res) => {

        let aside = db.Asides.findAll()
        let productos = db.Productos.findAll({
            include : ['category','marca']
        })
        Promise.all([productos,aside])
        .then(([productos,aside]) => {
            return res.render ('index',
            {
                aside,
                productos
            })
        })
        .catch(error => res.send (error))
    },
    search : (req, res) => {
        return res.render('search')
    }
}
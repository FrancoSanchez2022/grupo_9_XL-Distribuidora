let aside= require('../data/aside.json')
let productos = require('../data/productos.json')

module.exports ={
    detail: (req,res) =>{
        let idParams= +req.params.id;
        let producto= productos.find(producto => {
            return producto.id === idParams
        } ) 
        /* return res.send(productAencontrar) */
        return res.render('productDetail',{ aside, producto} )

    },
    cart: (req,res) =>{
        return res.render('productCart',{aside})

    }
}

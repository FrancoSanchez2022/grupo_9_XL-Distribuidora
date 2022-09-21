let aside= require('../data/aside.json')
let productos = require('../data/productos.json')

module.exports ={
    detail: (req,res) =>{
        let idParams= +req.params.id;
        let producto= productos.find(producto => {
            return producto.id === idParams
        } ) 
        /* return res.send(productAencontrar) */
        return res.render('productDetail',{producto, productos} )

    },
    cart: (req,res) =>{
        return res.render('productCart',{aside})

    },
    list: (req,res) =>{
        return res.render('listProducts',{productos})
    },
    categoria : (req,res) => {
        let categoriaSeleccionada = req.params.categoria
        let categorias = ['Nuestros productos']
        
        productoPorCategoria = products.filter(products => products.categorias === categoriaSeleccionada)

        res.render('products',{
            categorias,
            categoriaSeleccionada,
            productos,
            productsPorCategoria
        })
    },
}

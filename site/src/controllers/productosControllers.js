let aside = [
    {
        imagen:"difusor.webp",
        titulo:"Difusor automatico",
        descripcion:"Aromatizante de ambientes con fragancia bebe",
        precio: "$216.00"
    },
    {
        imagen:"aqua fresh auto sport.jpg",
        titulo:"Aromatizante de auto",
        descripcion:"Aromatizante automatico de autos fragancia acqua",
        precio: "$450.00"
    },
    {
        imagen:"Aromatizante en barra.webp",
        titulo:"Aromatizante en barra",
        descripcion:"Aromatizante con aroma floral",
        precio: "$350.00"
    },
    {
        imagen:"lisoform.jpg",
        titulo:"Lisoform",
        descripcion:"Desinfectante de ambientes aroma lavanda",
        precio: "$221.50"
    },
]
module.exports ={
    detail: (req,res) =>{
        return res.render('productDetail',{aside})

    },
    cart: (req,res) =>{
        return res.render('productCart',{aside})

    }
}

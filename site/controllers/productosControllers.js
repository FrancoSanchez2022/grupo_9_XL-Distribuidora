let aside = [
    {
        imagen:"difusor.webp",
        titulo:"Difusor automatico",
    },
    {
        imagen:"aqua fresh auto sport.jpg",
        titulo:"Aromatizante de auto",
    },
    {
        imagen:"Aromatizante en barra.webp",
        titulo:"Aromatizante en barra"
    },
    {
        imagen:"lisoform.jpg",
        titulo:"Lisoform"
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

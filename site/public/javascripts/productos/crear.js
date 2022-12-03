window.addEventListener("load",()=> {
    let $ = (elemento) => document.querySelector(elemento)
    console.log("vinculadisimo");

    let titulo = $("#titulo")
    let precio= $("#precio")
    let descuento= $("#discount")
    let stock= $("#stock")
    let categotia=$("#floatingSelect")
    let marca=$("#floatingSelectM")
    let descripcion=$("#floatingTextarea")


    titulo.addEventListener( "blur", ()=>{
        console.log("me tocaste")
        
    })
    precio.addEventListener( "blur", ()=>{
        console.log("me tocaste")
    })
    descuento.addEventListener( "blur", ()=>{
        console.log("me tocaste")
    })
    stock.addEventListener( "blur", ()=>{
        console.log("me tocaste")
    })
    categotia.addEventListener( "blur", ()=>{
        console.log("me tocaste")
    })
    marca.addEventListener( "blur", ()=>{
        console.log("me tocaste")
    })
    descripcion.addEventListener( "blur", ()=>{
        console.log("me tocaste")
    })
})
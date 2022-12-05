window.addEventListener("load",()=> {
    
    /* funcion para no aplicar document */
    
    const $ = (elemento) => document.querySelector(elemento)
    /* console.log("vinculadisimo"); */

    const funcValidate= (obj) =>{
        let arr= Object.values(obj)
        console.log(arr);
        if (!arr.includes(false)) {
            btn.disabled= false;
            btn.style.backgroundColor= "#1a78fd"
            } else {
                btn.disabled= true;
                btn.style.backgroundColor= "#545454"
        }
    }




    /* elementos a validar */
    let titulo = $("#tituloI")
    let precio= $("#precio")
    let descuento= $("#discount")
    let stock= $("#stock")
    let categotia=$("#floatingSelect")
    let marca=$("#floatingSelectM")
    let descripcion=$("#floatingTextarea")
    let img= $("#img-preview")


    titulo.addEventListener( "blur", ()=>{
        /* console.log("me tocaste") */
        switch (true) {
            case !this.value:
                $("#tituloError").innerHTML= "debes ingresar el titulo del producto"
                this.classList.add("is-invalid")
                validate.titulo= false
                break;
            case !(this.value.trim().length > 2 && this.value.trim().length < 50 ):
                $("#tituloError").innerHTML = "El titulo del producto debe contener 2 letras minimo y maximo 30"
                this.classList.add("is-invalid")
                validate.titulo= false
                
            default:
                $("#tituloError").innerHTML = null
                this.classList.remove("is-invalid")
                this.classList.add("is-valid")
                validate.titulo= true
                break;
        }
        funcValidate(validate)
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
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
    let titulo = $("#titulo")
    let precio= $("#precio")
    let descuento= $("#discount")
    let stock= $("#stock")
    let categoria=$("#floatingSelect")
    let marca=$("#floatingSelectM")
    let descripcion=$("#floatingTextarea")
    let img= $("#img-preview")


    titulo.addEventListener( "blur", function(){
        console.log("me tocaste")
        switch (true) {
            case titulo.value.trim():
                $("#tituloError").innerHTML = "debes ingresar el titulo del producto"
                titulo.classList.add("is-invalid")
                validate.titulo= false
                break;
            case !(titulo.value.trim().length > 2 && titulo.value.trim().length < 50 ):
                $("#tituloError").innerHTML = "El titulo del producto debe contener 2 letras minimo y maximo 30"
                titulo.classList.add("is-invalid")
                validate.titulo= false
                
            default:
                $("#tituloError").innerHTML = null
                titulo.classList.remove("is-invalid")
                titulo.classList.add("is-valid")
                validate.titulo= true
                break;
        }
        funcValidate(validate)
    }) 
    precio.addEventListener( "blur", function(){
        console.log("me tocaste")
        switch (true) {
            case !precio.value.trim():
                $("#precioError").innerHTML= "Debes ingresar un precio de tu producto"
                precio.classList.add("is-invalid")
                validate.precio= false
                break;
            case !(precio.value.trim().length >= 2 && precio.value.trim().length <= 15):
                $('#precioError').innerHTML= 'El precio del producto debe contener al menos 2 caracteres y como maximo 10'
                precio.classList.add('is-invalid')
                validate.precio= false
        
            default:
                $('#precioError').innerHTML= null
                precio.classList.remove('is-invalid')
                precio.classList.add("is-valid")
                validate.precio= true
                break;
        }
        funcValidate(validate)
    })
    descuento.addEventListener( "blur", function(){
        console.log("me tocaste")
        switch (true) {
            case !(descuento.value.trim().length<=2):
                $('#descError').innerHTML= 'el descuento no debe ser mayor a dos cifras'
                descuento.classList.add('is-invalid')
                validate.descuento= false
                
                break;
        
            default:
                $('#descError').innerHTML= null
                descuento.classList.remove('is-invalid')
                descuento.classList.add('is-valid')
                validate.descuento= true
                break;
        }
        funcValidate(validate)
    })
    stock.addEventListener( "blur", function(){
        console.log("me tocaste")
        switch (true) {
            case !stock.value.trim():
                $('#stockError').innerHTML= 'debes ingresar el stock de tu producto'
                stock.classList.add('is-invalid')
                validate.stock= false
                
                break;
            case !regExNumber.test(stock.value.trim()):
                $('#stockError').innerHTML= 'debes ingresar un numero menor a 100'
                stock.classList.add('is-invalid')
                validate.stock= false

            case!(stock.value.trim().length>=1 && stock.value.trim().length <= 16):
                $('#stockError').innerHTML= 'el stock del producto debe contener al menos 1 caracter y como maximo 10'
                stock.classList.add('is-invalid')
                validate.stock= false
        
            default:
                $('#stockError').innerHTML= null
                stock.classList.remove('is-invalid')
                stock.classList.add('is-valid')
                validate.stock= true
                break;
        }
        funcValidate(validate)
    })
    categoria.addEventListener( "blur", function(){
        console.log("me tocaste")
        switch (true) {
            case !categoria.value.trim():
                $('#categoriaError').innerHTML= 'debes ingresar una categoria'
                categoria.classList.add('is-invalid')
                validate.categoria= false
                
                break;
        
            default:
                $('#categoriaError').innerHTML= null
                categoria.classList.remove('is-invalid')
                categoria.classList.add('is-valid')
                validate.categoria= true

                break;
        }
        funcValidate(validate)
    })
    marca.addEventListener( "blur", function(){
        console.log("me tocaste")
        switch (true) {
            case !marca.value.trim():
                $('#marcaError').innerHTML ='debes ingresar una marca'
                marca.classList.add('is-invalid')
                validate.marca=false
                
                break;
        
            default:
                $('#marcaError').innerHTML =null
                marca.classList.remove('is-invalid')
                marca.classList.add('is-valid')
                validate.marca=false
                break;
        }
    })
    descripcion.addEventListener( "blur", function(){
        console.log("me tocaste")
        switch (true) {
            case !descripcion.value.trim():
                $('#descripcionError').innerHTML= 'debes ingresar una descripcion del producto'
                descripcion.classList.add('is-invalid')
                validate.descripcion= false
                
                break;
            case !(descripcion.value.trim().length>= 10 && descripcion.value.trim().length <= 300):
                $('#descripcionError').innerHTML= 'la descripcion del producto debe tener minimo 10 caracteres y maximo 300'
                descripcion.classList.add('is-invalid')
                validate.descripcion= false
                break;
            
            
               
               
            default:
                $('#descripcionError').innerHTML= null
                descripcion.classList.remove('is-invalid')
                descripcion.classList.add('is-valid')
                validate.descripcion= true
                break;
        }
        funcValidate(validate)
    })
    img.addEventListener('change',function(){
        console.log('me tocaste');
        switch (true) {
            case !regExExt.exec(img.value):
                $('#imgError').innerHTML= 'solo se puede ingresar una imagen valida formato (jpg|jpeg|png|jfif|gif|webp)'
                validate.img= false
                
                break;
                
        
            default:
                $('#imgError').innerHTML= null
                validate.img= true
                break;
        }
        funcValidate(validate)
    })

    /* validaciones */
    const validate={
        titulo:false,
        precio:false,
        descuento: true,
        stock: false,
        categorias: false,
        marcas: false,
        descripcion: false,
        img: true

    }
})
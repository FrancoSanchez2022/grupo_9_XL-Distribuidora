window.addEventListener('load', () => {

    let $ = (elemento) => document.querySelector(elemento)
    console.log("Login vinculado correctamente");

    const regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

    let email = $('#email')
    let password = $('#pass')

    let errores = [{
        id: 1,
        elemento:"nombre",
        mensaje: null
    },{
        id: 2,
        elemento:"pass",
        mensaje: null
    }]

    email.addEventListener('blur',() => {
        let error = {
            id: 1,
            elemento:"email",
            mensaje: "Debe ingresar su email"
        }
        let variable = true
        switch (true) {
            case !email.value:
                $('#emailContainer').innerHTML = "Debe ingresar su email"
                email.style.border = "2px solid red"
                errores.forEach(e => {
                    if(e.id === 3 ){
                        e.mensaje = "Debe ingresar su email"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case !regExEmail.test(email.value):
                $('#emailContainer').innerHTML = "Debe ingresar un email valido"
                email.style.border = "2px solid red"
                errores.forEach(e => {
                    if(e.id === 1 ){
                        e.mensaje = "Debe ingresar un email valido"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#emailContainer').innerHTML = ""
                email.style.border = "2px solid black"
                errores = errores.filter(error => {
                    return error.id !== 1
                })
                break;
        }
        console.log(errores);
    })
   
    password.addEventListener('blur',() => {
        let error = {
            id: 2,
            elemento:"pass",
            mensaje: "Debe ingresar su clave"
        }
        let variable = true
        switch (true) {
            case !password.value:
                $('#passContainer').innerHTML = "Debe ingresar su clave"
                password.style.border = "2px solid red"
                errores.forEach(e => {
                    if(e.id === 2 ){
                        e.mensaje = "Debe ingresar su clave"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#passContainer').innerHTML = ""
                password.style.border = "2px solid black"
                errores = errores.filter(error => {
                    return error.id !== 2
                })
                break;
        }
    })


})
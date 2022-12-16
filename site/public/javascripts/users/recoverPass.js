window.addEventListener('load', () => {

    let $ = (elemento) => document.querySelector(elemento)
    console.log("recoverPassword vinculado correctamente");

    const regExLetter = /^[a-zA-Z\u00C0-\u017F]+$/;
    const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

    let form = $('#formulario')
    let inputPass = $('#pass')
    let inputPass2 = $('#pass2')

    /* Validaciones */
    let errores = [{
        id: 1,
        elemento:"inputPass",
        mensaje: null
    },{
        id: 2,
        elemento:"inputPass2",
        mensaje: null
    }]


inputPass.addEventListener('keyup', () => {
    let error = {
        id: 5,
        elemento: "inputPass",
        mensaje: "La clave es obligatoria"
    }
    let variable = true
    switch (true) {
        case !inputPass.value:
            $('#passContainer').innerHTML = "La clave es obligatoria"
            inputPass.style.border = "2px solid red"
            errores.forEach(e => {
                if (e.id === 5) {
                    e.mensaje = "La clave es obligatoria"
                    variable = false
                }
            });
            if (variable) {
                errores.push(error)
            }
            break;
        case !regExPass.test(inputPass.value):
            $('#passContainer').innerHTML = "La clave debe contener entre 8 y 12 caracteres, debe contener una mayúscula, una minúscula y un número"
            inputPass.style.border = "2px solid red"
            errores.forEach(e => {
                if (e.id === 5) {
                    e.mensaje = "La clave debe contener entre 8 y 12 caracteres, debe contener una mayúscula, una minúscula y un número"
                    variable = false
                }
            });
            if (variable) {
                errores.push(error)
            }
            break;
        default:
            $('#passContainer').innerHTML = ""
            inputPass.style.border = "2px solid green"
            errores = errores.filter(error => {
                return error.id !== 5
            })
            break;
    }
})
inputPass2.addEventListener('keyup', () => {
    let error = {
        id: 6,
        elemento: "inputPass2",
        mensaje: "Debe confirmar su clave"
    }
    let variable = true

    switch (true) {
        case !inputPass2.value:
            $('#passContainer2').innerHTML = "Debe confirmar su clave"
            inputPass2.style.border = "2px solid red"
            error.mensaje = "Debe confirmar su clave"
            errores.forEach(e => {
                if (e.id === 6) {
                    variable = false
                }
            });
            if (variable) {
                errores.push(error)
            }

            break;
        case inputPass2.value != inputPass.value:
            $('#passContainer2').innerHTML = "Las claves no coinciden"
            error.mensaje = "Las claves no coinciden"
            inputPass2.style.border = "2px solid red"
            errores.forEach(e => {
                if (e.id === 6) {
                    variable = false
                }
            });

            if (variable) {
                errores.push(error)
            }

            break;
        default:
            $('#passContainer2').innerHTML = ""
            inputPass2.style.border = "2px solid green"
            errores = errores.filter(error => {
                return error.id !== 6
            })
            break;
    }
})

form.addEventListener('submit',(e) => {
    e.preventDefault();

    console.log(form.elements);
    if(errores.length > 0){
        form.submit()
    }
})
})
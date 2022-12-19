window.addEventListener('load', () => {

    let $ = (elemento) => document.querySelector(elemento)
    console.log("Register vinculado correctamente");

    const regExLetter = /^[a-zA-Z\u00C0-\u017F]+$/;
    const regExPass = /^(?=.*\d)(?=.*[a-z]).{8,16}$/;
    const regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
    const regExPhonenumber = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/

    
    let form = $('#formulario')
    let nombre = $('#name')
    let apellido = $('#lastname')
    let email = $('#email')
    let phone = $('#phone')
    let inputPass = $('#pass')
    let inputPass2 = $('#pass2')

    /* const fv = FormValidation.formValidation(form, {
        fields: {
            fullName: {
                validators: {
                    notEmpty: {
                        message: 'The full name is required',
                    },
                },
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'The phone number is required',
                    },
                },
            },
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            submitButton: new FormValidation.plugins.SubmitButton(),
            bootstrap5: new FormValidation.plugins.Bootstrap5(),
            icon: new FormValidation.plugins.Icon({
                valid: 'fa fa-check',
                invalid: 'fa fa-times',
                validating: 'fa fa-refresh',
            }),
            internationalTelephoneInput: new FormValidation.plugins.InternationalTelephoneInput({
                field: 'phone,otherPhone',
                message: 'The phone number is not valid',
                utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.18/js/utils.js',
            }),
        },
    }); */

    /* Validaciones */
    let errores = [{
        id: 1,
        elemento:"nombre",
        mensaje: null
    },{
        id: 2,
        elemento:"apellido",
        mensaje: null
    },{
        id: 3,
        elemento:"email",
        mensaje: null
    },{
    },{
        id: 4,
        elemento:"phone",
        mensaje: null
    },{
        id: 5,
        elemento:"inputPass",
        mensaje: null
    },{
        id: 6,
        elemento:"inputPass2",
        mensaje: null
    }]


    nombre.addEventListener('keyup',() => {
        let error = {
            id: 1,
            elemento:"nombre",
            mensaje: "El Nombre es obligatorio"
        }
        let variable = true
        switch (true) {
            case !nombre.value:
                $('#nameContainer').innerHTML = "El Nombre es obligatorio"
                nombre.style.border = "2px solid red"
                errores.forEach(e => {
                    if(e.id === 1 ){
                        e.mensaje = "El Nombre es obligatorio"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case !regExLetter.test(nombre.value):
                $('#nameContainer').innerHTML = "El nombre no puede contener números ni caracteres especiales"
                nombre.style.border = "2px solid red"

                errores.forEach(e => {
                    if(e.id === 1 ){
                        e.mensaje = "El nombre no puede contener números ni caracteres especiales"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#nameContainer').innerHTML = ""
                nombre.style.border = "2px solid green"
                errores = errores.filter(error => {
                    return error.id !== 1
                })
                break;
        }
        console.log(errores);
    })
    apellido.addEventListener('keyup',() => {
        let error = {
            id: 2,
            elemento:"apellido",
            mensaje: "Falta el apellido"
        }
        let variable = true
        switch (true) {
            case !apellido.value:
                $('#lastnameContainer').innerHTML = "El apellido es obligatorio"
                apellido.style.border = "2px solid red"
                errores.forEach(e => {
                    if(e.id === 2 ){
                        e.mensaje = "El apellido es obligatorio"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case !regExLetter.test(apellido.value):
                $('#lastnameContainer').innerHTML = "El apellido no puede contener números ni caracteres especiales"
                apellido.style.border = "2px solid red"
                errores.forEach(e => {
                    if(e.id === 2 ){
                        e.mensaje = "El apellido no puede contener números ni caracteres especiales"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#lastnameContainer').innerHTML = ""
                apellido.style.border = "2px solid green"
                errores = errores.filter(error => {
                    return error.id !== 2
                })
                break;
        }
    })
    email.addEventListener('blur',() => {
        let error = {
            id: 3,
            elemento:"email",
            mensaje: "El campo Email es obligatorio"
        }
        let variable = true
        switch (true) {
            case !email.value:
                $('#emailContainer').innerHTML = "El campo Email es obligatorio"
                email.style.border = "2px solid red"
                errores.forEach(e => {
                    if(e.id === 3 ){
                        e.mensaje = "El campo Email es obligatorio"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case !regExEmail.test(email.value):
                $('#emailContainer').innerHTML = "El email no coincide con un email valido"
                email.style.border = "2px solid red"
                errores.forEach(e => {
                    if(e.id === 3 ){
                        e.mensaje = "El email no coincide con un email valido"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#emailContainer').innerHTML = ""
                email.style.border = "2px solid green"
                errores = errores.filter(error => {
                    return error.id !== 3
                })
                break;
        }
        console.log(errores);
    })
    phone.addEventListener('blur',() => {
        let error = {
            id: 4,
            elemento:"phone",
            mensaje: "El número de teléfono es obligatorio"
        }
        let variable = true
        switch (true) {
            case !phone.value:
                $('#phonenumberContainer').innerHTML = "El número de teléfono es obligatorio"
                phone.style.border = "2px solid red"
                errores.forEach(e => {
                    if(e.id === 4 ){
                        e.mensaje = "El número de teléfono es obligatorio"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case !regExPhonenumber.test(phone.value):
                $('#phonenumberContainer').innerHTML = "El número de teléfono no es valido"
                phone.style.border = "2px solid red"
                errores.forEach(e => {
                    if(e.id === 4 ){
                        e.mensaje = "El número de teléfono no es valido"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#phonenumberContainer').innerHTML = ""
                phone.style.border = "2px solid green"
                errores = errores.filter(error => {
                    return error.id !== 4
                })
                break;
        }
    })
   
    inputPass.addEventListener('keyup',() => {
        let error = {
            id: 5,
            elemento:"inputPass",
            mensaje: "La clave es obligatoria"
        }
        let variable = true
        switch (true) {
            case !inputPass.value:
                $('#passContainer').innerHTML = "La clave es obligatoria"
                inputPass.style.border = "2px solid red"
                errores.forEach(e => {
                    if(e.id === 5 ){
                        e.mensaje = "La clave es obligatoria"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case !regExPass.test(inputPass.value):
                $('#passContainer').innerHTML = "La clave debe contener entre 8 y 16 caracteres, debe contener letras y números"
                inputPass.style.border = "2px solid red"
                errores.forEach(e => {
                    if(e.id === 5 ){
                        e.mensaje = "La clave debe contener entre 8 y 16 caracteres, debe contener letras y números"
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
    inputPass2.addEventListener('keyup',() => {
        let error = {
            id: 6,
            elemento:"inputPass2",
            mensaje: "Debe confirmar su clave"
        }
        let variable = true
        
        switch (true) {
            case !inputPass2.value:
                $('#passContainer2').innerHTML = "Debe confirmar su clave"
                inputPass2.style.border = "2px solid red"
                error.mensaje = "Debe confirmar su clave"
                errores.forEach(e => {
                    if(e.id === 6 ){
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
                    if(e.id === 6 ){
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
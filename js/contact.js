'use strict';
$(()=>actions());

function actions() {
    checkUserLoggedIn();
    changeWebTheme();
    validation();
}

/**
 * Función que valida un formulario
 */
function validation(){
    /*Para poder usar un validación personalizada como una regex agregamos el resultado de
    esa función al validador*/
    $.validator.addMethod("custom_name", (value, element)=> {
        return checkName(value);
    });  
    $.validator.addMethod("custom_surname", (value, element)=> {
        return checkSurname(value);
    });
    $('form').first().validate({
        //Sólo funciona con input type="submit". Envía el formulario cuando no hay errores
        submitHandler:()=>alert('Datos enviados'),
        rules:{
            namee:{
                //Llamará a la función "custom_name"
                custom_name:true
            },
            surname:{
                custom_surname:true
            },
            emaill:{
                required:true,
                email:true
            },
            age:{
                number:true,
                min:18
            }
        },
        messages:{
            namee:{
                custom_name:'El nombre no debe tener números'
            },
            surname:{
                custom_surname:'Los apellidos no deben tener números'
            },
            emaill:{
                required:'El email es obligatorio',
                email:'Email incorrecto'
            },
            age:{
                number:'La edad debe ser un número',
                min:'La edad mínima es 18'
            }
        }
    });
}

/**
 * Función que comprueba los apellidos
 * @param name
 * @return
 */
function checkSurname(surname) {
    if (surname.match(/^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]*$/)) return true;
    return false;
}


'use strict';
$(() => actions());

function actions() {
    getPosts();
    changeWebTheme();
    checkUserLoggedIn();
}

/**
 * Función que obtiene los posts
 */
function getPosts() {
    $.ajax(
        {
            url: `js/posts.json`,
            //El tipo de datos de la respuesta
            dataType: 'json',
            success: posts => {
                if (posts) {
                    let main = $('main');
                    //Establecemos el idioma
                    moment.locale('es');
                    for (let post of posts) {
                        post.createdAt = moment().calendar();
                        main.append(
                            `<article>
                                    <h1>${post.title}</h1>
                                    <small class="text-secondary">Publicado ${post.createdAt}</small>
                                    <p>${post.content}</p>
                                    <input type="button" value="Leer más" class="btn btn-success">
                                </article><br>`
                        );
                    }
                }
            },
            error: err => {
                console.log(err);
            }
        }
    );
}

/**
 * Función que cambia el tema de la web
 */
function changeWebTheme() {
    //Cuando cargue el sitio web cargará la imagen que seleccionó
    if (localStorage.hasOwnProperty('webTheme')) {
        $('body').css('background-image', `url(../assets/img/${localStorage.getItem('webTheme')})`);
        $('body').css('background-attachment', 'fixed');
    }
    let themeWebSelector = $('#themeWebSelector div');
    for (let selector of themeWebSelector) {
        $(selector).click(evt => {
            let image = '';
            switch (evt.target.className) {
                case 'bg-primary': image = 'cielo.jpg'; break;
                case 'bg-success': image = 'hojas.jpg'; break;
                default: image = 'rojo.jpg';
            }
            $('body').css('background-image', `url(../assets/img/${image})`);
            $('body').css('background-attachment', 'fixed');
            localStorage.setItem('webTheme', image);
        });
    }
}

/**
 * Función que comprueba si el usuario está logueado
 */
function checkUserLoggedIn() {
    let userNameSpan = $('#userNameSpan');
    let userProfile = $('#userProfile');
    let form = $('form').last();
    if (localStorage.hasOwnProperty('user')) {
        //Asignamos el nombre del usuario identificado al span
        userNameSpan.text(JSON.parse(localStorage.getItem('user')).name);
        userProfile.attr('src', '../assets/img/caracol.jpg');
        //Ocultamos el formulario
        form.hide();
        logout();
    } else {
        userNameSpan.text('¿Quién soy?');
        userProfile.attr('src', '../assets/img/sinFotoPerfil.png');
        form.show();
        $('#divLogout').hide();
        login();
    }
}

/**
 * Función que inicia sesión
 */
function login() {
    $('#iniciarSesion').click(() => {
        let name = $('#name').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let formError = $('#formError').last();
        if (checkEmail(email) && checkName(name) && password) {
            localStorage.setItem('user', JSON.stringify({ email: email, name: name }));
            location.reload();
        } else {
            formError.text('Datos incorrectos');
        }
    });
}

/**
 * Función que cierra sesión
 */
function logout() {
    $('#divLogout').show();
    $('#cerrarSesion').click(() => {
        localStorage.removeItem('user');
        location.reload();
    });
}

/**
 * Función que comprueba el nombre
 * @param name
 * @return
 */
function checkName(name) {
    if (name.match(/^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]*$/)) return true;
    return false;
}

/**
 * Función que comprueba el email
 * @param email 
 * @return
 */
function checkEmail(email) {
    if (email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i))
        return true;
    return false;
}


'use strict';
$(()=>actions());

function actions() {
    checkUserLoggedIn();
    changeWebTheme();
    clock();
}

/**
 * Función que hace un reloj
 */
function clock() {
    //Actualiza el reloj
    setInterval(() => {
        let clock=moment().format('HH:mm:ss');
        $('#clock').html(clock);
    }, 1000);
}
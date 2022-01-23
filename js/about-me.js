'use strict';
$(()=>actions());

function actions() {
    checkUserLoggedIn();
    changeWebTheme();
    accordion();
}

/**
 * Función que hace un acordeón
 */
function accordion() {
    $('#accordion').accordion({
        collapsible:true
    });
}

function alerta_si_esta_vacio(){
    var nombre;
    nombre=document.getElementById("nombre").value;
    if(nombre===""){
        alert("El nombre no puede estar vacío, ingrese un nombre válido.");
    }
    else{
        window.open("pantalla_juego.html");
    }

}

function cargarWeb(){
    url_pagina_siguiente="pantalla_juego.html#" + nombre;

    window.open(url_pagina_siguiente);
}
function cargar_resultado(){
    var url_pagina, nombre;

    url_pagina=window.location.href.split("/")[5];

}
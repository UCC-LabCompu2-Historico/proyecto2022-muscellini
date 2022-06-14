
function alerta_si_esta_vacio(){
    var nombre,url;
    nombre=document.getElementById("nombre").value;
    url="pantalla_juego.html#"+nombre;
    if(nombre===""){
        alert("El nombre no puede estar vacío, ingrese un nombre válido.");
    }
    else{
        window.open(url);
    }
}

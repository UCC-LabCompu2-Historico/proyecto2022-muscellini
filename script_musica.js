var ultima_cancion=null;
var seleccion=null;
var lista_de_reproduccion=["musica/Juggernog.mp3", "musica/Quick_revive.mp3"];
//var reproductor = document.getElementById("audio");
document.getElementById("audio").autoplay=true;
document.getElementById("audio").addEventListener('ended', seleccion_aleatoria);
function seleccion_aleatoria(){
    while (seleccion==ultima_cancion){
        seleccion= Math.floor(Math.random() * lista_de_reproduccion.length);
    }
    ultima_cancion=seleccion;
    document.getElementById("audio").src=lista_de_reproduccion[seleccion];
}
seleccion_aleatoria();
document.getElementById("audio").play();

/*
    Esta función chequea que el campo donde se ingresa el nombre no esté vacío.
    En caso de que lo esté, arroja una alerta.
    Si no está vacío, procede a guardar el nombre ingresado.
*/
function alerta_si_esta_vacio(){
    var nombre,url;
    nombre=document.getElementById("nombre").value;
    url="pantalla_juego.html"
    if(nombre===""){
        alert("El nombre no puede estar vacío, ingrese un nombre válido.");
    }
    else{
        window.open(url,"_self");
        localStorage.setItem('nombre_jugador', nombre);
    }
}
/*
    Declaración general de variables.
 */
let puntaje;
let puntaje_maximo;
let sistema_de_salto;
let velocidad_de_pantalla;
let jugador;
let controles={};
let obstaculos = [];
let texto_para_mostrar_puntaje;
let texto_para_mostrar_puntaje_maximo;
let texto_para_mostrar_nombre;
let mostrar_nombre = localStorage['nombre_jugador'];

/*
    Event listeners para teclas presionadas. De acuerdo a lo presionado, se ejecuta cierta acción.
 */
document.addEventListener('keypress', function (evento){
    controles[evento.code]= true;
});
document.addEventListener('keyup', function (evento){
    controles[evento.code] = false;
});


const canvas = document.getElementById('juego');
const contexto_de_canvas = canvas.getContext('2d');

/*
    Declaración de clase del jugador. Con ella se creará un objeto que representa al jugador en el canvas.
 */
class Jugador_Principal{
    constructor(x,y,ancho,alto,color) {
        this.x=x;
        this.y=y;
        this.ancho=ancho;
        this.alto=alto;
        this.color=color;

        this.velocidad_en_eje_y=0;
        this.altura_de_salto=20;
        this.altura_original=alto;
        this.esta_en_el_suelo=false;
    }
    /*
        Función que dibuja al objeto en el canvas. En este caso se ha elegido un rectángulo.
     */
    Dibujo (){
        contexto_de_canvas.beginPath();
        contexto_de_canvas.fillStyle = this.color;
        contexto_de_canvas.fillRect(this.x,this.y,this.ancho,this.alto);
        contexto_de_canvas.closePath();
    }

    /*
       Comportamiento del objeto en el canvas.
    */
    Animacion(){

        if(controles['Space'] || controles['KeyW']){
            console.log('salto_ejecutado');
            this.Salto();
        }
        if(controles['KeyS']){
            this.alto=this.altura_original/2;
        }
        else
        {
            this.alto=this.altura_original;
        }
        this.y+=this.velocidad_en_eje_y;

        if(this.y + this.alto<canvas.height)
        {
            this.velocidad_en_eje_y+=sistema_de_salto;
            this.esta_en_el_suelo=false;
        }
        else{
            this.velocidad_en_eje_y=0;
            this.esta_en_el_suelo=true;
            this.y= canvas.height-this.alto;
        }

        this.Dibujo();

    }

    Salto(){
        if(this.esta_en_el_suelo)
        {
            this.velocidad_en_eje_y = -this.altura_de_salto;
        }
    }
}

/*
    Declaración de clase utilizada para generar obstaculos.
 */

class Obstaculos{
    constructor(x,y,ancho,altura,color) {
        this.x=x;
        this.y=y;
        this.ancho=ancho;
        this.altura=altura;
        this.color=color;

        this.velocidad_en_eje_x = -velocidad_de_pantalla;
    }

    /*
        Función de dibujo de los obstaculos.
     */
    Dibujar (){
        contexto_de_canvas.beginPath();
        contexto_de_canvas.fillStyle = this.color;
        contexto_de_canvas.fillRect(this.x,this.y,this.ancho,this.altura);
        contexto_de_canvas.closePath();
    }

    Actualizar_Estado(){
        this.x+=this.velocidad_en_eje_x;
        this.Dibujar();
        this.velocidad_en_eje_x= -velocidad_de_pantalla;
    }
}

/*
    Declaración de clase texto que es usada para mostrar el texto en pantalla.
 */

class Texto{
    constructor(texto,x,y,alineacion,color,dimensiones) {
        this.texto=texto;
        this.x=x;
        this.y=y;
        this.alineacion=alineacion;
        this.color=color;
        this.dimensiones=dimensiones;
    }
    /*
            Función de dibujo de texto.
    */
    Dibujar(){
        contexto_de_canvas.beginPath();
        contexto_de_canvas.fillStyle=this.color;
        contexto_de_canvas.font=this.dimensiones+"px sans-serif";
        contexto_de_canvas.textAlign=this.alineacion;
        contexto_de_canvas.fillText(this.texto,this.x,this.y);
        contexto_de_canvas.closePath();
    }
}

/*
    Función que permite aparecer obstaculos en el canvas. Estos objetos son agregados al arreglo llamado obstaculos.
 */
function Crear_Obstaculos(){
    let ancho_del_obstaculo= generar_entero_aleatorio(20,70);
    let altura_del_obstaculo=generar_entero_aleatorio(75,125);
    let tipo_de_obstaculo = generar_entero_aleatorio(0,1);
    let obstaculo=new Obstaculos(canvas.width + ancho_del_obstaculo, canvas.height - altura_del_obstaculo,ancho_del_obstaculo,altura_del_obstaculo,'#FFFFFF');

    if(tipo_de_obstaculo==1){
        obstaculo.y -= jugador.altura_original - 10;
    }

    obstaculos.push(obstaculo);
}

function generar_entero_aleatorio(minimo,maximo){
    return Math.round(Math.random()*(maximo-minimo)+minimo);
}


/*
    Función que realiza el dibujo incial en el canvas.
 */
function Comenzar(){
    canvas.width=1000;
    canvas.height=600;

    contexto_de_canvas.font = "20px sans-serif";

    sistema_de_salto = 1;
    velocidad_de_pantalla = 3;

    puntaje = 0;
    puntaje_maximo = 0;
    if(localStorage.getItem('Puntaje_Maximo')){
        puntaje_maximo=localStorage.getItem('Puntaje_Maximo');
    }

    jugador = new Jugador_Principal(25,0, 50,50, '#FFCC01');
    texto_para_mostrar_puntaje= new Texto("Puntaje: "+puntaje,400,40,"centro","#FFFFFF","20");
    texto_para_mostrar_puntaje_maximo=new Texto("Puntaje maximo: "+puntaje_maximo, 650,40,"derecha","#FFFFFF", "20");
    texto_para_mostrar_nombre = new Texto("Nombre: "+ mostrar_nombre,150,40,"izquierda","#FFFFFF", "20");
    requestAnimationFrame(Actualizar_Canvas);
}

let temporizador_de_creacion_de_obstaculos_inicial=200;
let temporizador_de_creacion_de_obstaculos=temporizador_de_creacion_de_obstaculos_inicial;

/*
    Función que permite el funcionamiento del juego.
    Se crean obstaculos a partir de un temporizador. Estos se van eliminando a medida que avanza el juego para no sobreexplotar recursos.
 */
function Actualizar_Canvas(){
    requestAnimationFrame(Actualizar_Canvas);

    contexto_de_canvas.clearRect(0,0,canvas.width,canvas.height);
    temporizador_de_creacion_de_obstaculos--;
    if(temporizador_de_creacion_de_obstaculos <= 0){
        Crear_Obstaculos();
        console.log(obstaculos);
        temporizador_de_creacion_de_obstaculos=temporizador_de_creacion_de_obstaculos_inicial - velocidad_de_pantalla * 8;

        if(temporizador_de_creacion_de_obstaculos<60){
            temporizador_de_creacion_de_obstaculos = 60;
        }
    }

    for(let i=0;i<obstaculos.length;i++){
        let o = obstaculos[i];

        if(o.x + o.ancho<0){
            obstaculos.splice(i,1);
        }

        /*
            Este if detalla lo que sucede si el jugador colisiona con un objeto. El juego vuelve al inicio.
         */
        if(jugador.x < (o.x + o.ancho) && (jugador.x + jugador.ancho)>o.x && jugador.y < (o.y+o.altura) && (jugador.y + jugador.alto) > o.y){
            obstaculos =[];
            puntaje=0;
            temporizador_de_creacion_de_obstaculos=temporizador_de_creacion_de_obstaculos_inicial;
            velocidad_de_pantalla=3;
            window.localStorage.setItem('Puntaje_Maximo', puntaje_maximo);
        }
        o.Actualizar_Estado();
    }
    jugador.Animacion();
    puntaje++;
    texto_para_mostrar_puntaje.texto= "Puntaje: " + puntaje;
    texto_para_mostrar_puntaje.Dibujar();
    texto_para_mostrar_nombre.Dibujar();
    if(puntaje>puntaje_maximo){
        puntaje_maximo=puntaje;
        texto_para_mostrar_puntaje_maximo.texto ="Puntaje maximo: " + puntaje_maximo;
    }
    texto_para_mostrar_puntaje_maximo.Dibujar();
    velocidad_de_pantalla += 0.003;
}

Comenzar();
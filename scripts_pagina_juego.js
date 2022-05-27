
let puntaje;
let puntaje_maximo;
let sistema_de_salto;
let velocidad_de_pantalla;
let jugador;
let controles={};
let obstaculos = [];

document.addEventListener('keypress', function (evento){
    controles[evento.code]= true;
});

document.addEventListener('keyup', function (evento){
    controles[evento.code] = false;
});
const canvas = document.getElementById('juego');
const ctx = canvas.getContext('2d');

class Jugador_Principal{
    constructor(x,y,ancho,alto,color) {
        this.x=x;
        this.y=y;
        this.ancho=ancho;
        this.alto=alto;
        this.color=color;

        this.velocidad_en_eje_y=0;
        this.altura_de_salto=25;
        this.altura_original=alto;
        this.esta_en_el_suelo=false;
        this.temporizador_de_saltos=0;
    }

    Dibujo (){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.ancho,this.alto);
        ctx.closePath();
    }

    Animacion(){

        if(controles['Space'] || controles['KeyW']){
            console.log('salto_ejecutado');
            this.Salto();
        }
        else{
            this.temporizador_de_saltos=0;
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
        if(this.esta_en_el_suelo && this.temporizador_de_saltos==0)
        {
            this.temporizador_de_saltos=1;
            this.velocidad_en_eje_y = -this.altura_de_salto;
        }
        else if(this.temporizador_de_saltos>0 && this.temporizador_de_saltos<15){
            this.temporizador_de_saltos++;
            this.altura_de_salto= -this.altura_de_salto-(this.temporizador_de_saltos/50);
        }
    }
}

class Obstaculos{
    constructor(x,y,ancho,altura,color) {
        this.x=x;
        this.y=y;
        this.ancho=ancho;
        this.altura=altura;
        this.color=color;

        this.velocidad_en_eje_x = -velocidad_de_pantalla;
    }
    Dibujar (){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.ancho,this.altura);
        ctx.closePath();
    }



    Actualizar_Estado(){
        this.x+=this.velocidad_en_eje_x;
        this.Dibujar();
        this.velocidad_en_eje_x= -velocidad_de_pantalla;
    }
}

function Crear_Obstaculos(){
     let tamano_del_obstaculo= generar_entero_aleatorio(20,70);
     let tipo_de_obstaculo = generar_entero_aleatorio(0,1);
     let obstaculo=new Obstaculos(canvas.width + tamano_del_obstaculo, canvas.height - tamano_del_obstaculo,tamano_del_obstaculo,tamano_del_obstaculo,'#2484E4');

     if(tipo_de_obstaculo==1){
         obstaculo.y -= jugador.altura_original - 10;
     }

     obstaculos.push(obstaculo);
}

function generar_entero_aleatorio(minimo,maximo){
    return Math.round(Math.random()*(maximo-minimo)+minimo);
}
function Comenzar(){
    canvas.width=800;
    canvas.height=600;

    ctx.font = "20px sans-serif";

    sistema_de_salto = 1;
    velocidad_de_pantalla = 3;

    puntaje = 0;
    puntaje_maximo = 0;

    jugador = new Jugador_Principal(25,0, 50,50, '#FF5858');
    requestAnimationFrame(Actualizar_Canvas);
}

let temporizador_de_creacion_de_obstaculos_inicial=200;
let temporizador_de_creacion_de_obstaculos=temporizador_de_creacion_de_obstaculos_inicial;

function Actualizar_Canvas(){
    requestAnimationFrame(Actualizar_Canvas);

    ctx.clearRect(0,0,canvas.width,canvas.height);
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
        o.Actualizar_Estado();
    }
    jugador.Animacion();
    puntaje++;
    velocidad_de_pantalla += 0.003;
}

Comenzar();
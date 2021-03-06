const frameTime     = 33;

// Lienzos
var lienzo1 = document.getElementById("lienzo1");
var contexto1 = lienzo1.getContext("2d");
var lienzoCoche = document.getElementById("lienzoCoche");
var contextoCoche = lienzoCoche.getContext("2d");
var lienzoPerro = document.getElementById("lienzoPerro");
var contextoPerro = lienzoPerro.getContext("2d");
var lienzoPlanta = document.getElementById("lienzoPlanta");
var contextoPlanta = lienzoPlanta.getContext("2d");
var lienzoPajaro = document.getElementById("lienzoPajaro");
var contextoPajaro = lienzoPajaro.getContext("2d");
var lienzoPeces = document.getElementById("lienzoPeces");
var contextoPeces = lienzoPeces.getContext("2d");
//var lienzoFinal = document.getElementById("lienzoFinal");
//var contextoFinal =  lienzoFinal.getContext("2d");
//----------------------------------------------------------+ POLICIA
var lienzoCochePolicias = document.getElementById("lienzoCochePolicias");
var contextoCochePolicias = lienzoCochePolicias.getContext("2d"); 
var lienzoFinalPolicias = document.getElementById("lienzoFinalPolicias");        
var contextoFinalPolicias =  lienzoFinalPolicias.getContext("2d");
var lienzoUIPolicias = document.getElementById("lienzoUIPolicias");        
var contextoUIPolicias =  lienzoUIPolicias.getContext("2d");

var cochePolicia1;
var cochePolicia = new Image();
cochePolicia.src = "img/cochePolicia2.png";
var mapaFinalPolicias = new Mapa(anchuraMapa, alturaMapa, "img/mapaFinalPolicias.png");
var mapaCochePolicias = new Image();
mapaCochePolicias.src = "img/ciudadcochePolicias.png";
//------------------------------------------------------------------+



var temporizador;
var gameOver = false;
var puedesIniciar = 0;

// Mapas dibujados
var anchuraMapa = 7552;
var alturaMapa = 4224;

var mapaBonito = new Mapa(anchuraMapa, alturaMapa, "img/ciudad.png");

var mapaCoche = new Mapa(anchuraMapa, alturaMapa, "img/ciudadcoche3.png");

var mapaPlanta = new Image();
mapaPlanta.src = "img/mapaPlantas.jpg";
var mapaPajaro = new Image();
mapaPajaro.src = "img/ciudadpajaro.png";

var mapaPeces = new Mapa(anchuraMapa, alturaMapa, "img/ciudadpeces.png");

// Variable global cámara
var camara;

//---------------------------------------+ PERROS
 mapaPerro = new Mapa(anchuraMapa, alturaMapa, "img/ciudadperro.png");
//Imagen de los perros
var imagenperro = new Image();
imagenperro.src = "img/perro.png";
var numeroPerros = 100;
var perro = new Array();
//Meos
var imagenMeo = new Image();
imagenMeo.src = "img/meo.png";
var tiempoSinMeos = 0;
var caducidadDelMeo = 0;
var numeroMeos = 0;
var perroMeos  = new Array();
//---------------------------------------+ 
//---------------------------------------+ ARDILLAS
var imagenardilla = new Image();
imagenardilla.src = "img/ardilla.png";
var numeroArdillas = 100;
var ardilla = new Array();
var cuentaVelocidad;

//---------------------------------------+ COCHE PROTAGONISTA
var cocheProtagonista;
// Cargamos la imagen del coche
var imagenCoche = new Image();
imagenCoche.src = "img/coche.png";
//---------------------------------------+ 

//---------------------------------------+ COCHE BOT
var posPx=[305,515,560,515,875,875,1130,1195,1195,1450,1450,1385,1385,515,1130,560,1350,1350,1415,1415,1160,1160,840,840,560,840,1610,1610,1710,1710,1610,1610,1610,1610,1610,1710,1710,1710,1710,1710,2375,2470,2375,2470,2150,2050,2050,2150,2150,2695,2150,2730,2730,2150,2730,2730,3140,3140,3140,3140,2730,2150,2150,2730,3140,2730,1710,1610,1610,1710,2150,3175,2470,2730,3175];
var posPy=[1400,1400,1400,1900,1900,1258,1900,1258,1195,1195,780,780,260,260,2470,300,300,810,810,1160,1160,1225,1225,1865,1865,1900,1900,2470,2470,1900,2540,3240,2150,2860,1675,3140,2860,2540,2150,1770,3240,3140,3560,3460,1770,1675,1350,1450,1705,1705,1675,1675,2150,2150,1450,1130,1130,1450,2150,2540,2540,2540,2860,2860,2055,2055,2055,2055,2500,2500,2500,2500,3560,2500,2540];
var bot1=new botObj(35,36,"1D","1I","1ARRB","1ABJ");
var bot2=new botObj(66,39,"2D","2I","2ARRB","2ABJ");
var bot3=new botObj(5,7,"3D","3I","3ARRB","3ABJ");
var bot4=new botObj(2,15,"4D","4I","4ARRB","4ABJ");
var bot5=new botObj(11,12,"1D","1I","1ARRB","1ABJ");
var bot6=new botObj(20,21,"5D","5I","5ARRB","5ABJ");
var bot7=new botObj(14,27,"6D","6I","6ARRB","6ABJ");
var bot8=new botObj(37,61,"3D","3I","3ARRB","3ABJ");
var bot9=new botObj(46,45,"5D","5I","5ARRB","5ABJ");
var bot10=new botObj(10,11,"4D","4I","4ARRB","4ABJ");

//---------------------------------------+ 

//---------------------------------------+ PLANTAS
//var arbol= new Image();
//arbol.src = "img/arbol1.png";
var contadorarboles = 0;
var finish = false;
var contadorCreacionArboles = 0;
var numeroArboles = 5000;  //Soporta bien hasta 20000 plantas de momento
var contador = numeroArboles;
var randomPosicionArboles = 0;
var lastX = 0;
var lastY = 0;
var distance = 1000;
var pruebax;
var pruebay;
var colorMapaArbol;
var planta = [];
var imagen = new Image();
var planta1 = new Image();
planta1.src = "img/planta1.png";
var planta2 = new Image();
planta2.src = "img/planta2.png";
var planta3 = new Image();
planta3.src = "img/planta3.png";
var planta4 = new Image();
planta4.src = "img/planta4.png";
var planta5 = new Image();
planta5.src = "img/planta5.png";
var imagenPlantas = [planta1,planta2,planta3,planta4,planta5];
console.log(imagenPlantas);

 
//---------------------------------------+ 

//---------------------------------------+ PAJAROS
var pajaros = [];
var pajlider;
//Declaramos los pajaros de la formacion. El numero de pajaros a acada lado es aleatorio entre 1 y 4
var pajarosfori = [];
var pajarosford = [];
var numpajI = Math.round(Math.random()*(4-1)+1);
var numpajD = Math.round(Math.random()*(4-1)+1);

//Cargamos la imagen de los pajaros
var imagenpajaroV = new Image();
imagenpajaroV.src = "img/pajarovolando.png";
var imagenpajaroP = new Image();
imagenpajaroP.src = "img/pajaroposando.png";
var imagenpajaro2 = new Image();
imagenpajaro2.src = "img/pajaroFor.png";
//---------------------------------------+

//---------------------------------------+ PECES

//Objetivo Comun Peces
var nBancos = 2; //Numero de peces que habra en cada banco
var objetivosComunes = new Array();
// Se define el número de peces por banco
var nPeces = 100;

// Creo el cursor
var cursor;	

//Cargar Sprite del tiburon
var imgTiburon = new Image();
imgTiburon.src = "img/SStiburon.png";
//Declaramos un tiburon
var tiburon = new Tiburon();
//Iniciamos Conteo del SpriteSheet del Tiburon
var sx = 0;
var sy = 0;


//---------------------------------------+ PAJAROS

inicio();

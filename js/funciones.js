/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////						 	Funciones del mapa											/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////
function dibujaMapaPerro(){
	MapaPerro.onload = function() {
		contextoPerro.drawImage(imagenperro, 0, 0);
		creaPerros();
		puedesIniciar++;
	}
}
function dibujaMapaPlanta(){
	mapaPlanta.onload = function() {
		contextoPlanta.drawImage(mapaPlanta, 0, 0);
		
		puedesIniciar++;
	}
}
function dibujaMapaPajaro(){
	mapaPajaro.onload = function() {
		contextoPajaro.drawImage(mapaPajaro, 0, 0);
		creacionPajaros();
		puedesIniciar++;
	}

}

/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////							Funciones del coche Bot										/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////
function hallarAngulo(x1,y1,x2,y2){				//hayo el angulo con referencia el eje x de un punto a otro
	var m=(y2-y1)/(x2-x1);
	angulo=Math.atan(m);
	return angulo;                               //me retorna el valor que es el angulo calculado
}

/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////							Funciones de los perros										/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////
	function creaPerros(){
			for (var i =0; i<numeroPerros; i++){
				perro[i] = new Perro();
				perro[i].posX = 1;
				perro[i].posY = 1;
				perro[i].direccion = 1;
				perro[i].velocidad = 1;
				perro[i].tempX = 1;
				perro[i].tempY = 1;
			}
		contador = numeroPerros;
	for (var i =0; i<contador; i++)
	{
		var pruebaX = Math.round(Math.random()*7552);
		var pruebaY = Math.round(Math.random()*4224);
		var colorMapaPerro = contextoPerro.getImageData(pruebaX, pruebaY,1,1);
		//console.log(colorMapaPerro.data[0]);
		if (colorMapaPerro.data[0]==60 &&
			(pruebaX > (lastX+distance) || pruebaX < (lastX-distance)) &&
			(pruebaY > (lastY+distance) || pruebaY < (lastY-distance)))
		{
			//console.log("hola");
			perro[i] = new Perro();
			perro[i].posX = pruebaX;
			perro[i].posY = pruebaY;
			perro[i].direccion = Math.random()*Math.PI*2;
			perro[i].velocidad = 1;
			contador--;
 		}
		else{
			perro[i].posX = 1072;
			perro[i].posY = 704;
			perro[i].direccion = Math.random()*Math.PI*2;
			perro[i].velocidad = 1;	
		}
 		lastX = pruebaX;
 		lastY = pruebaY;
	}

	perroMeos[0] = new PerroMeo();
	perroMeos[0].posX = perro[0].posX;
	perroMeos[0].posY = perro[0].posY;
}
function muevePerro(){
	limpiaMeos();
	for (var i = 0; i<numeroMeos; i++){
		contexto1.drawImage(imagenMeo, perroMeos[i].tempX-camara.vistaX, perroMeos[i].tempY-camara.vistaY,5,5);
	}
 	for (var i = 0; i<numeroPerros; i++){
		perro[i].direccion += (Math.random()-0.5) * 0.5;				// Varío el ángulo aleatoriamente
		perro[i].tempX = perro[i].posX + Math.cos(perro[i].direccion)*perro[i].velocidad;					// Miro hacia donde voy en x
		perro[i].tempY = perro[i].posY + Math.sin(perro[i].direccion)*perro[i].velocidad;		// Miro hacia donde voy en y
		var color = contextoPerro.getImageData(perro[i].tempX,perro[i].tempY,1,1);	// Miro el color en ese punto
		if (color.data[0]==60){
			perro[i].posX += Math.cos(perro[i].direccion)*perro[i].velocidad;					// Trabajo la proyección horizontal
			perro[i].posY += Math.sin(perro[i].direccion)*perro[i].velocidad;					// Trabajo la proyección vertical
			buscaPerroMeo(perro[i].posX, perro[i].posY, i);
		}
		if (color.data[3] == 0) {										// Si el valor de la transparencia es 0 el perro da la vuelta
			perro[i].direccion += Math.PI;
		}
		contexto1.drawImage(imagenperro, perro[i].posX-camara.vistaX, perro[i].posY-camara.vistaY,16,16);
					
	}
}
function buscaPerroMeo(_posX, _posY, iPerro){
	var encuentreMeo 	= false;
	var tocaMeo 		= false;
	for (var i = 0; i<numeroMeos; i++){
		if (_posX > (perroMeos[i].tempX-3) &&
			_posX < (perroMeos[i].tempX+3) &&
			_posY > (perroMeos[i].tempY-3) &&
			_posY < (perroMeos[i].tempY+3))
		{
			if (perro[iPerro].acabaDeMear == true){
				perro[iPerro].acabaDeMear = false;
			}else{
				encuentreMeo = true;
			}
		}
	}
	if (!encuentreMeo && tiempoSinMeos%3000==0){
		perro[iPerro].acabaDeMear = false;
		tocaMeo = true;
	}
	if ((encuentreMeo || tocaMeo) && perro[iPerro].acabaDeMear == false){
		var newX = _posX+Math.round(Math.random()*8);
		var newY = _posY+Math.round(Math.random()*10);
		perroMeos[numeroMeos] = new PerroMeo();
		perroMeos[numeroMeos].tempX = newX;
		perroMeos[numeroMeos].tempY = newY;
		perroMeos[numeroMeos].tiempoDeEsteMeo = caducidadDelMeo;
		perro[iPerro].acabaDeMear = true;
		contexto1.drawImage(imagenMeo,newX,newY,5,5);
		numeroMeos++;
		caducidadDelMeo++;
	}
	tiempoSinMeos++;
}
function limpiaMeos(){
	if (numeroMeos > 0){
		for (var i = 0; i<numeroMeos; i++){
			if ((caducidadDelMeo - perroMeos[i].tiempoDeEsteMeo) > 500){
				perroMeos.splice(i, 1);
				numeroMeos--
				break;
			}
		}
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////							Funciones de las ardillas									/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////

function creaArdillas(){
		for (var i =0; i<numeroArdillas; i++){
			ardilla[i] = new Ardilla();
			ardilla[i].posx;
			ardilla[i].posy;
			ardilla[i].direccion;
			ardilla[i].velocidad;
			ardilla[i].numeroArdillas = 100;
			ardilla[i].cuentaVelocidad = 0;
			ardilla[i].imagenX = 0;
			ardilla[i].imageny = 0;
		}
	var contadorardillas = numeroArdillas;
	var lastX = 0;
	var lastY = 0;
	var distance = 100;
		for (var i = 0; i<numeroArdillas; i++)
	{
		var pruebaX = Math.round(Math.random()*1000);
		var pruebaY = Math.round(Math.random()*1000);
		
		var colorMapaPerro = contextoPerro.getImageData(pruebaX, pruebaY,1,1);
		
		if (colorMapaPerro.data[0]==60 &&
			(pruebaX > (lastX+distance) || pruebaX < (lastX-distance)) &&
			(pruebaY > (lastY+distance) || pruebaY < (lastY-distance)))
		{
			ardilla[i] = new Ardilla();
			ardilla[i].posx = pruebaX;
			ardilla[i].posy = pruebaY;
			ardilla[i].direccion = Math.random()*Math.PI*2;
			ardilla[i].velocidad = 1;
			contador--;
 		}
		else 
		{
			ardilla[i].posX = 1072;
			ardilla[i].posY = 704;
			ardilla[i].direccion = Math.random()*Math.PI*2;
			ardilla[i].velocidad = 1;
		}
 		lastX = pruebaX;
 		lastY = pruebaY;
	}
}
function mueveArdillas(){
 	for (var i = 0; i<numeroArdillas; i++){
		ardilla[i].cuentaVelocidad++;
		ardilla[i].direccion += (Math.random()-0.5) * 0.5;				// Varío el ángulo aleatoriamente
		ardilla[i].tempX = ardilla[i].posx + Math.cos(ardilla[i].direccion)*ardilla[i].velocidad;					// Miro hacia donde voy en x
		ardilla[i].tempY = ardilla[i].posy + Math.sin(ardilla[i].direccion)*ardilla[i].velocidad;		// Miro hacia donde voy en y
		var color = contextoPerro.getImageData(ardilla[i].tempX,ardilla[i].tempY,1,1);	// Miro el color en ese punto
		if (color.data[0]==60){
			ardilla[i].posx += Math.cos(ardilla[i].direccion)*ardilla[i].velocidad;					// Trabajo la proyección horizontal
			ardilla[i].posy += Math.sin(ardilla[i].direccion)*ardilla[i].velocidad;					// Trabajo la proyección vertical
		}
		if (color.data[3] == 0) {										// Si el valor de la transparencia es 0 el perro da la vuelta
			ardilla[i].direccion += Math.PI;
		}
		if (perro[i].posx == ardilla[i].posx-5) {										
			ardilla[i].direccion += Math.PI;
		}
		if (perro[i].posx == ardilla[i].posx+5) {										
			ardilla[i].direccion += Math.PI;
		}
		if (perro[i].posy == ardilla[i].posy-5) {										
			ardilla[i].direccion += Math.PI;
		}
		if (perro[i].posy == ardilla[i].posy+5) {										
			ardilla[i].direccion += Math.PI;
		}
		if(ardilla[i].cuentaVelocidad % 5 == 0){
			ardilla[i].imagenX++;
		if (ardilla[i].imagenX >= 6){
			ardilla[i].imagenX = 0;
		}
	}
		contexto1.drawImage(imagenardilla,ardilla[i].posx-camara.vistaX,ardilla[i].posy-camara.vistaY,10,10);     		
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////							Funciones de las plantas									/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////
function generarPlantas(){
			console.log("Estoy generando plantas esto puede tardar cerca de 2 minuto ten paciencia");
			/*for (var i =0; i<numeroArboles; i++){
			planta[i] = new Arbol();

		}*/
		
	
	var lastX = [];
	var lastY = [];
	var distance = 100;

	
for (var p =0; p<numeroArboles;p++)
	{
		console.log("Ha pasado"+p+"veces")
		var pruebaX = Math.round(Math.random()*1000);
		var pruebaY = Math.round(Math.random()*1000);
		var colorMapaPlanta = contextoPlanta.getImageData(pruebaX, pruebaY,1,1);
			
			if (colorMapaPlanta.data[0]==254&&
				(pruebaX > (lastX+distance) || pruebaX < (lastX-distance)) &&
				(pruebaY > (lastY+distance) || pruebaY < (lastY-distance)))
					{
						
						
						planta[p] = new Arbol();
						planta[p].posX = pruebaX;
						planta[p].posY = pruebaY;
						var Random = Math.round(Math.random()*imagenPlantas.length);
						if(Random >=5){Random-=1}
						//console.log(Random)
						planta[p].imagen =imagenPlantas[Random];
						//console.log("la imagen elegida es"+planta[p].imagen)
						contadorarboles+=1;
						//console.log("He generado de momento"+contadorarboles+"plantas")
						//console.log("La imagen elegida es :"+planta[p].imagen.src)
						//console.log("Mi posX es "+planta[p].posX+" Mi posY es "+planta[p].posY)
						
						
					}
			
	
 		lastX = pruebaX;
 		lastY = pruebaY;
		
		if(p >= numeroArboles-1){
			console.log("He terminado")
			console.log("He pintado "+contadorarboles+" plantas distintas")
			}
		
	}
	
	//console.log("ContadorArboles = "+ contadorarboles);
}
function mantenerPlantas(){
	
	for (var p =0;p <=contadorarboles;p++) {
			contexto1.drawImage(planta[p].imagen,(planta[p].posX+planta[p].imagen.height/2)-camara.vistaX,(planta[p].posY+planta[p].imagen.width/2)-camara.vistaY);
			//planta[p].dibujar(planta[p].imagen,planta[p].posX-camara.vistaX,planta[p].posY-camara.vistaY)
		}
		
}





/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////							Funciones de los pajaros									/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////
function movimientoPajaros(){
	//Pajaro Volando
	for (var i=0; i<15; i++) {
		pajaros[i].variarAngulo(); //Variamos angulo
		//Ejecutamos el movimiento del pajaro teniendo en cuenta su energia
		pajaros[i].movEnerPaj();
		//Dibujamos los pajaros
		if (pajaros[i].volando) {pajaros[i].dibpajvolando(pajaros[i].rotZ, imagenpajaroV);}
		if (pajaros[i].posando) {pajaros[i].dibpajposando();}
	}
	// Pajaros Bandada en Formacion
	// Movimiento y pintado del pajaro lider
	pajlider.mover();
	pajlider.dibpajvolando(pajlider.rotZ, imagenpajaro2);

	//Movimiento y pintado de los pajaros seguidores
	for (var i=0; i<numpajI; i++) {
		//Movemos y Pintamos formacion izquierda
		pajarosfori[i].mover();
		pajarosfori[i].dibpajvolando(pajlider.rotZ, imagenpajaro2);
	}
	for (var i=0; i<numpajD; i++) {
		//Movemos y pintamos formacion derecha
		pajarosford[i].mover();
		pajarosford[i].dibpajvolando(pajlider.rotZ, imagenpajaro2);
	}
}
function creacionPajaros(){
	// Condiciones iniciales de pajaros
	for (var i=0; i<200; i++) {
		pajaros[i] = new Pajaro();
		pajaros[i].velocidad = Math.random()*(5-3)+3; 		//Velocidad entre 2 y 5
		pajaros[i].volando = true;							//Los pajaros empiezan moviendose
		pajaros[i].posando = false;
		pajaros[i].tiempodescanso = 0;
		pajaros[i].energia = Math.random()*(300-100)+100;	//Valores entre 300 y 100 de energia inicial
		pajaros[i].posX = Math.round(Math.random()*lienzoPajaro.width);
		pajaros[i].posY = Math.round(Math.random()*lienzoPajaro.height);
		pajaros[i].rotZ = Math.random()*Math.PI*2;
	}
	// Condiciones iniciales del pajaro lider y su bandada
	// Pajaro Lider
	// El pajaro sale del lado derecho con un angulo entre 30 y -30. Sale de entre 1/1 y 3/4 de la altura del lienzo
	pajlider = new Pajaro();
	pajlider.velocidad = Math.random()*(2-1)+1;		//Parte con una velocidad de entre 1 y 2
	pajlider.posX = 0;
	pajlider.posY = Math.round(Math.random()*(lienzoPajaro.height*0.75-lienzoPajaro.height*0.25)+lienzoPajaro.height*0.25);
	pajlider.rotZ = Math.random()*(-Math.PI/3)+Math.PI/6;

	// Pajaros Formacion
	// Los pajaros que siguen al lider lo hacen formando un angulo (diferente los de izq y der). Tienen misma vel y sentido
	// Pajaros del flanco izquierdo
	for (var i = 0; i<numpajI; i++) {
		pajarosfori[i] = new Pajaro();
		pajarosfori[i].velocidad = pajlider.velocidad;
		pajarosfori[i].posX = pajlider.posX - 30*(i+1)*Math.cos(pajlider.rotZ+Math.PI/4);
		pajarosfori[i].posY = pajlider.posY - 30*(i+1)*Math.sin(pajlider.rotZ+Math.PI/4);
		pajarosfori[i].rotZ = pajlider.rotZ;
	}
	// Pajaros del flanco derecho
	for (var i = 0; i<numpajD; i++) {
		pajarosford[i] = new Pajaro();
		pajarosford[i].velocidad = pajlider.velocidad;
		pajarosford[i].posX = pajlider.posX - 30*(i+1)*Math.cos(pajlider.rotZ-Math.PI/6);
		pajarosford[i].posY = pajlider.posY - 30*(i+1)*Math.sin(pajlider.rotZ-Math.PI/6);
		pajarosford[i].rotZ = pajlider.rotZ;
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////							Funciones del coche protagonista							/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////
function actualizarCocheProtagonista() {
	cocheProtagonista.dibuja();
	cocheProtagonista.barraCombustible.dibujar();
	// Se actualizan los valores cuando acelera
	if (cocheProtagonista.acelerando) {
		cocheProtagonista.acelerar();
	}
	// Se actualizan los valores cuandro frena
	if (cocheProtagonista.frenando) {
		cocheProtagonista.frenar();
	}
	// Se actualizan los valores en inercia (sin acelerar ni frenar)
	if (!cocheProtagonista.frenando && !cocheProtagonista.acelerando) {
		cocheProtagonista.frenarRozamiento();
	}
	// Se actualizan valores al girar. Sólo gira si está en movimiento
	if (cocheProtagonista.izquierda || cocheProtagonista.derecha) {
		cocheProtagonista.girar();
	}
	// Ajuste de velocidad a cero cuando es despreciable
	if (Math.abs(cocheProtagonista.velocidad) < cocheProtagonista.rozamiento) {
		cocheProtagonista.velocidad = 0
	}
	// Comprueba colisiones
	cocheProtagonista.compruebaColision();
	// Comprueba cambios de terreno (diferente rozamiento)
	cocheProtagonista.compruebaTerreno();
	// Si cambia la velocidad máxima del coche por entrar en un terreno con más rozamiento, por daños, etc.
	// se actualiza la velocidad actual si está por encima de la máxima
	cocheProtagonista.actualizaVelocidadMax();
	// Actualizar posición del coche. Sólo actualiza las coordenadas x e y cuando el coche se está moviendo
	if (Math.abs(cocheProtagonista.velocidad) > 0 ) {
		cocheProtagonista.mover();
	}
	cocheProtagonista.compruebaGasolinera();
	// Actualizar el porcentaje de combustible que le queda al coche
	cocheProtagonista.barraCombustible.actualizarPorcentaje(cocheProtagonista);
}
function drawRotated(radianes) {
	//contexto1.clearRect(0,0,lienzo1.width,lienzo1.height);

	// save the unrotated context of the canvas so we can restore it later
	// the alternative is to untranslate & unrotate after drawing
	contexto1.save();
	// move to the center of the canvas
	contexto1.translate(cocheProtagonista.posX - camara.vistaX, cocheProtagonista.posY - camara.vistaY);
	// rotate the canvas to the specified degrees
	contexto1.rotate(radianes);
	// draw the image
	// since the context is rotated, the image will be rotated also
	contexto1.drawImage(imagenCoche, -imagenCoche.width / 2, -imagenCoche.height / 2);
	// we’re done with the rotating so restore the unrotated context
	contexto1.restore();
}
function condicionesInicialesCocheProtegonista(){
	// Condiciones iniciales del coche protagonista
	cocheProtagonista = new CocheProtagonista();
	cocheProtagonista.posX									= 550;
	cocheProtagonista.posY									= 1880;
	cocheProtagonista.rotZ									= 0;

	cocheProtagonista.velocidad								= 0;
	cocheProtagonista.velocidadMax							= 4;
	cocheProtagonista.velocidadNitro						= 8;
	cocheProtagonista.velocidadMaxAtras						= 1;

	cocheProtagonista.combustibleCapacidad					= 800;
	cocheProtagonista.combustible							= cocheProtagonista.combustibleCapacidad; // Se empieza con el depósito lleno
	cocheProtagonista.consumoMin							= 0.05;
	cocheProtagonista.consumoMax							= 0.5;
	cocheProtagonista.consumoNitro							= 2;

	cocheProtagonista.aceleracion							= 0.05;
	cocheProtagonista.aceleracionAtras						= 0.05;
	cocheProtagonista.aceleracionNitro						= 0.5;
	cocheProtagonista.frenada								= 0.2;
	cocheProtagonista.rozamiento							= 0.03;
	cocheProtagonista.ratioGiro								= 0.1;

	cocheProtagonista.barraCombustible						= new InterfazBarraCombustible();
	cocheProtagonista.barraCombustible.posX 				= 0;
	cocheProtagonista.barraCombustible.posY 				= 10;
	cocheProtagonista.barraCombustible.anchura				= 30;
	cocheProtagonista.barraCombustible.altura				= 4;
	cocheProtagonista.barraCombustible.porcentajeInicial	= 100;
	cocheProtagonista.barraCombustible.porcentaje			= cocheProtagonista.barraCombustible.porcentajeInicial;
}
function eventosCocheProtagonista() {
	// Escribir el código que se encarga de la pulsación de las teclas
	$(document).keydown(function(event) {
		if (event.which == 87) {
			// Acelera W
			cocheProtagonista.acelerando = true;
		}
		if (event.which == 83) {
			// Frena S
			cocheProtagonista.frenando = true;
		}
		if (event.which == 65) {
			// Gira izquierda A
			cocheProtagonista.izquierda = 1;
		}
		if (event.which == 68) {
			// Gira derecha D
			cocheProtagonista.derecha = 1;
		}
		if (event.which == 32) {
			// Nitro
			cocheProtagonista.activarNitro(true);
		}
	});

	$(document).keyup(function(event) {
		if (event.which == 87) {
			cocheProtagonista.acelerando = false;
		}

		if (event.which == 83) {
			cocheProtagonista.frenando = false;
		}

		if (event.which == 65) {
			cocheProtagonista.izquierda = false;
		}

		if (event.which == 68) {
			cocheProtagonista.derecha = false;
		}
		if (event.which == 32) {
			// Nitro
			cocheProtagonista.activarNitro(false);
		}
	});
}
function dibujarBarraCombustible() {
	// Calcula el porcentaje (en pixels) que le queda de combustible
	var anchuraRellenada = Math.ceil((cocheProtagonista.barraCombustible.porcentaje * cocheProtagonista.barraCombustible.anchura) / 100);
	// Pinto el contorno y el fondo de la barra de combustible en negro
	// La posición de la barra es relativa a la del cocheProtagonista
	contexto1.fillStyle = "#000000";
	contexto1.fillRect(cocheProtagonista.posX - 16 - camara.vistaX, cocheProtagonista.posY - 21 - camara.vistaY, cocheProtagonista.barraCombustible.anchura + 2, cocheProtagonista.barraCombustible.altura + 2);
	if (cocheProtagonista.barraCombustible.porcentaje < 33) {			// Si el combustible es menor del 33%
		contexto1.fillStyle = "#FF0000";							// Pinto con el color rojo (aviso de que se acaba el combustible)
	} else {															// Si el combustible es mayor o superior al 33%
		contexto1.fillStyle = "#1F9639";							// Pinto con el color verde
	}
	// Pinto el relleno de la barra de combustible
	// La posición de la barra es relativa a la del cocheProtagonista
	contexto1.fillRect(cocheProtagonista.posX - 15- camara.vistaX, cocheProtagonista.posY - 20 - camara.vistaY, anchuraRellenada, cocheProtagonista.barraCombustible.altura);
}


/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////						 	Funciones de la cámara										/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////
function situarCamara() {
	camara = new Camara(0, 0, lienzo1.width, lienzo1.height, anchuraMapa, alturaMapa);
	camara.seguirObjeto(cocheProtagonista, lienzo1.width / 2, lienzo1.height / 2);
}
/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////							Funciones del coche POLICIA						         	/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////

function crearInstanciaCochePolicia(){
	cochePolicia1 = new CochePolicia(contextoCochePolicias,contextoUIPolicias,mapaCochePolicias);
	cochePolicia1.posXGanador = 550;
	cochePolicia1.posYGanador = 280;
	cochePolicia1.render();
	cochePolicia1.buscaColor();
	cochePolicia1.pausa = false;
	cochePolicia1.algoritmoBuscaCoche();
}

/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////				Funciones de los peces. Están en funcionespez.js						/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////

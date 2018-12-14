/****************************************************************************************************************************/
/* Condiciones iniciales y bucle																							*/
/****************************************************************************************************************************/
function valoresInicialesPez(){
	// Creo los peces
	cursor = new Cursor();

	//Creo Objetivos Comunes por cada numero Peces en cada bandada (nPeces / nBancos)

	for(var i = 0; i < nBancos; i++) {
		// creo Objetivo
		objetivosComunes[i] = new Objetivo();
		// Inicializo variables
		objetivosComunes[i].constructor();
	}



	objetivosComunes[0].posX = 200;
	objetivosComunes[0].posY = 200;
	objetivosComunes[0].rotZ = 1;

	objetivosComunes[1].posX = 500;
	objetivosComunes[1].posY = 100;
	
	for(var i = 0; i < nBancos; i++) {
		// Creo los peces

		for (var j = 0; j < nPeces; j++) {
			objetivosComunes[i].peces[j] = new Pez();
			objetivosComunes[i].peces[j].constructor();
			objetivosComunes[i].peces[j].color = "white";
			objetivosComunes[i].peces[j].posX = 70;
			objetivosComunes[i].peces[j].posY = 70;
			objetivosComunes[i].peces[j].objetivo.posX = objetivosComunes[i].posX +
														(objetivosComunes[i].peces[j].ratioPosicionObjetivo * Math.cos(2 * Math.PI * Math.random()));
			objetivosComunes[i].peces[j].objetivo.posY = objetivosComunes[i].posY +
														(objetivosComunes[i].peces[j].ratioPosicionObjetivo * Math.sin(2 * Math.PI * Math.random()));
			objetivosComunes[i].peces[j].objetivo.centrar();
		}
	}


	//Damos valores iniciales al tiburon
	tiburon.posX = 100;
	tiburon.posY = 500;
	tiburon.rotZ = 0; //Math.random()*2*Math.PI;
	tiburon.velocidad = 1.6;

}

function eventosPez(){

	// Código JQuery
	$("canvas").mousemove(function(event){
		// Al pasar el ratón
		//for (var i = 0; i < nPeces; i++){peces[i].persigue(event.pageX - 272, event.pageY - 50);}
	})

	$("canvas").click(function(event){
		// Al hacer click
		//for (var i = 0; i < nPeces; i++){peces[i].velocidad +=0.1;}
		//for (var i = 0; i < nPeces; i++){peces[i].huye(event.pageX - 272, event.pageY - 50);}

	})

	$("canvas").dblclick(function(event){
		// Al hacer doble click
		//for (var i = 0; i < nPeces; i++){peces[i].persigue(event.pageX - 272, event.pageY - 50);}
	})

}

function actualizarPez() {

	// Soy Jose Canovas
	// Colocando el .colisionBordes() al final de la ejecucion dentro de cada parte de esta funcion actualizarPez se ve mejor la cosa...
	//Pero, tanto los peces como el tiburon, al colisionar, pierden su posX y su posY y desaparecen, ya que si haceis console.log te dice NaN de las posX e posY (not a number)
	//Puede ser tiempos de ejecucion en esta parte...Pero no tengo mas tiempo de mirarlo...Al menos algo hemos avanzado. Buena suerte ;)


	// Banco de peces 0: forma lineal
	// objetivosComunes[0].dibuja('yellow');
	objetivosComunes[0].moverLinealmente();
	//objetivosComunes[0].colisionBordes();
	//objetivosComunes[0].cambiaDireccion(); // No funciona si sigue a un objetivo
	//objetivosComunes[0].cambiaPosicion();
	objetivosComunes[0].cambiaObjetivos();
	objetivosComunes[0].colisionBordes();
	for (var i = 0; i < nPeces; i++) {
		objetivosComunes[0].peces[i].dibujaPez();
		objetivosComunes[0].peces[i].mover();
		//objetivosComunes[0].peces[i].objetivo.moverCircularmente();
		objetivosComunes[0].peces[i].ondula();

		objetivosComunes[0].peces[i].huye(tiburon.posX,tiburon.posY);


		objetivosComunes[0].peces[i].persigueObjetivo();
		objetivosComunes[0].peces[i].controlVelocidad();
		//objetivosComunes[0].peces[i].cambiaDireccion(); // No funciona cuando persigue un objetivo
		objetivosComunes[0].peces[i].cambiaPosicionObjetivo();
		//objetivosComunes[0].peces[i].huye(500,500);
		//objetivosComunes[0].peces[i].objetivo.dibuja("blue");
		//objetivosComunes[0].peces[i].dibujaVelocidad("red");
		//objetivosComunes[0].peces[i].dibujaPosicion("red");
		//dibujaRectangulo(tiburon.posX,tiburon.posY,20,20,"blue");
		objetivosComunes[0].peces[i].colisionBordes();
	}

	// Banco de peces 1: forma circular
	//objetivosComunes[1].dibuja('yellow');
	objetivosComunes[1].colisionBordes();
	//objetivosComunes[1].cambiaDireccion(); // No funciona si sigue a un objetivo
	//objetivosComunes[1].cambiaPosicion();
	//objetivosComunes[1].cambiaObjetivos();
	objetivosComunes[1].cambiaRadio();
	objetivosComunes[1].cambiaSentido();
	for (var i = 0; i < nPeces; i++) {
		objetivosComunes[1].peces[i].dibujaPez();
		objetivosComunes[1].peces[i].mover();
		objetivosComunes[1].peces[i].objetivo.moverCircularmente();
		objetivosComunes[1].peces[i].ondula();

		objetivosComunes[1].peces[i].huye(tiburon.posX,tiburon.posY);


		objetivosComunes[1].peces[i].persigueObjetivo();
		objetivosComunes[1].peces[i].controlVelocidad();
		//objetivosComunes[1].peces[i].cambiaDireccion(); // No funciona cuando persigue un objetivo
		//objetivosComunes[1].peces[i].cambiaPosicionObjetivo();
		objetivosComunes[1].peces[i].cambiaRadio();
		//objetivosComunes[1].peces[i].huye(500,500);
		//objetivosComunes[1].peces[i].objetivo.dibuja("blue");
		//objetivosComunes[1].peces[i].dibujaVelocidad("red");
		//objetivosComunes[1].peces[i].dibujaPosicion("red");
		objetivosComunes[1].peces[i].colisionBordes();

	}

	//Mover el tiburon
	/*tiburon.comportamientoTiburon();
	tiburon.colisionBordes();
	tiburon.controlVelocidad();
	tiburon.mover();
	//Animacion del Tiburon. Lo pintamos y actualizamos sprite
	tiburon.animar(imgTiburon);
	dibujaRectangulo(tiburon.posX,tiburon.posY , 10, 10);*/

	dibujaRectangulo(tiburon.posX,tiburon.posY , 10, 10);
	//Animacion del Tiburon. Lo pintamos y actualizamos sprite
	tiburon.animar(imgTiburon);
	tiburon.mover();
	tiburon.comportamientoTiburon();
	tiburon.controlVelocidad();
	tiburon.colisionBordes();

}

/****************************************************************************************************************************/
/* Funciones de cálculo																									*/
/****************************************************************************************************************************/
function anguloEntrePuntos(xOrigen, yOrigen, xObjetivo, yObjetivo) {

    return Math.atan2(yObjetivo - yOrigen, xObjetivo - xOrigen);

}

/****************************************************************************************************************************/
/* Funciones de dibujado																									*/
/****************************************************************************************************************************/
function dibujaRotado(radianes, camara){

	contexto1.clearRect(0,0,lienzo.width,lienzo.height);
	contexto1.save();
	contexto1.translate(pez.posX - camara.vistaX, pez.posY - camara.vistaY);
	contexto1.rotate(radianes);
	contexto1.drawImage(imagenPez,- imagenPez.width/2,- imagenPez.height/2);
	contexto1.restore();

}

function dibujaLinea(xInicio, yInicio, xFin, yFin, color){

	contexto1.strokeStyle = color;
	contexto1.beginPath();
	contexto1.moveTo(xInicio,yInicio);
	contexto1.lineTo(xFin,yFin);
	contexto1.stroke();

}

function dibujaCirculo(x, y, aRadio, color, modo) {
	contexto1.fillStyle = color;
	contexto1.strokeStyle = color;
	contexto1.beginPath();
	contextoPeces.arc(x - (aRadio/2) , y - (aRadio/2), aRadio ,0, 2 * Math.PI);
	if (modo == "S") {
		contexto1.stroke();
	} else {
		contexto1.fill();
	}
	contexto1.endPath;
}

function dibujaRectangulo(x, y, xEscala, yEscala, color, modo){

	if (modo == "S") {
		contexto1.strokeStyle = color;
		contexto1.strokeRect(x - xEscala/2 - camara.vistaX, y - yEscala/2 - camara.vistaY, xEscala, yEscala);
	} else {
		contexto1.fillStyle = color;
		contexto1.fillRect(x - xEscala/2 - camara.vistaX, y - yEscala/2 - camara.vistaY, xEscala, yEscala);
	}

}

function inicio() {
	
	
	//Cuando el documento esté preparado(cuando esté todo leido inicialmente)
	$(document).ready(function() {
		dibujaMapaPlanta();
		 setTimeout("generarPlantas()",1000);
		
		$("#instrucciones").hide();

		$("#botonEmpezarJuego").mousedown(function(event) {
			//Si se pulsa el boton izquierdo del raton
			if (event.which == 1 && puedesIniciar == 2) {
				//Oculta el botonEmpezarJuego
				$("#interfazUsuario").hide();

				condicionesInicialesCocheProtegonista();
				situarCamara();
				mapaBonito.dibujar(contexto1, camara.vistaX, camara.vistaY);
				mapaCoche.dibujar(contextoCoche, camara.vistaX, camara.vistaY);
				mapaPeces.dibujar(contextoPeces, camara.vistaX, camara.vistaY);
				mapaPerro.dibujar(contextoPerro, camara.vistaX, camara.vistaY);
				
				
				creaPerros();
				creaArdillas();
				
				
				//POLICIA
				crearInstanciaCochePolicia();
				//PECES
				valoresInicialesPez();
				//PERROS
			
				//Ejecutamos bucle()
				bucle();
				$("canvas").css("border","5px solid black")//añadido por anto
			}
		});
		$("#botonInstrucciones").mousedown(function(event) {
			//Si se pulsa el boton izquierdo del raton
			if (event.which == 1) {
				//Oculta el botonEmpezarJuego
				$("#interfazUsuario").hide();
				$("#instrucciones").show();
			}
		});
		$("#cerrar").mousedown(function(event) {
			//Si se pulsa el boton izquierdo del raton
			if (event.which == 1) {
				//Oculta el botonEmpezarJuego
				$("#interfazUsuario").show();
				$("#instrucciones").hide();
			}
		});
		$("#botonReiniciarJuego").mousedown(function(event) {
			//Si se pulsa el boton izquierdo del raton
			if (event.which == 1) {
				//Oculta el botonEmpezarJuego
				$("#gameOver").hide();
				condicionesInicialesCocheProtegonista();
				situarCamara();
				mapaBonito.dibujar(contexto1, camara.vistaX, camara.vistaY);
				mapaCoche.dibujar(contextoCoche, camara.vistaX, camara.vistaY);
				mapaPeces.dibujar(contextoPeces, camara.vistaX, camara.vistaY);
				mapaPerro.dibujar(contextoPerro, camara.vistaX, camara.vistaY);
				
				//POLICIA
				crearInstanciaCochePolicia();

				//PECES
				valoresInicialesPez();
				
				//PERROS
				
				//PLANTAS
				
				
				
				//Ejecutamos bucle()
				gameOver = false;
				bucle();
			}
		});

		//---------------------------------------+ MAPAS
		
		dibujaMapaPajaro();


		//---------------------------------------+ COCHE PROTAGONISTA
		eventosCocheProtagonista();
		//---------------------------------------+

		//---------------------------------------+ COCHE BOT

		//---------------------------------------+

		

		//---------------------------------------+ ARDILLAS

		//---------------------------------------+ PERROS

		//---------------------------------------+

		//---------------------------------------+ PAJAROS
		creacionPajaros();
		//---------------------------------------+ PECES
		eventosPez();
		//---------------------------------------+
		//---------------------------------------+ PLANTAS
		
	});
}

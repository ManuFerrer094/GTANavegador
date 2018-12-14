Arbol.prototype = new Actor();

function Arbol(_posX, _posY, _srcPerro){
	// Propiedades
	this.numeroPlantas;
	this.imagenX = 0;
	this.imageny = 0;
	this.imagen = new Image();
	

	
	//metodos
	function dibujar(){
		
		contexto1.drawImage(this.imagen,this.posx,this.posy);
	}
	
}




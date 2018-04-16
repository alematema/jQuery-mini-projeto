$('#botao-frase').click(fraseAleatoria);

function fraseAleatoria() {
	$.get('http://localhost:3000/frases', trocarFraseAleatoria);
}

function trocarFraseAleatoria(retorno) {

	var frase = $(".frase");
	
	var numeroAleatorio = Math.floor(Math.random() * retorno.length);

	frase.text(retorno[numeroAleatorio].texto);
	
	atualizarTamanhoFrase();
	
	atualizarTempo(retorno[numeroAleatorio].tempo);

}

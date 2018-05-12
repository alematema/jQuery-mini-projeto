$('#botao-frase').click(fraseAleatoria);
$('#botao-frase-id').click(buscaFrase);

function fraseAleatoria() {
	toggleSpinner();
	$.get('http://localhost:3001/frases', trocarFraseAleatoria).fail(notificarFalha).always(toggleSpinner);
}

function toggleSpinner() {
	$('#spinner').toggle()
}

function trocarFraseAleatoria(response) {
	var numeroAleatorio = Math.floor(Math.random() * response.length);
	setFrase(response[numeroAleatorio]);
}

function notificarFalha(msg) {
	$('#erro').show();
	setTimeout(function () {
		$('#erro').hide()
	}, 2000);
}

function buscaFrase() {
	toggleSpinner();
	var fraseId = $('#frase-id').val();
	var query = {
		id: fraseId
	};
	$.get('http://localhost:3001/frases', query, setFrase).fail(notificarFalha).always(toggleSpinner);
}

function setFrase(obj){

	$(".frase").text(obj.texto);
	atualizarTamanhoFrase();
	atualizarTempo(obj.tempo);

}

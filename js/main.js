var tempoInicial = $("#tempo-digitacao").text();
var campo = $('.campo-digitacao');

//nova funcao
$(function () {
	campo.attr("disabled", false);
	campo.val("");
	atualizarTamanhoFrase();
	inicializarContadores();
	inicializarCronometro();
	$("#botao-reiniciar").click(reiniciarJogo);
});

function atualizarTamanhoFrase() {
	var frase = $('.frase').text();
	var numPalavras = frase.split(" ").length;
	jQuery('#tamanho-frase').text(numPalavras);
}

function inicializarContadores() {

	campo.on('input', function () {
		var conteudo = campo.val();
		var qtdPalavras = conteudo.split(/\s+/);
		$('#contador-palavras').text(qtdPalavras.length);
		if (conteudo.trim() == '') $('#contador-palavras').text(qtdPalavras.length - 1);
		$('#contador-caracteres').text(conteudo.length);
	});


}

campo.on('input', function () {

	var digitado = campo.val();
	var frase = $('.frase').text();

	if (frase.startsWith(digitado)) {

		campo.removeClass('borda-vermelha');
		campo.addClass('borda-verde');

	} else {

		campo.removeClass('borda-verde');
		campo.addClass('borda-vermelha');

	}

});

//$("a").click(function(event){
//		event.preventDefault();
//    $(this).parent().parent().css("background-color","red");
//});


function reiniciarJogo() {
	campo.attr("disabled", false);
	campo.val("");
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	campo.removeClass('campo-desativado');
	campo.removeClass('borda-verde');
	campo.removeClass('borda-vermelha');
	inicializarCronometro(); //novo
}


 function inicializarCronometro() {

	campo.one('focus', function () {


		$("#botao-reiniciar").attr("disabled", true);
		var tempoRestante = $('#tempo-digitacao').text();
		var cronometroID = setInterval(function () {

			tempoRestante--;
			$('#tempo-digitacao').text(tempoRestante);
			if (tempoRestante < 1) {

				clearInterval(cronometroID);
				finalizaJogo();
			}

		}, 1000);

	});

}

function finalizaJogo() {

	$('.campo-digitacao').attr('disabled', true);
	$("#botao-reiniciar").attr("disabled", false);
	campo.addClass('campo-desativado');
	inserePlacar();

}

var tempoInicial = $("#tempo-digitacao").text();
var campo = $('.campo-digitacao');

//nova funcao
$(function () {
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


function inserePlacar() {

	var corpoTabela = $('.placar').find('tbody');
	//	var corpoTabela = document.querySelector('tbody');
	var usuario = 'alex_andré';
	var numPalavras = $('#contador-palavras').text();

	var linha = novaLinha(usuario, numPalavras);

	corpoTabela.prepend(linha);

}

function novaLinha(usuario, numPalavras) {

	var linha = $('<tr>');

	var colunaUsuario = $('<td>').text(usuario);
	var colunaPalavras = $('<td>').text(numPalavras);
	var colunaRemover = $('<td>');

	var link = $('<a>').addClass('botao-remover').attr('href', '#');
	var icone = $('<i>').addClass('small').addClass('material-icons').text('delete_forever');

	link.append(icone);
	colunaRemover.append(link);

	link.click(removeLinha);

	linha.append(colunaUsuario);
	linha.append(colunaPalavras);
	linha.append(colunaRemover);

	return linha;

}


function removeLinha(event) {

	event.preventDefault();
	$(this).parent().parent().remove();

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

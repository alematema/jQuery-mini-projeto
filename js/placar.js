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
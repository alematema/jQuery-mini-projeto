$('#botao-placar').click(mostrarPlacar);
$('#botao-sync').click(sincronizarPlacar);

function inserePlacar() {

	var corpoTabela = $('.placar').find('tbody');
	//	var corpoTabela = document.querySelector('tbody');
	var usuario =  $("#usuarios").val();
	var numPalavras = $('#contador-palavras').text();

	var linha = novaLinha(usuario, numPalavras);

	corpoTabela.prepend(linha);
	$('.placar').slideDown(1000, scrollPlacar);
	
}

function scrollPlacar() {

	var posicaoPlacar = $('.placar').offset().top;
	$('html').animate({
		scrollTop: posicaoPlacar + 'px'
	}, 1000);

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
	$(this).parent().parent().fadeOut(1000, function () {
		$(this).remove();
	});

}

function mostrarPlacar(event) {
	jQuery('.placar').stop().toggle(1000,scrollPlacar);
}

function sincronizarPlacar(){
	var placar = [];
	var linhas = $('tbody > tr');
	linhas.each(function(){
		
		var usuario = $(this).find('td:nth-child(1)').text();
		var pontos = $(this).find('td:nth-child(2)').text();

		var score = {
			usuario : usuario,
			pontos : pontos
		};
		
		placar.push(score);
		
	});
	
	var dados = {
		placar:placar
	}
	
	$.post('http://localhost:3000/placar', dados, function(){
		
		console.log('salvou dados no servidor');
	
	});
	
	
}


function atualizaPlacar(){
	$.get('http://localhost:3000/placar',function(data){
		$(data).each(function(){
			var linha = novaLinha(this.usuario, this.pontos);
			$('tbody').append(linha); 
		});
	
	})
}

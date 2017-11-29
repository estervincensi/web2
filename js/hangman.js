var usuario ='', dificuldade ='', palavras = [], pontuacao=0, letra, campo, palavra, numeroErros = 0, numeroDePossiveisErros,
usuarios=[],dificuldades=[],pontos=[], dicas=[], indice, dica, arraydificil = [];

$('#btnIniciar').click(function(){
  usuario = $('#usuario').val();
  dificuldade = $('#dificuldade input[type=radio]:checked').val();
  window.localStorage.clear();
  $(location).attr('href','tela_jogo.php'+'?usuario='+usuario+'&dificuldade='+dificuldade+'&pontuacao='+pontuacao);
 
});

var salvaDadosNoBanco = function(){
  var link =  'salvarNoBanco.php';
  $.post(link,
    { usuario:usuario,dificuldade:dificuldade,pontuacao:pontuacao}
  );

}

var recebePalavras = function(){
  var link =  'recebePalavras.php';
  $.get(link).done(function(data){
    for(var i = 0; i<data.palavras.length; i++){
	    palavras[i] = data.palavras[i].nome;
      dicas[i] = data.palavras[i].dica;
    }
      criaCampos();
  })
};

var criaCampos = function(){
  numeroDePossiveisErros = aplicaDificuldade();
  indice = sorteiaPalavras(numeroDePossiveisErros);
  palavra = palavras[indice];
  verificaSePalavraExiste(palavra);
  dica=dicas[indice];
  letra = formataPalavra(palavra);
  atualizaCampos();
}

var atualizaCampos = function(){
  campo = letra.map(function(elem){
    return elem.visible? elem.letra: '_ ';
  });
  $('#caixa').text(campo.join(''));
}
var aplicaDificuldade = function(){
  var numErros = 50;
  if(dificuldade === 'normal'){
    numErros = 5;
    pontuacao=15;
  } else {
    numErros = 2;
    pontuacao=20;
  }
  return numErros;
};

var sorteiaPalavras = function(erros){
  var rand = Math.floor(Math.random() * palavras.length);
  return rand;
};

function guardaUsuarioDificuldade(){
  usuario=getUrlVars('usuario');
  dificuldade = getUrlVars('dificuldade');
};

function getUrlVars(sParam)
{
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++)
  {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam)
    {
      return sParameterName[1];
    }
  }
};

var verificaSePalavraExiste = function(novaPalavra){
  if(window.localStorage.length === palavras.length){
    guardaPontuacao();
    retiraPontos();
    window.location.href='rankPage.php'+'?usuario='+usuario+'&dificuldade='+dificuldade+'&pontuacao='+pontuacao;
  } else
  if(window.localStorage.getItem(novaPalavra) === palavra){
    indice = sorteiaPalavras(numeroDePossiveisErros);
    palavra = palavras[indice];
    verificaSePalavraExiste(palavra);
  }

};

var formataPalavra = function(palavra){
  return palavra.split('').map(function(char){
    return {letra:char, visible:false};
  })
};

function guardaPontuacao(){
  console.log(pontuacao);
  pontuacao += parseInt(getUrlVars('pontuacao'));
  console.log(pontuacao);
}

var retiraPontos = function(){
  //primeira posição do array = pontos que devem ser retirados em modo normal;
  //segunda posição do  array = pontos que devem ser retrados em modo dificil;
  if(dificuldade === 'normal'){
    pontuacao-=15;
  } else {
    pontuacao-=20;

  }
};

function preencheArrays(){
  salvaDadosNoBanco();
  var link =  'getUsuarios.php';
  var user = {};
  $.get(link).done(function(data){
    
    for(var i = 0, len = data.usuarios.length; i<len; i++){
      // Juntei todos os dados de em usuario em um objeto usuario para ficar mais facil de ordenar
      user = {nome: data.usuarios[i].usuario, dificuldade: data.usuarios[i].dificuldade, pontos: data.usuarios[i].pontuacao};
      usuarios.push(user);
    }

  }).done(preencheRanking);
}

function preencheRanking(){
  ordenarRanking();
  var contaNormais=0, contadificil=0;
  for(var i=0;i<usuarios.length;i++){
    if(usuarios[i].dificuldade=='normal'){
      if(contaNormais<=4){
        $('#normal').append(
          $('<li>')
          .append('nome: '+usuarios[i].nome+' dificuldade:'+usuarios[i].dificuldade+' pontuação:'+usuarios[i].pontos)
        );
        contaNormais++;
      }
    }else{
      if(contadificil<=4){
        $('#dificil').append(
          $('<li>')
          .append('nome: '+usuarios[i].nome+' dificuldade:'+usuarios[i].dificuldade+' pontuação:'+usuarios[i].pontos)
        );
      }
      contadificil++;
    }
  }
}
function ordenarRanking(){
  usuarios.sort(function(a,b){
    return b.pontos - a.pontos;
  })
}


$('.botao-teclado').click(function(){
  acertaLetra($(this).val());
});

var acertaLetra = function(ltr){
  //status 0 de não acertou, 1 de acertou
  var status = 0;
  var letraCerta = letra.forEach(function(elem){
    if(elem.letra.toUpperCase() === ltr.toUpperCase()){
      status = 1;
      return elem.visible = true;
    }
  });
  if(status === 0){
    numeroErros += 1;
  } else {
    atualizaCampos();
  }
  exibeBoneco();
  verificaVitoriaPorLetra();
  mostraLetra(ltr);
};

var exibeBoneco = function(){
  if(dificuldade === "dificil"){
    if(numeroErros === 0){
      numeroErros = 0;
    }else if(numeroErros === 1){
      $('.cabeca').css('display', 'block');
      $('.corpo').css('display', 'block');
    }else{
      $('.cabeca').css('display', 'block');
      $('.corpo').css('display', 'block');
      $('.braco-direito').css('display', 'block');
      $('.braco-esquerdo').css('display', 'block');
      $('.perna-direita').css('display', 'block');
      $('.perna-esquerda').css('display', 'block');
      $('.cabeca').css('animation-duration', '1s');
      $('.cabeca').css('animation-name', 'ficarRoxo');
      $('.cabeca').css('animation-iteration-count', 'infinite');
      $('.cabeca').css('animation-direction', 'alternate');

      $('.braco-direito').css('animation-duration', '0.3s');
      $('.braco-direito').css('animation-name', 'debaterBracoDireito');
      $('.braco-direito').css('animation-iteration-count', 'infinite');
      $('.braco-direito').css('animation-direction', 'alternate');
      $('.braco-esquerdo').css('animation-duration', '0.3s');
      $('.braco-esquerdo').css('animation-name', 'debaterBracoEsquerdo');
      $('.braco-esquerdo').css('animation-iteration-count', 'infinite');
      $('.braco-esquerdo').css('animation-direction', 'alternate');

      $('.perna-direita').css('animation-duration', '0.3s');
      $('.perna-direita').css('animation-name', 'debaterPernaDireita');
      $('.perna-direita').css('animation-iteration-count', 'infinite');
      $('.perna-direita').css('animation-direction', 'alternate');

      $('.perna-esquerda').css('animation-duration', '0.3s');
      $('.perna-esquerda').css('animation-name', 'debaterPernaEsquerda');
      $('.perna-esquerda').css('animation-iteration-count', 'infinite');
      $('.perna-esquerda').css('animation-direction', 'alternate');
    }
  }else{
    if(numeroErros === 0){
      numeroErros = 0;
    }else if(numeroErros === 1){
      $('.cabeca').css('display', 'block');
    }else if(numeroErros === 2){
      $('.cabeca').css('display', 'block');
      $('.corpo').css('display', 'block');
    }else if(numeroErros === 3){
      $('.cabeca').css('display', 'block');
      $('.corpo').css('display', 'block');
      $('.braco-direito').css('display', 'block');
    }else if(numeroErros === 4){
      $('.cabeca').css('display', 'block');
      $('.corpo').css('display', 'block');
      $('.braco-direito').css('display', 'block');
      $('.braco-esquerdo').css('display', 'block');
      $('.perna-direita').css('display', 'block');
    }else{
      $('.cabeca').css('display', 'block');
      $('.corpo').css('display', 'block');
      $('.braco-direito').css('display', 'block');
      $('.braco-esquerdo').css('display', 'block');
      $('.perna-direita').css('display', 'block');
      $('.perna-esquerda').css('display', 'block');
      $('.cabeca').css('animation-duration', '1s');
      $('.cabeca').css('animation-name', 'ficarRoxo');
      $('.cabeca').css('animation-iteration-count', 'infinite');
      $('.cabeca').css('animation-direction', 'alternate');

      $('.braco-direito').css('animation-duration', '0.3s');
      $('.braco-direito').css('animation-name', 'debaterBracoDireito');
      $('.braco-direito').css('animation-iteration-count', 'infinite');
      $('.braco-direito').css('animation-direction', 'alternate');
      $('.braco-esquerdo').css('animation-duration', '0.3s');
      $('.braco-esquerdo').css('animation-name', 'debaterBracoEsquerdo');
      $('.braco-esquerdo').css('animation-iteration-count', 'infinite');
      $('.braco-esquerdo').css('animation-direction', 'alternate');

      $('.perna-direita').css('animation-duration', '0.3s');
      $('.perna-direita').css('animation-name', 'debaterPernaDireita');
      $('.perna-direita').css('animation-iteration-count', 'infinite');
      $('.perna-direita').css('animation-direction', 'alternate');

      $('.perna-esquerda').css('animation-duration', '0.3s');
      $('.perna-esquerda').css('animation-name', 'debaterPernaEsquerda');
      $('.perna-esquerda').css('animation-iteration-count', 'infinite');
      $('.perna-esquerda').css('animation-direction', 'alternate');
    }
  }
}

var verificaVitoriaPorLetra = function(){
  var cont = 0;
  var lenPalavra = palavra.length;
  letra.forEach(function(elem){
    if(elem.visible === true){
      cont++;
    }
  });
  if(cont === lenPalavra){
    alert('venceu');
    guardarPalavras(palavra);
    verificaPontuacao();
    $(location).attr('href','tela_jogo.php'+'?usuario='+usuario+'&dificuldade='+dificuldade+'&pontuacao='+pontuacao);
  } else
  if(numeroErros >= numeroDePossiveisErros){
    alert('perdeu');
    guardaPontuacao();
    retiraPontos();
    console.log("depois"+pontuacao);
    $(location).attr('href','tela_jogo.php'+'?usuario='+usuario+'&dificuldade='+dificuldade+'&pontuacao='+pontuacao);
  }
};

var mostraLetra = function(ltr){
  var ant = $('.letras-escolhidas').text();
  var str = ant.concat(' '+ltr);
  ant = str;
  $('.letras-escolhidas').text(str);
}
$('#btn-ranking').click(function(){
  var trocaPagina = confirm("Tem certeza que deseja sair? Seus pontos serão zerados!");
  if(trocaPagina)
  guardaPontuacao();
  retiraPontos();
  window.location.href='rankPage.php'+'?usuario='+usuario+'&dificuldade='+dificuldade+'&pontuacao='+pontuacao;
});

$('#botao-novoJogo').click(function(){
  $(location).attr('href','paginaInicial.php');
});

$('.botao-novoUsuario').click(function(){
  $(location).attr('href','paginaInicial.php');
});

$('#btn-dica').click(function(){
  var confirma = confirm('Você perderá 5 pontos utilizando a dica!');
  if(confirma){
    alert('Dica: '+dica);
    pontuacao-=5;
  }
});

$('#btn-inserePalavra').click(function(){
  var confirmacao = confirm('Seus pontos serão zerados!');
  if(confirmacao){
    $(location).attr('href','adicionarPalavra.php');
  }
});
$('#submit-palavra').click(function(){
  var nomePalavra = $('#campo-palavra').val();
  var dicaPalavra= $('#campo-dica').val();
  var link =  'salvarPalavras.php';
  $.post(link,
    { nome:nomePalavra,dica:dicaPalavra}
  ).done(function(){
    $('#formulario').each (function(){
      this.reset();
    });
    alert('Palavra inserida com sucesso!');
  });
});
$('#palpite').click(function(){
  var chute = prompt('Dê seu palpite!')
  if(chute != null){
    verificaVitoria(chute);
  }
})
var verificaVitoria = function(palpite){
  if(palpite.toUpperCase() === palavra.toUpperCase()){
    alert('venceu!' );
    guardarPalavras(palavra);
    verificaPontuacao();
  }else{
    alert('perdeu!');
    guardaPontuacao();
    retiraPontos();
  }
  $(location).attr('href','tela_jogo.php'+'?usuario='+usuario+'&dificuldade='+dificuldade+'&pontuacao='+pontuacao);
}
var guardarPalavras = function(palavraUsada){
  window.localStorage.setItem(palavraUsada, palavraUsada);
}
function verificaPontuacao(){
  guardaPontuacao();
  if(dificuldade==='normal'){
    pontuacao-=numeroErros*2;
  }else{
    pontuacao-=numErros*4;
  }
}
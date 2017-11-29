<DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8" />
    <title> Jogo da Forca</title>
    <link rel="stylesheet" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/rankPage.css"/>
  </head>
  <body>
    <div class="row">
      <div class="col-md-12 col-lg-12 col-sm-12 text-center" >
        <h1>Ranking</h1>
        <div class="col-md-3 col-lg-3 col-sm-3 text-center"></div>
        <div class="col-md-6 col-lg-6 col-sm-6 text-center">
          <h3>Top 5 Normal</h3>
          <ol class="ranking" id="normal"></ol>
          <h3> Top 5 Difícil </h3>
          <ol id="dificil"></ol>
        <button  id="botao-novoJogo" class="botao-novoJogo btn-primary btn-lg">Novo Jogo</button>
      </div>
      </div>
    </div>
    <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="js/hangman.js"></script>
    <script type="text/javascript">
      $.Deferred(function(){
        guardaUsuarioDificuldade();
        guardaPontuacao();
      }).done(preencheArrays());
    </script>
  </body>
</html>

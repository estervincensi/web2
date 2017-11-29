<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title> Hangman </title>
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/adicionarPalavra.css" />
  </head>
  <body>
    <h1 class="text-center"> Cadastro de Novas palavras </h1>
    <div class="col-md-3 col-lg-3"></div>
    <div class="col-md-6 col-lg-6">
      <div class="form-group margem">
        <form id="formulario">
        <label for="palavra">Palavra:</label>
        <input type="text" class="form-control" placeholder="Digite sua palavra" id="campo-palavra">
        <br>
        <label for="dica">Dica:</label>
        <input type="text" class="form-control" placeholder="Digite sua dica" id="campo-dica">
        </form>
        <br>
        <button type="submit" class="btn-sm btn-primary btn" id="submit-palavra">Submit</button>
      </div>
      <button type="submit" class="btn-md btn-primary botao-novoUsuario btn"> Novo Jogo </button>
    </div>


    <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="js/hangman.js"></script>
  </body>

</html>

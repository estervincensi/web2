<DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="utf-8" />
    <title> Jogo da Forca</title>
    <link rel="stylesheet" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/paginaInicial.css"/>
  </head>
  <body>
    <h1> Jogo da Forca </h1>
    <br>
    <p class="text-input">
      Nome:
      <input id="usuario" type="text">
    </p>
    <form id="dificuldade">
      <br>
      <p class="text-input">
        Dificuldade:
        <input type="radio" name="dificuldade" value="normal" checked> Normal
        <input type="radio" name="dificuldade" value="dificil"> Difícil
      </p>
    </form>
    <button id="btnIniciar" class="btn-primary btn-lg">Iniciar</button>
    <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="js/hangman.js"></script>
  </body>
  </html>
<?php
// Connect to MySQL
$link = mysqli_connect('localhost', 'root', '');
if (!$link) {
    die('Could not connect: ' . mysqli_error());
}

// Make my_db the current database
$db_selected = mysqli_select_db($link,'hangman');

if (!$db_selected) {
  // If we couldn't, then it either doesn't exist, or we can't see it.
  $sql = 'CREATE DATABASE hangman';

  if (mysqli_query($link,$sql)) {
      $conn = mysqli_connect('localhost','root','','hangman');
      $sqlcreate = "CREATE TABLE palavras (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, nome varchar(250) NOT NULL, dica varchar(1024) NOT NULL)";
      $sqlcreate2 = "CREATE TABLE usuarios (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,usuario varchar(250) NOT NULL,dificuldade varchar(250) NOT NULL,pontuacao int(11) NOT NULL)";
      mysqli_query($conn,$sqlcreate);
      mysqli_query($conn,$sqlcreate2);
      $sqlInsert = "INSERT INTO palavras(nome, dica) VALUES ('Java', 'Linguagem de programação orientada a objetos'),('HTML', 'Linguagem de marcação de hipertexto'),('CSS', 'Folha de estilo em cascata')";
      mysqli_query($conn, $sqlInsert);
      mysqli_close($conn);
  } else {
      echo 'Error creating database: ' . mysql_error() . "\n";
  }
}

mysqli_close($link);
?>

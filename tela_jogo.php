<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title> Hangman </title>
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/hangman.css" />
    <link rel="stylesheet" href="css/tela-jogo.css" />

  </head>
  <body>
    <header class="text-center">
      <h1>Hangman</h1>
      <div id="caixa" class="font-times margin-top color-none font-size"></div>
      <br>
    </header>
    <div class="row color-none">
      <div class="col-md-6 col-sm-6 col-lg-6 color-none">
        <div class="teclado color-none">
          <input id="Q" type="button" value="Q" class="btn-primary btn-sm botao-teclado">
          <input id="W" type="button" value="W" class="btn-primary btn-sm botao-teclado">
          <input id="E" type="button" value="E" class="btn-primary btn-sm botao-teclado">
          <input id="R" type="button" value="R" class="btn-primary btn-sm botao-teclado">
          <input id="T" type="button" value="T" class="btn-primary btn-sm botao-teclado">
          <input id="Y" type="button" value="Y" class="btn-primary btn-sm botao-teclado">
          <input id="U" type="button" value="U" class="btn-primary btn-sm botao-teclado">
          <input id="I" type="button" value="I" class="btn-primary btn-sm botao-teclado">
          <input id="O" type="button" value="O" class="btn-primary btn-sm botao-teclado">
          <input id="P" type="button" value="P" class="btn-primary btn-sm botao-teclado">
          <br>
          <input id="A" type="button" value="A" class="btn-primary btn-sm botao-teclado">
          <input id="S" type="button" value="S" class="btn-primary btn-sm botao-teclado">
          <input id="D" type="button" value="D" class="btn-primary btn-sm botao-teclado">
          <input id="F" type="button" value="F" class="btn-primary btn-sm botao-teclado">
          <input id="G" type="button" value="G" class="btn-primary btn-sm botao-teclado">
          <input id="H" type="button" value="H" class="btn-primary btn-sm botao-teclado">
          <input id="J" type="button" value="J" class="btn-primary btn-sm botao-teclado">
          <input id="K" type="button" value="K" class="btn-primary btn-sm botao-teclado">
          <input id="L" type="button" value="L" class="btn-primary btn-sm botao-teclado">
          <input id="Ç" type="button" value="Ç" class="btn-primary btn-sm botao-teclado">
        </br>
          <input id="Z" type="button" value="Z" class="btn-primary btn-sm botao-teclado">
          <input id="X" type="button" value="X" class="btn-primary btn-sm botao-teclado">
          <input id="C" type="button" value="C" class="btn-primary btn-sm botao-teclado">
          <input id="V" type="button" value="V" class="btn-primary btn-sm botao-teclado">
          <input id="B" type="button" value="B" class="btn-primary btn-sm botao-teclado">
          <input id="N" type="button" value="N" class="btn-primary btn-sm botao-teclado">
          <input id="M" type="button" value="M" class="btn-primary btn-sm botao-teclado">
        </br>
          <input id="espaco" type="button" value=" " class="btn-primary btn-sm botao-teclado" style="width:120px">
        </div>

        <div class="text-center color-none">
          <input id="palpite" type="button" value="Palpite" class="btn-primary btn-md btn">
          <input id="btn-dica" type="button" value="Dica" class="btn-primary btn-md btn">
          <h4 class="letras-escolhidas font-times">Letras usadas:</h4>
          <br>
          <button id="btn-ranking" class="btn-primary btn-lg">Ranking</button>
          <button id="btn-inserePalavra" class="btn-primary btn-lg">Inserir Nova Palavra</button>
        </div>
      </div><!--col-->
      <div class="col-md-6 col-sm-6 col-lg-6 color-none">
        <div class="cabeca corBoneco">
        </div>
        <div id="suspende">
          <div id="desce">
          </div>

          <div id="prende">
          </div>

          <div class="corpo corBoneco">
            <div class="braco-esquerdo corBoneco">
            </div>

            <div class="braco-direito corBoneco">
            </div>

            <div class="perna-esquerda corBoneco">
            </div>

            <div class="perna-direita corBoneco">
            </div>
          </div>

        </div>

        <div id="base">

        </div>
      </div><!--col-->
    </div> <!--ROW-->


    <br>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="js/hangman.js"></script>
    <script type="text/javascript">
      $(function(){
        guardaUsuarioDificuldade();
        recebePalavras();
      });
    </script>

  </body>
</html>

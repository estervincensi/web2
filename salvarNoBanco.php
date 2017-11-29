<?php
	$dificuldade = $_POST['dificuldade'];
	$user = $_POST['usuario'];
	$pontuacao = $_POST['pontuacao'];
	$conn = new mysqli("localhost", "root", "", "hangman");
	$query = "insert into usuarios (usuario,dificuldade,pontuacao) values ('$user','$dificuldade',$pontuacao)";
	echo $query;
	if (mysqli_query($conn, $query)) {
	    echo "console.log('ok')";
	} else {
	    echo "Error: " . $query . "<br>" . mysqli_error($conn);
	    echo "console.log('erro')";
	}

	mysqli_close($conn);
?>
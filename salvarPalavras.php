<?php
	$palavra = $_POST['nome'];
	$dica = $_POST['dica'];
	$conn = new mysqli("localhost", "root", "", "hangman");
	$query = "insert into palavras (nome,dica) values ('$palavra','$dica')";
	echo $query;
	if (mysqli_query($conn, $query)) {
	    echo "ok";
	} else {
	    echo "Error: " . $query . "<br>" . mysqli_error($conn);
	}

	mysqli_close($conn);
?>
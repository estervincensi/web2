<?php
	$mysqli = new mysqli("localhost", "root", "", "hangman");
	$usuarios = array();
	if (mysqli_connect_errno()) {
	    printf("Connect failed: %s\n", mysqli_connect_error());
	    exit();
	}
	 
	$query = "SELECT * FROM usuarios";

	if ($result = $mysqli->query($query)) {
	    while ($row = $result->fetch_assoc()) {
	        $usuarios[] = $row;
	    }
	    $result->close();
	}

	$mysqli->close();
	header("Content-type:application/json"); 
	echo json_encode($array = array('usuarios' => $usuarios));
?>
<?php
$mysqli = new mysqli("localhost", "root", "", "hangman");
$palavras = array();
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
 
$query = "SELECT * FROM palavras";

if ($result = $mysqli->query($query)) {
    while ($row = $result->fetch_assoc()) {
        $palavras[] = $row;
    }
    $result->close();
}

$mysqli->close();
header("Content-type:application/json"); 
echo json_encode($array = array('palavras' => $palavras));
?>
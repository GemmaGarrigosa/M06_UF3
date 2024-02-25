<?php

    if (isset($_POST['inputnom'])){
        $nom = $_POST['inputnom'];
        $email = $_POST['inputemail'];
        $passwd = $_POST['inputpwd'];
        $passwdrpt =$_POST['inputconfpwd'];
        $codipostal = $_POST['inputcodi'];


        echo "NOM:". $nom. "<br>";
        echo "EMAIL:". $email. "<br>";
        echo "CONTRASSENYA:". $passwd. "<br>";
        echo "CONFIRMACIO DE CONTRASSENYA:". $passwdrpt. "<br>";
        echo "CODI POSTAL:". $codipostal. "<br>";
    } else {
        echo "No s'han rebut les dades bé";

        
    }
?>
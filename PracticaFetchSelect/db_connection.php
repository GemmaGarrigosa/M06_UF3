<?php

  include("dbConf.php"); //rebem les constants per a fer la connexió


    //intentem conectar a la BBDD
    try {
      $conn = mysqli_connect(db_host, db_usuario, db_passwd, db_nombre);
    }catch (Exception $e){
      echo "No s'ha pogut connectar amb la base de dades", $e->getMessage(),"\n";
      exit;
    }


?>
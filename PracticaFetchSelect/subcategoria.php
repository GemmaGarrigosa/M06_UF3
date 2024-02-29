<?php

include ('db_connection.php');
    
    $cat = $_POST["categoria"];
    $consulta = "SELECT * FROM `subcategories` WHERE `categoria_id`= $cat";

    $result = mysqli_query($conn,$consulta);

    while ($row = $result -> fetch_assoc()){
        $object = new stdClass();
        $object->nom = $row["nom"];
        $object->id = $row["id"];
        $return[] = $object;
    }
    
    echo json_encode($return);
    
?>
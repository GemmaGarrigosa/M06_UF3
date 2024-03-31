<?php

    include('db_connection.php');

    $query = "SELECT * FROM `districtes`";

    $result = mysqli_query($conn,$query);

    while ($row = $result -> fetch_assoc()){
        $object = new stdClass();
        $object->slug = $row["slug"];
        $object->name = $row["name"];
        $object->id = $row["id"];
        $return[] = $object;
    }
    
    echo json_encode($return);
?>
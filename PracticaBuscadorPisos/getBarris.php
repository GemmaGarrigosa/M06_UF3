<?php

    include('db_connection.php');

    $district_id = $_POST['id'];
    
    $query = "SELECT * FROM `barris` WHERE `id_districte`= $district_id ORDER BY `id` ASC";
    
    $result = mysqli_query($conn,$query);
    
    while ($row = $result -> fetch_assoc()){
        $object = new stdClass();
        $object->name = $row["name"];
        $object->id = $row["id"];
        $return[] = $object;
    }
    
    echo json_encode($return);
?>
<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$result = array();

$foodID = $data['foodID'];
// echo $foodID;
$foods = mysqli_fetch_array(mysqli_query($con, "SELECT store FROM `foods` WHERE id=$foodID"));
// echo $foods['store'];
$result['store'] = $foods['store'];

echo json_encode($result);

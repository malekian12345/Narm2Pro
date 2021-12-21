<?php
include "config.php";
$input = file_get_contents('php://input');
// $data = json_decode($input, true);
$data = array();

$foods = mysqli_query($con, "SELECT id,foodName,picturePath,price,store FROM `foods`");
while($row = mysqli_fetch_array($foods)){
  // echo var_dump($row) ;
  // echo '<br>';
  $data['id'] = $row['id'];
  $data['foodName'] = $row['foodName'];
  $data['picturePath'] = $row['picturePath'];
  $data['price'] = $row['price'];
  $data['store'] = $row['store'];

  $result[] = $data;
}
echo json_encode($result);

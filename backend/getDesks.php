<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$data = array();

$desks = mysqli_query($con, "SELECT id,capacity,PricePerHour,PicturePath FROM `desk`;");
while($row = mysqli_fetch_array($desks)){
  // echo var_dump($row);
  $data['id'] = $row['id'];
  $data['capacity'] = $row['capacity'];
  $data['PicturePath'] = $row['PicturePath'];
  $data['PricePerHour'] = $row['PricePerHour'];

  $result[] = $data;
}
echo json_encode($result);

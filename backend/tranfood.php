<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$result = array();

$iget = $data['foodDD'];
$c = 0;
$customer_id = $data['customerID'];
$dataFr = $data['date_reserved'];
$timeFr = $data['time_reserved'];
$good = true;
$full = true;
while (count($iget) > $c) {
  // echo $iget[$c]['id']; //food id
  // echo $iget[$c]['foodNumber'];//food number
  // echo $iget[$c]['foodTotal_price'];//foodTotal_price

  $food_id = $iget[$c]['id'];
  $foodNumber = $iget[$c]['foodNumber'];
  $totalPrice = $iget[$c]['foodTotal_price'];

  $checkStoreFood = mysqli_fetch_array(mysqli_query($con, "SELECT `store` FROM `foods` WHERE id='$food_id'"));

  if ($checkStoreFood['store'] >= $foodNumber) {

    //   $q = mysqli_query($con, "INSERT INTO `tranfood` (`customer_id`, `food_id`, `food_number`, `dateFr`, `TimeFr`, `totalPriceF`)
    //  VALUES ('$customer_id', '$food_id', '$foodNumber', '$dataFr', '$timeFr', '$totalPrice')");

    //   $newStoredFood = $checkStoreFood['store'] - $foodNumber;
    //   $q2 = mysqli_query($con,"UPDATE `foods` SET `store`='$newStoredFood' WHERE id = '$food_id'");
    //   if ($q) {
    //     // $result[$c+1] = "Success";
    //   } else {
    //     $result['msg'] = "Error";
    //     $good = false;
    //   }
  } else {
    $full = false;
    $result['msg'] = "$food_id";
    $result['newStore'] = $checkStoreFood['store'];
  }
  $c++;
}

if ($full) {
  $c = 0;
  while (count($iget) > $c) {
    $food_id = $iget[$c]['id'];
    $foodNumber = $iget[$c]['foodNumber'];
    $totalPrice = $iget[$c]['foodTotal_price'];

    $q = mysqli_query($con, "INSERT INTO `tranfood` (`customer_id`, `food_id`, `food_number`, `dateFr`, `TimeFr`, `totalPriceF`)
   VALUES ('$customer_id', '$food_id', '$foodNumber', '$dataFr', '$timeFr', '$totalPrice')");

    $newStoredFood = $checkStoreFood['store'] - $foodNumber;
    $q2 = mysqli_query($con, "UPDATE `foods` SET `store`='$newStoredFood' WHERE id = '$food_id'");
    if ($q) {
      // $result[$c+1] = "Success";
    } else {
      $result['msg'] = "Error";
      $good = false;
    }
    $c++;
  }
  if($good){
    $result['status'] = "Success";
  }else{
    $result['status'] = "Error";
  }
} else if (!$full) {
  $result['status'] = "MoreThanStored";
}
// echo var_dump($result);
// if ($q) {
//   http_response_code(201);
//   $result['status'] = "Success";
// }else {
//   http_response_code(422);
//   $result['status'] = "Error";
// }

echo json_encode($result);
// echo mysqli_error($con);

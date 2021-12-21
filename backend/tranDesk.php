<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$result = array();

$iget = $data['deskDD']; //id desk / total_price
// echo var_dump($iget);
$c = 0;
$customer_id = $data['customerID'];
$dataDr = $data['date_reserved'];
$timeST = $data['start_time'];
$timeEN = $data['end_time'];

$canInsert = true;
// $tt = ((count($iget) > $c));
// echo $tt;
// echo $tt;
// echo $tt;
// echo $tt;
//! count($iget) > $c && $canInsert not work

// while(count($iget) > $c){
//   echo "fuck u";
//   $c++;
// }

while (count($iget) > $c) {
  $desk_id = $iget[$c]['id'];
  // echo $desk_id;
  // continue;
  $q1 = mysqli_fetch_array(mysqli_query($con, "SELECT StartTime,EndTime FROM `trandesk` WHERE desk_id='$desk_id' AND dateDr='$dataDr' AND StartTime<'$timeEN' AND StartTime>'$timeST';"));
  // echo var_dump($q1);
  if ($q1) {
    $result['status'] = 'reserved';
    $result['tableR1'] = array(
      "tableId"=>$desk_id,
      "startTime"=>$q1['StartTime'],
      "EndTime"=>$q1['EndTime']
    );
    $canInsert = false;
  }
  $q2 = mysqli_fetch_array(mysqli_query($con, "SELECT StartTime,EndTime FROM `trandesk` WHERE desk_id='$desk_id' AND dateDr='$dataDr' AND EndTime<'$timeEN' AND EndTime>'$timeST';"));
  // echo var_dump($q2);
  if ($q2) {
    $result['status'] = 'reserved';
    $result['tableR2'] = array(
      "tableId"=>$desk_id,
      "startTime"=>$q2['StartTime'],
      "EndTime"=>$q2['EndTime']
    );
    $canInsert = false;
  }
  $q3 = mysqli_fetch_array(mysqli_query($con, "SELECT StartTime,EndTime FROM `trandesk` WHERE desk_id='$desk_id' AND dateDr='$dataDr' AND EndTime>'$timeEN' AND StartTime<'$timeST';"));
  // echo var_dump($q3);
  if ($q3) {
    // $age = array("Peter"=>35, "Ben"=>37, "Joe"=>43);
    $result['status'] = 'reserved';
    $result['tableR3'] = array(
      "tableId"=>$desk_id,
      "startTime"=>$q3['StartTime'],
      "EndTime"=>$q3['EndTime']
    );
    $canInsert = false;
  }
  if(!$canInsert){
    break;
  }
  $c++;
}
$c = 0;
// echo count($iget) > $c;
if ($canInsert) {
  while (count($iget) > $c) {
    // echo $iget[$c]['id']; //desk id
    // echo $iget[$c]['totalPrice']; //desk id
    // echo ' ';
    $desk_id = $iget[$c]['id'];
    $totalPrice = $iget[$c]['totalPrice'];
    $q = mysqli_query($con, "INSERT INTO `trandesk` (`customer_id`, `desk_id`, `dateDr`, `StartTime`, `EndTime`, `totalPriceD`)
     VALUES ('$customer_id', '$desk_id', '$dataDr', '$timeST', '$timeEN', '$totalPrice');");
    $c++;
  }
  $result['status'] = 'Success';
}
echo json_encode($result);

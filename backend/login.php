<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$result = array();

// $data['email'] = 'mhm@gmail.com';
// $data['pass'] = '5';
$email = $data['email'];
// $password = md5($data['pass']);
$password = $data['pass'];

$checkEmailExist = mysqli_fetch_array(mysqli_query($con, "SELECT email FROM `customer` WHERE customer.email = '$email'"));
if (isset($checkEmailExist)) {
  $result['isUser'] = true;
  $checkLogin = mysqli_fetch_array(mysqli_query($con, "SELECT id,name FROM `customer` WHERE customer.email = '$email' AND customer.pass = '$password'"));

  if (isset($checkLogin['id'])) {
    $result['login'] = true;
    $result['id'] = $checkLogin['id'];
    $result['name'] = $checkLogin['name'];
  } else {
    $result['login'] = false;
    $result['message'] = "wrong";
  }
} else {
  $result['isUser'] = false;
}

echo json_encode($result);

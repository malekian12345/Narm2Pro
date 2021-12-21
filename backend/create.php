<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$result = array();
$name = $data['name'];
$email = $data['email'];
// $pass = md5($data['pass']); //with md5 password will be store endcoded
$pass = $data['pass'];

// $q = mysqli_query($con , "INSERT INTO 'student' ('year' , 'studentOne' , 'studentTwo' VALUES ('$year','$studentOne','$studentTwo')");
//! the above query not work beacuse of using ( '' ) single qutesion
// $q = mysqli_query($con , "INSERT INTO `student` ( `year`, `studentOne`, `studentTwo`) VALUES ( '', '', '')");

$checkemail = mysqli_fetch_array(mysqli_query($con, "SELECT email FROM `customer` WHERE customer.email = '$email'"));
if (isset($checkemail['email'])) {
  $result['status'] = "Error";
  $result['message'] = "email is already exist";
} else {
  $q = mysqli_query($con, "INSERT INTO customer ( name, email, pass) VALUES ( '$name','$email','$pass')");
  if ($q) {
    http_response_code(201);
    $result['status'] = "Success";
  } else {
    http_response_code(422);
    $result['status'] = "Error";
  }
}

echo json_encode($result);
echo mysqli_error($con);

<?php
// header("Content-Type: application/json");
// header("Access-Control-Allow-Credentials: true ");
// header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST , DELETE , PUT , PATCH");
// header("Access-Control-Allow-Headers: token , Content-type");
header("Access-Control-Allow-Headers:Content-type");
header('Access-Control-Max-Age: 1728000');
header('Content-Length: 0');
// header('Content-Type: text/plain');
header("Content-Type: application/json");
// header("Access-Control-Allow-Credentials: true ");
 $con = mysqli_connect("localhost","root","","resturant") or die('could not connect DB');

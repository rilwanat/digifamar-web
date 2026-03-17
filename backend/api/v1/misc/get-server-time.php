<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


$year = date("Y");
$month = date("m");
$day = date("d");
$hour = date("H");
$minute = date("i");
$second = date("s");

//$temp=array();
$temp["STIME"]=array();

$temp2 = array(
    "#Year" => $year,
    "#Month" =>$month, 
    "#Day" =>$day, 
    "#Hour" =>$hour, 
    "#Minute" =>$minute, 
    "#Second" =>$second);

array_push($temp["STIME"], $temp2);

 
//return php server time
echo json_encode($temp);

?>
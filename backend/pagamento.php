<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

include "DBConnection.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

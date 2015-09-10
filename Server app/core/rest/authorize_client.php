<?php
include '../config.php';
include '../db_api.php';
include '../bc_api.php';
$db = new Database();
$bc = new BuddsCloud();
if(!$db->connect()){
	header("HTTP/1.0 500 Internal Server Error");
    die("Connection failed: " . $db->getResult());
}

$client_id = $db->escapeString($_POST['client_id']);

$params = array(
	'is_authorized' => 1,
);
if(!$db->update("clients",$params,"client_id=".$client_id)){
	header("HTTP/1.0 500 Internal Server Error");
    die("Connection failed: " . $db->getResult());
}
else{
		echo "success";
}
?>
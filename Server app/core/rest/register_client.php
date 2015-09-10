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

$client_ip = $db->escapeString($_POST['client_ip']);
$client_name = $db->escapeString($_POST['client_name']);
$client_mac = $db->escapeString($_POST['client_mac']);

$params = array(
	'client_id' => '',
	'client_system_name' => $client_name,
	'ip_address' => $client_ip,
	'mac_address' => $client_mac,
	'is_authorized' => 0,
);
if(!$db->insert('clients',$params)){
	header("HTTP/1.0 500 Internal Server Error");
    die("Connection failed: " . $db->getResult());
}
else{
		$id = $db->getResult();
		echo $id[0];
}
?>
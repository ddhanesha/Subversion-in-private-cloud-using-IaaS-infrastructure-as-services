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
$db->select("clients","is_authorized","","client_id=".$client_id);
if($db->numRows()==0){
	header("HTTP/1.0 500 Internal Server Error");
    die("Client does't present: " . $db->getResult());
}
$res = $db->getResult();
$auth = $res[0]['is_authorized'];
echo $auth;
?>
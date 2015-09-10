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

$object_id = $db->escapeString($_POST['object_id']);
$json_obj = array();
$db->sql("SELECT c.client_system_name,v.version_id,v.version_number,v.physical_path,v.created_time FROM clients c, versions v WHERE c.client_id=v.client_id AND v.object_id='$object_id' ORDER BY v.version_number DESC");
	$j = $db->numRows();
if($j>0){
	$res = $db->getResult();
	for($i=0;$i<$j;$i++){
		$data = array();
		$data['client_system_name'] = $res[$i]['client_system_name'];
		$data['version_id'] = $res[$i]['version_id'];
		$data['version_number'] = $res[$i]['version_number'];
		$data['physical_path'] = $res[$i]['physical_path'];
		$data['created_time'] = date('d-m-Y h:i:s',$res[$i]['created_time'] +19800);
		$json_obj[] = $data;
	}
}
echo json_encode(array("data"=>$json_obj));
?>
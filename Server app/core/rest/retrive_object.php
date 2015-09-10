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

$last_version_id = $db->escapeString($_POST['last_version_id']);
$latest_version_id = $last_version_id;
$version_query = $db->select("versions",'*',"","version_id>".$last_version_id."","version_id DESC");
		$total = $db->numRows();
		$res = $db->getResult();
		if($total!=0){
			$latest_version_id = $res[0]['version_id'];
		}
		$json_obj = array();
		$object_ids = array();
		for($i=0;$i<$total;$i++){
			if(!in_array($res[$i]['object_id'],$object_ids)){
				$object_ids[] = $res[$i]['object_id'];
				$data = array();
				$data['version_id'] = $res[$i]['version_id'];
				$data['version_number'] = $res[$i]['version_number'];
				$data['object_id'] = $res[$i]['object_id'];
				$data['client_id'] = $res[$i]['client_id'];
				$path = explode("-_-",$res[$i]['physical_path']);
				$data['file_decoded_path'] = base64_decode($path[0]);
				$data['physical_path'] = $res[$i]['physical_path'];
				$json_obj[] = $data;
			}
		}
		echo json_encode(array("data"=>$json_obj,"latest_version_id" => $latest_version_id));

?>
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

$object_hash = $db->escapeString($_POST['hash']);
$chunk_count = $db->escapeString($_POST['chunk_count']);
$chunk_total = $db->escapeString($_POST['chunk_total']);
$client_id = $db->escapeString($_POST['client_id']);
$hash_explode = explode("-_-",$object_hash);
$physical_path = base64_decode($hash_explode[0]);
$path_explode = explode("/",$physical_path);
$object_name = array_pop($path_explode);



$chunk_dir = "../../chunks/";
$chunk_file = $chunk_dir . basename($_FILES["chunk"]["name"]);
move_uploaded_file($_FILES["chunk"]["tmp_name"], $chunk_file);   //Saving chunk

$object_dir = "../../objects/";
$fp = fopen($object_dir.$object_hash, "a");
$putdata = file_get_contents($chunk_file);
fwrite($fp, $putdata);
fclose($fp);
unlink($chunk_file);

if($chunk_count == ($chunk_total - 1)){
	//All parts are uploaded and ready to create new object or subversion
	
	$object_avail_query = $db->select("objects","object_id","","logical_path LIKE '".$physical_path."'");
	if($db->numRows()==0)
	{
		//Object doesn't present in server, so create new record
		$params = array(
			"object_id" => '',
			"identity" => $object_name,
			"logical_path" => $physical_path
		);
		$db->insert("objects",$params);
		//Creating first version
		$inserted_id_array = $db->getResult();
		$params = array(
			"version_id" => '',
			"object_id" => $inserted_id_array[0],
			"client_id" => $client_id,
			"version_number" => 1,
			"physical_path" => $object_hash,
			"created_time" => time()
		);
		$db->insert("versions",$params);
	}
	else{
		$object_query = $db->select("objects","object_id","","logical_path LIKE '".$physical_path."'");
		$res = $db->getResult();
		$object_id = $res[0]['object_id'];
		
		$cur_version_query = $db->select("versions","version_number","","object_id='".$object_id."'","version_id DESC","1");
		$res = $db->getResult();
		$cur_version_number = intval($res[0]['version_number']) + 1;
		
		
		$params = array(
			"version_id" => '',
			"object_id" => $object_id,
			"client_id" => $client_id,
			"version_number" => $cur_version_number,
			"physical_path" => $object_hash,
			"created_time" => time()
		);
		$db->insert("versions",$params);
	}
}




?>
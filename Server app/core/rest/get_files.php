<?php
error_reporting(E_ALL);
include '../config.php';
include '../db_api.php';
include '../bc_api.php';
$db = new Database();
$bc = new BuddsCloud();
if(!$db->connect()){
	header("HTTP/1.0 500 Internal Server Error");
    die("Connection failed: " . $db->getResult());
}

$path = $_POST['path'];
$json_obj = array();
$db->sql("SELECT * FROM objects WHERE logical_path LIKE '".$path."%'");
//$db->sql("SELECT c.client_system_name,v.version_id,v.version_number,v.physical_path,v.created_time FROM clients c, versions v WHERE c.client_id=v.client_id AND v.object_id='$object_id'");
$dir_list = array();
$j = $db->numRows();
if($j>0){
	$res = $db->getResult();
	for($i=0;$i<$j;$i++){
		
		$data = array();
		$logical_path = $res[$i]['logical_path'];
		$identity = $res[$i]['identity'];
		$object_id = $res[$i]['object_id'];
		
		$path_parts = pathinfo($logical_path);
		$dir = str_replace($identity,"",$logical_path);
		//echo '<br>'.$logical_path . '====' . $dir . '====' . $path;
		if($dir == $path){
			$db->select("versions","*","","object_id='$object_id'","version_number DESC",1);
			$res1 = $db->getResult();
			$ext = $path_parts;//pathinfo($logical_path);
			if(in_array(strtolower($ext['extension']),array("tif","png","gif","jpg","bmp"))){
				$data['type'] = "Image file";
			}
			else if(in_array(strtolower($ext['extension']),array("3gp","mkv","avi","mp4"))){
				$data['type'] = "Video file";
			}
			else if(in_array(strtolower($ext['extension']),array("mp3","ac3","wav","aac"))){
				$data['type'] = "Audio file";
			}
			else if(in_array(strtolower($ext['extension']),array("txt","doc","docx","rtf","pdf"))){
				$data['type'] = "Document file";
			}
			else if(in_array(strtolower($ext['extension']),array("xls","xlsx"))){
				$data['type'] = "Spreadsheet file";
			}
			else if(in_array(strtolower($ext['extension']),array("ppt","pptx"))){
				$data['type'] = "Presentation file";
			}
			else if(in_array(strtolower($ext['extension']),array("exe","msi"))){
				$data['type'] = "Executables";
			}
			else if(in_array(strtolower($ext['extension']),array("zip","rar","7z","gz","tar"))){
				$data['type'] = "Archive";
			}
			else{
				$data['type'] = "File";
			}
			$data['physical_path'] = $res1[0]['physical_path'];
			$data['identity'] = $identity;
			$data['object_id'] = $object_id;
			$data['created_time'] = date('d-m-Y h:i:s',$res1[0]['created_time'] + 19800);
			$json_obj[] = $data;
		}
		else{
			$k = strlen($path);
			$exclude = substr($logical_path,$k);//str_replace($path,"",$logical_path);
			$parts = explode("/",$exclude);
			$dirname = $parts[0];
			if(!in_array($dirname,$dir_list)){
				$data['type'] = "Folder";
				$data['created_time'] = '';
				$data['identity'] = $dirname;
				$json_obj[] = $data;
				$dir_list[] = $dirname;
			}
		}
	}
}
echo json_encode(array("data"=>$json_obj));
?>
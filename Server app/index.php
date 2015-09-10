<?php
session_start();
include 'core/config.php';
include 'core/db_api.php';
include 'core/bc_api.php';
$db = new Database();
$bc = new BuddsCloud();
if(!$db->connect()){
	header("HTTP/1.0 500 Internal Server Error");
    die("Connection failed: " . $db->getResult());
}
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>BuddsCloud Portal</title>
<?php
include 'meta.php';
?>
<script type="text/javascript">
function loadList(path){
	$("#path_text").text(path);
	$.post("core/rest/get_files.php", {path: path}, function(result){
		var html = '';
		for(var i=0;i<result.data.length;i++){
			var icon_class = "file-o";
			if(result.data[i].type=="Folder"){
				icon_class="folder-o";
			}
			if(result.data[i].type=="Image file"){
				icon_class="picture-o";
			}
			if(result.data[i].type=="Video file"){
				icon_class="file-video-o";
			}
			if(result.data[i].type=="Audio file"){
				icon_class="file-audio-o";
			}
			if(result.data[i].type=="Document file"){
				icon_class="file-text-o";
			}
			if(result.data[i].type=="Spreadsheet file"){
				icon_class="file-excel-o";
			}
			if(result.data[i].type=="Presentation file"){
				icon_class="file-powerpoint-o";
			}
			if(result.data[i].type=="Executables"){
				icon_class="cogs";
			}
			if(result.data[i].type=="Archive"){
				icon_class="file-archive-o";
			}
			var onclicktext = 'downloadFile("'+result.data[i].physical_path+'","'+result.data[i].identity+'")';
			var temp='';
			if(result.data[i].type=="Folder"){
				onclicktext='loadList("'+$("#path_text").text()+result.data[i].identity+'/")';
			}
			else{
				temp='<td><a href="javascript:void();" data-toggle="modal" data-target="#myModal" onclick="showVersions(\''+result.data[i].object_id+'\',\''+result.data[i].identity+'\')" title="Show versions"><i class="fa fa-code-fork"></i></a></td>';
			}
			html += '<tr><td onclick=\''+onclicktext+'\'><i class="fa fa-'+icon_class+'"></i></td><td onclick=\''+onclicktext+'\'>'+result.data[i].identity+'</td><td>'+result.data[i].type+'</td><td>'+result.data[i].created_time+'</td>'+temp+'</tr>';
		}
        $("#content_list").html(html);
    },"json");
}
function downloadFile(file,identity){
	var win = window.open("http://192.168.2.11/download.php?file="+file+"&identity="+identity, '_blank');
  	win.focus();
}
function showVersions(object_id,identity){
	$("#versionModalLabel").text(identity);
	$.post("core/rest/get_versions.php", {object_id: object_id}, function(result){
		var html = '';
		for(var i=0;i<result.data.length;i++){
			html += '<tr><td onclick="downloadFile(\''+result.data[i].physical_path+'\')">Version '+result.data[i].version_number+'</td><td>'+result.data[i].created_time+'</td><td>'+result.data[i].client_system_name+'</td><td><a href="javascript:void();" onclick="downloadFile(\''+result.data[i].physical_path+'\',\''+result.data[i].identity+'\')"><i class="fa fa-download"></i></a></td></tr>';
		}
        $("#version_list").html(html);
    },"json");
}
</script>
</head>

<body>
<?php include 'nav.php'; ?>
	<div class="global_center_wrapper jumbotron">
    	<center><a href="<?php echo BC_SITE_HOST; ?>"><img src="<?php echo BC_SITE_HOST; ?>assets/icon.png" alt="BuddsCloud Logo"></a></center>
        <hr color="#999" />
		<h2>BuddsCloud - <span style="color:#666666;" id="path_text">/</span></h2>
        <hr color="#999" />
        <table class="table table-hover" id="content_list">
        </table>
        <div id="test">
        </div>
	</div>
    
    
    
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="versionModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
        <table class="table table-hover" id="version_list">
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>




<?php include 'core/footer.php'; ?>
        <script>
			loadList("/");
            $(document).ready(function() {
                $.material.init();
            });
        </script>    
</body>
</html>

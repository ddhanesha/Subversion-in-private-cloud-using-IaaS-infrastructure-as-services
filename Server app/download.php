<?php
    // Fetch the file info.
    $filePath = "objects/".$_GET['file'];
	$identity = "objects/".$_GET['identity'];
	rename($filePath,$identity);
    if(file_exists($identity)) {
        $fileName = basename($identity);
        $fileSize = filesize($identity);

        // Output headers.
        header("Cache-Control: private");
        header("Content-Type: application/stream");
        header("Content-Length: ".$fileSize);
        header("Content-Disposition: attachment; filename=".$fileName);

        // Output file.
        readfile ($identity);  
		rename($identity,$filePath);                 
        exit();
    }
    else {
        die('The provided file path is not valid.');
    }
?>
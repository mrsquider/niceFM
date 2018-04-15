<?php
	$dir = "../ips/*";
	$maxlisten=0;
	$mylisten=0;
	$listener="";
	foreach(glob($dir) as $file){
		$cf = fopen($file, "r");
		$thislisten = fread($cf, filesize($file) );
		if ($thislisten > $maxlisten){
			$maxlisten=$thislisten;
			$listener=$file;
		}
		if ("../ips/" . $_SERVER['REMOTE_ADDR'] . ".txt" == $file){
			$mylisten = $thislisten;
		}
	}
	if ("../ips/" . $_SERVER['REMOTE_ADDR'] . ".txt" == $listener){
		echo ", you are #1!";
	}else{
		$seconds = $maxlisten - $mylisten;
		$hours = floor($seconds / 3600);
		$mins = floor(($seconds - ($hours*3600)) / 60);
		$secs = floor($seconds % 60);
		echo ", you are " . $hours . ":" . $mins . ":" . $secs  . " behind";
	}
?>

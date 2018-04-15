<?php
	$dir = "../ips/*";
	$tc = 0;
	foreach(glob($dir) as $file){  
		$tc = $tc + 1;
	}
	echo $tc;
?>
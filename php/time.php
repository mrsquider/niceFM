<?php

	$ip = $_SERVER['REMOTE_ADDR'];
	$mode = $_GET['mode'];
	$currenttime = $_GET['currenttime'];

	if ($mode == 1) {
		if (!file_exists("../ips/" . $ip . ".txt")) {
			$timelog = fopen("../ips/" . $ip . ".txt", "w");
			fwrite($timelog, 0);
			fclose($timelog);
		}
		$timelog = fopen("../ips/" . $ip . ".txt", "r");
		$dat = fread($timelog, filesize("../ips/" . $ip . ".txt"));
		echo $dat;
	}elseif ($mode == 2) {
		$timelog = fopen("../ips/" . $ip . ".txt", "w");
		fwrite($timelog, $currenttime);
		fclose($timelog);
	}

?>
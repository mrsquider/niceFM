<?php

	$hits = fopen('../stats/hits.txt', "r");
	$dat = fread($hits, filesize('../stats/hits.txt') );
	echo $dat + 1;
	fclose($hits);
	$hits = fopen('../stats/hits.txt', "w");
	fwrite($hits, $dat + 1);
	fclose($hits);

?>

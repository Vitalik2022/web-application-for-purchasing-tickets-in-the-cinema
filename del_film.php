<?php

	if( isset($_GET['id_film']) ){
		include '../../php/functions.php';

		$db = connectDB();
		$sql='delete from films where id='.$_GET['id_film'];
		//echo $sql;
		$db->query($sql);
		echo "delete film - OK";
	}
	
?>
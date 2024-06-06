<?php
	if( isset($_GET['id_session']) ){
		include '../../php/functions.php';

		$db = connectDB();
		$sql='delete from sessions where id='.$_GET['id_session'];
		//echo $sql;
		$db->query($sql);
		echo "delete session - OK";
	}
	
?>
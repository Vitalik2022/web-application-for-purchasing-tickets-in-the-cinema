<?php

	$json = file_get_contents('php://input');

	$session = json_decode($json);
	//echo var_dump($json);

	include '../../php/functions.php';

	$db = connectDB();
	$db->set_charset("utf8");

	//----------------------------------------------------------------------
	switch($session->oper){
		case '1':   $sql='insert into sessions(dt, tbegin, id_film, id_hall)
		                  values ("'.$session->dt.'", "'.$session->tbegin.'", 
		                           '.$session->id_film.', '.$session->id_hall.')'; 
		            break;


		case '2': $sql='update sessions 
		                set dt="'      .$session->dt.'", 
		                    tbegin="'  .$session->tbegin.'",
		                    id_film='  .$session->id_film.',
		                    id_hall='  .$session->id_hall.'
		                    where id=' .$session->id;   
					break;
	}

	echo $sql;
	$db->query($sql);

	switch($session->oper){
		case '1': echo "add session - OK"; break;
		case '2': echo "update session - OK";
	}	
?>
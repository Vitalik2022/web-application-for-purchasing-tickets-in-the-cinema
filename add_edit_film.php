<?php

	$json = file_get_contents('php://input');

	$film = json_decode($json);
	//echo var_dump($json);

	include '../../php/functions.php';

	$db = connectDB();
	$db->set_charset("utf8");

	//----------------------------------------------------------------------
	switch($film->oper){
		case '1':   $sql='insert into films(film, genre, producer, actors,
		                  company, country, year, time, lang, format, short)
		                  values ("'.$film->film.'", "'.$film->genre.'", 
		                          "'.$film->producer.'", "'.$film->actors.'", 
		                          "'.$film->company.'", "'.$film->country.'", 
		                          '.$film->year.', '.$film->time.', "'.$film->lang.'", 
		                          "'.$film->format.'", "'.$film->short.'")'; 
		            break;


		case '2': $sql='update films 
		                set film="'    .$film->film.'", 
		                    genre="'   .$film->genre.'",
		                    producer="'.$film->producer.'",
		                    actors="'  .$film->actors.'",
		                    company="' .$film->company.'",
		                    country="' .$film->country.'",
		                    year='     .$film->year.',
		                    time='     .$film->time.',
		                    lang="'    .$film->lang.'",
		                    format="'  .$film->format.'",
		                    short="'   .$film->short.'" 
		                    where id=' .$film->id;   
					break;
	}

	echo $sql;
	$db->query($sql);


	switch($film->oper){
		case '1': echo "add film - OK"; break;
		case '2': echo "update film - OK";
	}	
?>
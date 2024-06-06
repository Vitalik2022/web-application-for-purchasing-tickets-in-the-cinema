<?php	
	include '../../php/functions.php';

	$db = connectDB();
	$db->set_charset("utf8");

	//Масив для усіх даних
	$Data=array();

	//----------------------------------------------------------------------
	//Масив фільмів
	$Films=array();
	
	/*$sql='select distinct F.* from sessions S, films F   
	      where S.id_film=F.id';*/
	$sql='select * from films order by film';

	$result = $db->query($sql);
	
	for($i=0; $i<$result->num_rows; $i++){
		$film = $result->fetch_assoc();

		$sessions=array();
		$sql='select S.id, S.dt, S.tbegin, S.id_hall, H.hallname 
			  from sessions S, halls H 
			  where (S.id_hall=H.id) and (S.id_film='.$film['id'].') and (S.dt between CURDATE() and DATE_ADD(CURDATE(), INTERVAL 7 DAY)) 
			  order by S.DT, S.tbegin';
		$result2 = $db->query($sql);		
		for($j=0; $j<$result2->num_rows; $j++){
			$session=$result2->fetch_assoc();
			array_push($sessions, $session);
		}
		$film['sessions']=$sessions;

		array_push($Films, $film);
	}
	$Data['TFilms'] = $Films;

	//----------------------------------------------------------------------
	//Масив залів
	$Halls=array();
	
	$sql='select * from halls order by hallname';
	$result = $db->query($sql);
	
	for($i=0; $i<$result->num_rows; $i++){
		$hall = $result->fetch_assoc();

		$parts=array();
		$sql='select * from hall_parts where id_hall='.$hall['id'];
		$result2 = $db->query($sql);		
		for($j=0; $j<$result2->num_rows; $j++){
			$part=$result2->fetch_assoc();
			array_push($parts, $part);
		}
		$hall['places']=$parts;

		array_push($Halls, $hall);
	}
	$Data['THalls'] = $Halls;

	//----------------------------------------------------------------------
	//Масив сеансів
	$Sessions=array();
	$sql='select S.*, F.film, F.genre, H.hallname, H.color, H.countplaces 
	      from sessions S, films F, halls H  
	      where (S.id_film=F.id) and (S.id_hall=H.id)
	      order by S.DT, S.tbegin';

	$result = $db->query($sql);
	
	for($i=0; $i<$result->num_rows; $i++){
		$session = $result->fetch_assoc();

		$sql='select count(id) as saletickets from tickets where id_session='.$session['id'];
		$result2 = $db->query($sql);
		$t = $result2->fetch_assoc();
		$session['freetickets']= $session['countplaces']-$t['saletickets'];

		array_push($Sessions, $session);
	}
	$Data['TSessions'] = $Sessions;

	//----------------------------------------------------------------------
	//Масив проданих квитків
	$Tickets=array();
	$sql='select T.* from tickets T';

	$result = $db->query($sql);
	
	for($i=0; $i<$result->num_rows; $i++){
		$ticket = $result->fetch_assoc();
		array_push($Tickets, $ticket);
	}
	$Data['TTickets'] = $Tickets;

	//відправка данних
	echo json_encode($Data);
?>
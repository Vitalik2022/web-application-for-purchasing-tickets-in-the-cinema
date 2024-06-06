<?php
	function connectDB(){
		$_server="localhost";
		$_user="root";
		$_pass="";
		$_dbname="Cinema";

		$link = new mysqli($_server, $_user, $_pass, $_dbname);

		if ($link -> connect_errno) {
		 	echo "Не вдалося під'єднатися до сервера: " . $mysqli -> connect_error;
		  	return null;
		}

		return $link;
	}

	function getCode(){
		$code="";

		$alf="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		$n=strlen($alf);
		
		for($i=0; $i<2; $i++){
			$pos = rand(0, $n-1);
			$code.=mb_substr($alf, $pos, 1);
		}

		//2023.09.16 13:39:14
		$pos= $n % date("d");
		$code.=mb_substr($alf, $pos, 1);
		
		$pos= $n % (date("H")+1);
		$code.=mb_substr($alf, $pos, 1);

		$pos= $n % (date("i")+1);
		$code.=mb_substr($alf, $pos, 1);

		$pos= $n % (date("s")+1);
		$code.=mb_substr($alf, $pos, 1);
	

		return $code;
	}

?>
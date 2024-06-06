<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Cinema</title>

	<link rel="stylesheet" type="text/css" href="../css/main.css">
	<link rel="stylesheet" type="text/css" href="admin.css">
</head>
<body>
	<div id="cinema">
		<header>Cinema</header>

		<div class="top"></div>
		<ul id="menu">
			<li onclick="showTab(1)">Фільми</li>
			<li onclick="showTab(2)">Зали</li>
			<li onclick="showTab(3)">Продаж</li>
		</ul>
 		
		<div class="tab visible">
			<h2>Фільми 
				<span class="select" onclick="film_tab(this, 1)">Інформація</span>
				<span onclick="film_tab(this, 2)">Сеанси</span>

				<input type="find" id="ffind">
			</h2>

			<div id="films">
			</div>

			<div id="film_edit" class="film_tab">
				<div class="fdata">
					<input type="text" placeholder="назва фільму" id_film="-1">
					<input type="text" placeholder="жанр">
					<input type="text" placeholder="режисер">
					<textarea placeholder="актори"></textarea>
					<input type="text" placeholder="кінокомпанія">
					<input type="text" placeholder="країна" style="width: calc(98% - 96px); min-width: 200px" >
					<input type="number" placeholder="рік виходу" style="width:80px" min="1960">
					<input type="text" style="width: calc(98% - 190px); min-width: 200px" placeholder="мова">
					<input type="text" style="width:80px" placeholder="формат">
					<input type="text" style="width:80px" placeholder="тривалість хв">
					<textarea placeholder="короткий зміст"></textarea>
				</div>
				<div class="poster">
				</div>

				<div class="buttons">
					<button onclick="addFilm()">Додати</button>
					<button onclick="fixFilm()">Зафіксувати</button>
					<button onclick="delFilm()">Вилучити</button>
				</div>			
			</div>

			<div id="film_sessions" class="film_tab hidden">			
			</div>
		</div>

		<div class="tab">
			<h2>Зали</h2>
			
			<div id="halls">
			</div>

			<style type="text/css">
				.fdata input[type="text"]{
					width: 425px;
					margin:5px 0px; 
					padding: 3px;
				}

				#hall_part_edit hr{
					width: 450px;
				}

				#hall_part_edit input[type="text"]{
					width: 200px !important;
				}

				#hall_part_edit input[type="number"]{
					width: 40px;
					margin: 5px;
					padding:3px; 
				}

				#hall_part_edit button{
					width: 25px;
					text-align: center;
					cursor: pointer; 
				}				
			</style>			
			<div id="hall_edit" class="hall_tab">
				<div class="fdata">
					<input type="text" placeholder="назва зали" id_hall="-1">
					<input type="color" placeholder="колір"><br>		
					<button onclick="addHall()">Додати</button>
					<button onclick="fixHall()">Зафіксувати</button>
					<button onclick="delHall()">Вилучити</button>
				</div>

				<div id="hall_part_edit" class="parts">					
				</div>

			</div>
		</div>

		<div class="tab">
			<h2>Продаж квитків</h2>
		</div>
	</div>
</body>
</html>

<script type="text/javascript" src="md5.js"></script>
<script type="text/javascript" src="admin.js"></script>




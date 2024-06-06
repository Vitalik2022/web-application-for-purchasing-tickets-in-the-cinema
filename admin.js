var $ = function(id){
	return document.getElementById(id);
}

var CN = function(classname){
	return document.getElementsByClassName(classname);
}

var TN = function(classname){
	return document.getElementsByTagName(tagname);
}

var CE = function(tag){
	return document.createElement(tag);
}

//---------------------------------------------------------
// class Admin
class Admin{
	constructor(login, password){
		this.FILMS=[];
		this.HALLS=[];
		this.SESSIONS=[];
		this.TICKETS=[];

		this.idUser=-1;
		this.login=login;
		this.password=MD5(password);

		//html-елементи
		this.Tabs = CN('tab');
		this.Films=$('films');		
		this.filmForm=$('film_edit');
		this.filmFormData={};
		this.sessionsForm=$("film_sessions");
		//this.SessionsFormData={};
					
		/*this.Sessions=$('sessions');
		this.Tickets=$('tickets');*/
		this.Halls=$('halls');
		this.hallForm=$('hall_edit'); //console.log(this.hallForm);
		this.hallFormData={};

		this.hallPartsForm=$('hall_part_edit');

		this.loadData(this);
	};

	loadData(obj){
		var ajax = new XMLHttpRequest();
	    var url='php/getAdminData.php';
		ajax.open('get', url, true);

		ajax.onreadystatechange = function () {
        	if (this.readyState == 4 && this.status == 200) {
	            //console.log(this.responseText);

	            var Data     = JSON.parse(this.responseText); 
				obj.FILMS    = Data['TFilms'];
				obj.HALLS    = Data['THalls'];
				obj.SESSIONS = Data['TSessions'];
				obj.TICKETS  = Data['TTickets'];
				
				console.log(Data);
				obj.viewFilms();
				obj.viewHalls();

				obj.Init();
        	}
    	}
    	ajax.send();
	};

	Init(){
		let FilmInputs   = this.filmForm.getElementsByTagName('input');
		let FilmTextArea = this.filmForm.getElementsByTagName('textarea');
		let FilmButtons  = this.filmForm.getElementsByTagName('button');
		let Posters      = this.filmForm.getElementsByClassName('poster');

		var fFD = this.filmFormData;
		fFD.film     = FilmInputs[0];
		fFD.genre 	 = FilmInputs[1];
		fFD.producer = FilmInputs[2];
		fFD.actors   = FilmTextArea[0];
		fFD.company  = FilmInputs[3];
		fFD.country  = FilmInputs[4];
		fFD.year	 = FilmInputs[5];
		fFD.lang	 = FilmInputs[6];
		fFD.format 	 = FilmInputs[7];
		fFD.time 	 = FilmInputs[8];
		fFD.short 	 = FilmTextArea[1];
		fFD.poster   = Posters[0];
		
		fFD.b_addfilm = FilmButtons[0];
		fFD.b_fixfilm = FilmButtons[1];
		fFD.b_delfilm = FilmButtons[2];

		var SF=this.sessionsForm;
		
		let HallInputs   = this.hallForm.getElementsByTagName('input');

		var fHD = this.hallFormData; 
		fHD.hallname = HallInputs[0];
		fHD.colour 	 = HallInputs[1];

		this.viewFilms();
		this.viewHalls();
	}

	viewFilms(){
		this.Films.innerHTML='';

		for(var i=0; i<this.FILMS.length; i++){
			var Film = CE ('p');
			Film.innerHTML =this.FILMS[i].film;
			Film.setAttribute('onclick', 'setFilm('+ this.FILMS[i].id +')');
			this.Films.append(Film);
		}
	}

	setFormFilmData(id){
		var curFilm = this.getFilmById(id);
		var fFD = this.filmFormData;
		
		fFD.film.value       = curFilm.film;
		fFD.film.setAttribute('id_film', curFilm.id);
		
		fFD.genre.value      = curFilm.genre;
		fFD.producer.value   = curFilm.producer;
		fFD.actors.value 	 = curFilm.actors; 
		fFD.company.value    = curFilm.company;
		fFD.country.value    = curFilm.country;
		fFD.year.value   	 = curFilm.year;
		fFD.lang.value       = curFilm.lang;
		fFD.format.value     = curFilm.format;
		fFD.time.value       = curFilm.time;
		fFD.short.value 	 = curFilm.short;

		fFD.poster.style.background='url(../images/' + curFilm.poster + ')'; 
		fFD.poster.style.backgroundSize='cover';


		var fname=document.createElement('h3');
		this.sessionsForm.innerHTML='';
		fname.innerHTML=curFilm.film;
		this.sessionsForm.append(fname);

		var Sessions = curFilm.sessions;

		var hall_list='';
		var halls=myAdmin.HALLS;
		for(var i=0; i<halls.length; i++){
			hall_list+='<option value="' + halls[i].id +'">' 
			                             + halls[i].hallname + '</option>';
		}

		var session = document.createElement('p');
			
		var DT = document.createElement('input');
		DT.type='date';
		DT.value = Date.now();
		session.append(DT);

		var Tm = document.createElement('input');
		Tm.type='time';
		Tm.value = new Date().getTime();
		session.append(Tm);

		var Select = document.createElement('select');
		Select.innerHTML = hall_list;
		session.append(Select);

		var Btn = document.createElement('button');
		Btn.innerHTML = '+';
		Btn.setAttribute('id_film', curFilm.id);
		Btn.setAttribute('onclick', 'addSession(this)');
		session.append(Btn);

		var Hr = document.createElement('hr');
		session.append(Hr);
			
		this.sessionsForm.append(session);

		for(var i=0; i<Sessions.length; i++){
			var session = document.createElement('p');
			session.setAttribute('id_session', curFilm.sessions[i].id);
			
			var DT = document.createElement('input');
			DT.type='date';
			DT.value = curFilm.sessions[i].dt
			session.append(DT);

			var Tm = document.createElement('input');
			Tm.type='time';
			Tm.value = curFilm.sessions[i].tbegin
			session.append(Tm);

			var Select = document.createElement('select');
			Select.innerHTML = hall_list;
			Select.value = curFilm.sessions[i].id_hall;
			session.append(Select);

			var Btn = document.createElement('button');
		    Btn.innerHTML = 'V';
		    Btn.setAttribute('id_film',  curFilm.id);
		    Btn.setAttribute('id_session', curFilm.sessions[i].id);
			Btn.setAttribute('onclick', 'fixSession(this)');
		    session.append(Btn);

			Btn = document.createElement('button');
		    Btn.innerHTML = '-';
			Btn.setAttribute('onclick', 'delSession(' + curFilm.sessions[i].id + ')');
		    session.append(Btn);

			this.sessionsForm.append(session);
		}	
	}

	getFormFilmData(){
		var fFD = this.filmFormData
		var curFilm={};

		curFilm.id       = fFD.film.getAttribute('id_film');
		curFilm.film     = fFD.film.value;

		curFilm.genre    = fFD.genre.value;
		curFilm.producer = fFD.producer.value;
		curFilm.actors   = fFD.actors.value; 
	    curFilm.company  = fFD.company.value;
	    curFilm.country  = fFD.country.value;
	    curFilm.year     = fFD.year.value;
	    curFilm.lang     = fFD.lang.value;
	    curFilm.format   = fFD.format.value;
		curFilm.time     = fFD.time.value;
		curFilm.short    = fFD.short.value;

		return curFilm;
	}

	filmOper(oper){
		var curFilm=this.getFormFilmData();
		curFilm.oper = oper;  

		//console.log(curFilm);
		const ajax = new XMLHttpRequest();
		const url='php/add_edit_film.php';
		ajax.open('post', url);
		ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		const body = JSON.stringify(curFilm);

		ajax.onreadystatechange = function () {
	       	if (this.readyState == 4 && this.status == 200) {
		       console.log(this.responseText);
		       myAdmin.loadData(myAdmin);
	        }
	        else console.log('Error: ' + this.status );
	    }
	    ajax.send(body);
	}

	delFilm(){
		var fFD     = this.filmFormData;
		var id_film = fFD.film.getAttribute('id_film');

		const ajax = new XMLHttpRequest();
		const url='php/del_film.php?id_film=' + id_film;
		ajax.open('get', url);

		ajax.onreadystatechange = function () {
	       	if (this.readyState == 4 && this.status == 200) {
		       console.log(this.responseText);
		       myAdmin.loadData(myAdmin);
	        }
	        else console.log('Error: ' + this.status );
	    }
	    ajax.send();
	}

	film_tab(span, tab){
		span.classList.add('select');

		var SpanSibling;
		switch(tab){
			case 1: SpanSibling=span.nextElementSibling; 
					//console.log(SpanSibling);
			        SpanSibling.classList.remove('select');

					this.filmForm.classList.remove('hidden');
					this.sessionsForm.classList.add('hidden'); 
					break;

			case 2: SpanSibling=span.previousElementSibling; 
					//console.log(SpanSibling);
					SpanSibling.classList.remove('select');

					this.filmForm.classList.add('hidden');
					this.sessionsForm.classList.remove('hidden'); 
					break;
		}		
	}

	showTab(tab){
		for(var i=0; i<this.Tabs.length; i++){
			this.Tabs[i].classList.remove('visible');
		}

		this.Tabs[tab-1].classList.add('visible');
	}

	showSessions(dt){
		/*this.Sessions.innerHTML="";
		var Div=CE('div');

		var tS=this.SESSIONS; 
		for(var i=0; i<tS.length; i++){	
			if(tS[i].dt==dt){
				var P=CE('p');
				P.setAttribute('onclick', 'viewSession('+ tS[i].id +')' );
				var item = CE('span');
				item.innerHTML=tS[i].tbegin;
				P.append(item);

				item = CE('span');
				item.innerHTML=tS[i].film;
				P.append(item);

				item = CE('span');
				item.innerHTML=tS[i].genre;
				P.append(item);

				item = CE('span');
				item.innerHTML=tS[i].hallname;
				item.classList.add( tS[i].color );
				P.append(item);

				item = CE('span');

				var t=tS[i].freetickets;
				console.log(t);
				if( 1*t>0){
					item.innerHTML='є квитки';
				}
				else{
					item.innerHTML='квитки відсутні';
				}
					
				P.append(item);

				Div.append(P);
			}	
		}	
			
		Div.classList.add('hall');
		this.Sessions.append(Div);*/
	}

	viewHalls(){
		this.Halls.innerHTML='';

		for(var i=0; i<this.HALLS.length; i++){
			var Hall = CE ('p');
			Hall.innerHTML =this.HALLS[i].hallname;
			Hall.setAttribute('onclick', 'setHall('+ this.HALLS[i].id +')');
			this.Halls.append(Hall);
		}
	}

	setFormHallData(id){
		var curHall = this.getHallById(id); 
		var fHD = this.hallFormData; ;  

		fHD.hallname.value       = curHall.hallname;
		fHD.hallname.setAttribute('id_hall', curHall.id);	
		fHD.colour.value      = curHall.color; //console.log(fHD.colour);

		this.hallPartsForm.innerHTML='';

		var part = document.createElement('p');
		part.setAttribute('id_part', -1);
		
		var Input = document.createElement('input');
		Input.type='text';
		Input.value='';
		Input.placeholder='Нова частина';
		part.append(Input);

		var Input1 = document.createElement('input');
		Input1.type='number';
		Input1.value='1';
		part.append(Input1);

		var Input2 = document.createElement('input');
		Input2.type='number';
		Input2.value='1';
		part.append(Input2);

		var Input3 = document.createElement('input');
		Input3.type='number';
		Input3.value='0';
		part.append(Input3);

		var Btn = document.createElement('button');
	    Btn.innerHTML = '+';
		Btn.setAttribute('onclick', 'addPart(this)');
	    part.append(Btn);
	    this.hallPartsForm.append(part);

	    var HR = document.createElement('hr');
	    this.hallPartsForm.append(HR);

	    //-------------------------------------------------
		for(var i=0; i<curHall.places.length; i++){
			var part = document.createElement('p');
			part.setAttribute('id_part', curHall.places[i].id);
			
			var Input = document.createElement('input');
			Input.type='text';
			Input.value=curHall.places[i].partname;
			Input.placeholder='Назва частини';
			part.append(Input);

			var Input1 = document.createElement('input');
			Input1.type='number';
			Input1.value=curHall.places[i].count_rows;
			part.append(Input1);

			var Input2 = document.createElement('input');
			Input2.type='number';
			Input2.value=curHall.places[i].count_places;
			part.append(Input2);

			var Input3 = document.createElement('input');
			Input3.type='number';
			Input3.value=curHall.places[i].price;
			part.append(Input3);


			var Btn = document.createElement('button');
		    Btn.innerHTML = 'V';
		    Btn.setAttribute('id_part',  curHall.places[i].id);
			Btn.setAttribute('onclick', 'fixPart(this)');
		    part.append(Btn);

			Btn = document.createElement('button');
		    Btn.innerHTML = '-';
			Btn.setAttribute('onclick', 'delPartn(' + curHall.places[i].id + ')');
		    part.append(Btn);

			this.hallPartsForm.append(part);
		}	
	}


	//---------------------------------------
	getSessionById(id){
		/*var s={};
		for(var i=0; i<this.SESSIONS.length; i++){
			if(this.SESSIONS[i].id==id){
				s=this.SESSIONS[i];
				break;
			}
		}
		return s;*/
	}

	getHallById(id){
		var h={};
		for(var i=0; i<this.HALLS.length; i++){
			if(this.HALLS[i].id==id){
				h=this.HALLS[i];
				break;
			}
		}
		return h;
	}

	getFilmById(id){
		var f={};
		for(var i=0; i<this.FILMS.length; i++){
			if(this.FILMS[i].id==id){
				f=this.FILMS[i];
				break;
			}
		}
		return f;
	}

	getTicketsByIdSession(id){
		/*var T=this.TICKETS;
		var t=[];
		for(var i=0; i<T.length; i++){
			if( T[i].id_session==id ){				
				t.push(T[i]);
			}
		}
		return t;*/
	}

	//---------------------------------------
	getSessionData(id){
	 /*	var Data={
			session:{},
			hall:{},
			film:{},
			tickets:{}
		};

		Data.session =this.getSessionById(id);
		Data.hall    =this.getHallById(Data.session.id_hall);
		Data.film    =this.getFilmById(Data.session.id_film);
		Data.tickets =this.getTicketsByIdSession(id);

		return Data;*/
	}

	showBussyPlaces(tickets, cart){
	 /*	var Rows=this.Hall.getElementsByTagName('p');


		for(var i=0; i<tickets.length; i++){
			var P=Rows[ tickets[i].row-1 ].getElementsByTagName('span');
			P[ tickets[i].place ].classList.add('bussy');
		}

		//if(cart.length>0)
		for(var i=0; i<cart.length; i++){
			var P=Rows[ cart[i].row-1 ].getElementsByTagName('span');
			//console.log(cart[i]);
			//console.log(P);
			//console.log(cart[i].place);
			//if(!P)
			P[ cart[i].place ].classList.add('in_cart');		
		}*/
	}

	viewSession(id){
		/*var S=this.getSessionData(id);
		if(S!={}){
			this.CurSessionData=S;
			//console.log('S=' + S);

			var P=this.Tickets.getElementsByTagName('p');
			P[0].innerHTML=S.film.film;
			P[1].innerHTML=S.film.genre;
			P[2].innerHTML=S.session.dt + '  ' + S.session.tbegin;
			P[3].innerHTML=S.session.hallname;
			P[3].style.color=S.session.color;

			var cart=[];
			for(var i=0; i<this.CART.length; i++){
				if( this.CART[i].id_session==S.session.id ){
					cart.push(this.CART[i]);
				}		
			}

			this.buildHall(S.hall);
			this.showBussyPlaces(S.tickets, cart);	

			tickets.parentElement.classList.remove('hidden');	
		}*/		
	}

	buildPart(rows, places, start_row, price){
		/*for(var i=0; i<rows; i++){
			var row = CE('p');
			row.setAttribute('row', start_row );
		    
		    for(var j=0; j<=places; j++){
		    	var place=CE('span');

		    	if(j==0){
		    		place.innerHTML='Ряд: ' + start_row;
		    		start_row++;
		    		place.classList.add('label');
		    	}
		    	else{
		    		place.innerHTML=j;
		    		place.classList.add('place');
		    		place.setAttribute('price', price );
		    	} 
	  	
		    	place.ondblclick = function(){
		    		if( 
		    			this.classList.contains('place') && 
		    		    !this.classList.contains('bussy') &&
		    		    !this.classList.contains('in_cart')
		    		    )
		    		{
		    			this.classList.add('in_cart');
		    			//console.log( myCinema.CurSessionData);

		    			var t={'id_session': 0, 'row':0, 'place':0, 'price':0};
		    			//var CurSD=
		    			t.id_session = myCinema.CurSessionData.session.id;
		    			t.row   = this.parentElement.getAttribute('row');
		    			t.place = this.innerHTML;
		    			t.price = this.getAttribute('price');
		    			//console.log(t);

		    			if(myCinema.CART.length==0){
		    				myCinema.CART.push(t);
		    			}
		    			else{
		    				var i=0;
		    				for(; i<myCinema.CART.length; i++){
		    					if( myCinema.CART[i].id_session>t.id_session ){		    						
		    						break;
		    					}
		    				}

		    				if( i==myCinema.CART.length){
		    					myCinema.CART.push(t);
		    				}
		    				else{
		    					myCinema.CART.splice(i,0,t);
		    				}

		    			}
		    			
		    			console.log(myCinema.CART);
		    			localStorage.setItem("cinemaCart", JSON.stringify(myCinema.CART));

		    		}	    		
		    	}

		    	row.append(place);
		    }
				
			this.Hall.append(row);
		}

		var row = CE('h4');
		row.classList.add('prohod');
		this.Hall.append(row);*/	
	}

	buildHall(halldata){
		//$('hallname').innerHTML=halldata.hallname;

		/*this.Hall.innerHTML='';
		var P = halldata.places;
		var num_row=1;
		for(var i=0; i<P.length; i++){
			var r=P[i].count_rows;
			var p=P[i].count_places;
			var c=P[i].price;

			this.buildPart(r, p, num_row, c);
			num_row+=1*r;
		}*/
	}
};


//---------------------------------------------------------
//program
//---------------------------------------------------------
let myAdmin = new Admin("admin", "0000");
myAdmin.Init();

let MenuItems = $('menu').getElementsByTagName('li');

function showTab(tab){
	myAdmin.showTab(tab);
}

function film_tab(span, tab){
	myAdmin.film_tab(span, tab);	
}

function setFilm(id){
	myAdmin.setFormFilmData(id);
}

function addFilm(){
	myAdmin.filmOper(1);
}

function fixFilm(){
	myAdmin.filmOper(2);
}

function delFilm(){
	myAdmin.delFilm();
}

function addSession(obj){
	var P=obj.parentElement;
	var Inputs  = P.getElementsByTagName('input');
	var Selects = P.getElementsByTagName('select');
	
	var session={};
	session.id      = -1;
	session.dt 		= Inputs[0].value;
	session.tbegin	= Inputs[1].value;
	session.id_hall	= Selects[0].value;
	session.id_film	= obj.getAttribute('id_film');

	session.oper = 1;  

	console.log(session);
	const ajax = new XMLHttpRequest();
	const url='php/add_edit_session.php';
	ajax.open('post', url);
	ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	const body = JSON.stringify(session);

	ajax.onreadystatechange = function () {
       	if (this.readyState == 4 && this.status == 200) {
	       console.log(this.responseText);
	       myAdmin.loadData(myAdmin);
        }
        else console.log('Error: ' + this.status );
	}
	ajax.send(body);
}

function fixSession(obj){
	var P=obj.parentElement;
	var Inputs  = P.getElementsByTagName('input');
	var Selects = P.getElementsByTagName('select');
	
	var session={};
	session.id      = P.getAttribute('id_session');
	session.dt 		= Inputs[0].value;
	session.tbegin	= Inputs[1].value;
	session.id_hall	= Selects[0].value;
	session.id_film	= obj.getAttribute('id_film');

	session.oper = 2;  

	console.log(session);
	const ajax = new XMLHttpRequest();
	const url='php/add_edit_session.php';
	ajax.open('post', url);
	ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	const body = JSON.stringify(session);

	ajax.onreadystatechange = function () {
       	if (this.readyState == 4 && this.status == 200) {
	       console.log(this.responseText);
	       myAdmin.loadData(myAdmin);
        }
        else console.log('Error: ' + this.status );
	}
	ajax.send(body);
}

function delSession(id_session){
	const ajax = new XMLHttpRequest();
	const url='php/del_session.php?id_session=' + id_session;
	ajax.open('get', url);

	ajax.onreadystatechange = function () {
       	if (this.readyState == 4 && this.status == 200) {
	       console.log(this.responseText);
	       myAdmin.loadData(myAdmin);
        }
        else console.log('Error: ' + this.status );
	}
	ajax.send();
}

function setHall(id){
	myAdmin.setFormHallData(id);
}

function addHall(obj){

}

function fixHall(obj){

}

function delHall(id){
	const ajax = new XMLHttpRequest();
	const url='php/del_hall.php?id_hall=' + id;
	ajax.open('get', url);

	ajax.onreadystatechange = function () {
       	if (this.readyState == 4 && this.status == 200) {
	       console.log(this.responseText);
	       myAdmin.loadData(myAdmin);
        }
        else console.log('Error: ' + this.status );
	}
	ajax.send();
}

function addPart(obj){

}

function fixPart(obj){

}

function delPart(id){
	const ajax = new XMLHttpRequest();
	const url='php/del_part.php?id_part=' + id;
	ajax.open('get', url);

	ajax.onreadystatechange = function () {
       	if (this.readyState == 4 && this.status == 200) {
	       console.log(this.responseText);
	       myAdmin.loadData(myAdmin);
        }
        else console.log('Error: ' + this.status );
	}
	ajax.send();
}


//------------------------------------------------------
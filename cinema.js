var $ = function(id){
	return document.getElementById(id);
}

var CE = function(tag){
	return document.createElement(tag);
}

//---------------------------------------------------------
class Cinema{
	constructor(name){
		this.FILMS=[];
		this.HALLS=[];
		this.SESSIONS=[];
		this.TICKETS=[];
		this.CART=[];

		this.CurSession={
			'id':0,
			'id_film': 0,
			'dt':'01.01.1900',
			'tbegin':'00:00',
			'id_hall':0,
			'hall':''
		};
		this.CurSessionData={};
		
		this.name=name;

		this.Films=$('films');			
		this.Sessions=$('sessions');
		this.Tickets=$('tickets');
		this.Hall=$('hall');
		this.Cart=$('cart');
		
		this.loadData();
	};

	loadData(){
		this.FILMS=TFilms;
		this.HALLS=THalls;
		this.SESSIONS=TSessions;
		this.TICKETS=TTickets;

		if( localStorage.getItem('cinemaCart') !==null ){
			this.CART=JSON.parse(localStorage.getItem("cinemaCart"));
		}
	};

	Init(){
		this.buildFilms();
		this.Slides = this.Films.getElementsByClassName('film');
		

		//this.buildHall( this.HALLS[0] );
	}

	buildFilms(){
		this.Films.innerHTML='';

		for(var i=0; i<this.FILMS.length; i++){
			var Film = CE ('div');
			Film.classList.add('film');
			Film.style.background='url(images/' + this.FILMS[i].poster + ')';
			Film.style.backgroundSize='cover';

			var Info = CE('div');
			Info.classList.add('info');
			//------------------------------------------------
			var Panel = CE('div');
			Panel.classList.add('panel');

			var bInfo = CE('span');
			bInfo.classList.add('select');
			bInfo.innerHTML='Опис';
			bInfo.onclick=function(){
				var Panel = this.parentElement;
				var spans = Panel.getElementsByTagName('span');
				spans[0].classList.add('select');
				spans[1].classList.remove('select');

				var divInfo=Panel.parentElement;
				var divs = divInfo.getElementsByClassName('inf');
				divs[0].classList.remove('hidden');
				divs[1].classList.add('hidden');
			};
			Panel.append(bInfo);

			var bSessions = CE('span');
			bSessions.innerHTML='Сеанси';
			bSessions.onclick=function(){
				var Panel = this.parentElement;
				var spans = Panel.getElementsByTagName('span');
				spans[0].classList.remove('select');
				spans[1].classList.add('select');
				
				var divInfo=Panel.parentElement;
				var divs = divInfo.getElementsByClassName('inf');
				divs[0].classList.add('hidden');
				divs[1].classList.remove('hidden');	
			};		
			Panel.append(bSessions);
			Info.append(Panel);
			
			//------------------------------------	
			var Info1 = CE('div');
			Info1.classList.add('inf');

			var Title = CE('h4');
			Title.innerHTML = this.FILMS[i].film;

			var Genre =CE('p');
			Genre.innerHTML = '<b>Жанр:</b>' + this.FILMS[i].genre ;

			var Producer = CE('p');
			Producer.innerHTML = '<b>Продюсер:</b>' + this.FILMS[i].producer;

			var Actors = CE('p');
			Actors.innerHTML = '<b>Актори:</b>' + this.FILMS[i].actors;

			var Company = CE('p');
			Company.innerHTML = '<b>Компанія:</b>' + this.FILMS[i].company;

			var Year = CE('p');
			Year.innerHTML = '<b>Рік:</b>' + this.FILMS[i].year;

			Info1.append(Title);
			Info1.append(Genre);
			Info1.append(Producer);
			Info1.append(Actors);
			Info1.append(Company);
			Info1.append(Year);
			Info.append(Info1);

			//---------------------------------------
			var Info2 = CE('div');
			Info2.classList.add('inf');
			Info2.classList.add('hidden');

			for(var j=0; j<this.FILMS[i].sessions.length; j++){
				var P=CE('p');
				P.innerHTML = this.FILMS[i].sessions[j].dt + ' ' +
				              this.FILMS[i].sessions[j].tm + ' <br>' +
				              this.FILMS[i].sessions[j].hall;
				P.setAttribute('id_session', this.FILMS[i].sessions[j].id);
				P.setAttribute('onclick','viewSession('+ this.FILMS[i].sessions[j].id +')');
				/*P.onclick = function(){

				}*/

				Info2.append(P);              
			}

			Info.append(Info2);
			//---------------------------------------
			
			Film.append(Info);

			this.Films.append(Film);
		}
	}

	slideFilms(v){
		if(v=='left'){
			this.Films.append(this.Slides[0]);
		}
		else {	
			var n=this.Slides.length-1;
			this.Films.insertBefore( this.Slides[n], this.Slides[0]);	
		}
	}

	showSessions(dt){
		this.Sessions.innerHTML="";
		var Div=document.createElement('div');

		var tF=this.FILMS;
		for(var i=0; i<tF.length; i++){		
			for(var j=0; j<tF[i].sessions.length; j++){
				if(tF[i].sessions[j].dt==dt){
					var P=document.createElement('p');
					P.setAttribute('onclick', 'viewSession('+ tF[i].sessions[j].id +')' );
					var item = document.createElement('span');
					item.innerHTML=tF[i].sessions[j].tm;
					P.append(item);

					item = document.createElement('span');
					item.innerHTML=tF[i].film;
					P.append(item);

					item = document.createElement('span');
					item.innerHTML=tF[i].genre;
					P.append(item);

					item = document.createElement('span');
					item.innerHTML=tF[i].sessions[j].hall;
					item.classList.add('red');
					P.append(item);

					item = document.createElement('span');
					item.innerHTML=tF[i].sessions[j].tickets;
					P.append(item);

					Div.append(P);
				}	
			}	
		}
			
		Div.classList.add('hall');
		this.Sessions.append(Div);
	}

	//---------------------------------------
	getSessionById(id){
		var s={};
		for(var i=0; i<this.SESSIONS.length; i++){
			if(this.SESSIONS[i].id==id){
				s=this.SESSIONS[i];
				break;
			}
		}
		return s;
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
		var T=this.TICKETS;
		var t=[];
		for(var i=0; i<T.length; i++){
			if( T[i].id_session==id ){				
				t.push(T[i]);
			}
		}
		return t;
	}

	//---------------------------------------
	getSessionData(id){
		var Data={
			session:{},
			hall:{},
			film:{},
			tickets:{}
		};

		Data.session =this.getSessionById(id);
		Data.hall    =this.getHallById(Data.session.id_hall);
		Data.film    =this.getFilmById(Data.session.id_film);
		Data.tickets =this.getTicketsByIdSession(id);

		return Data;
	}

	showBussyPlaces(tickets, cart){
		var Rows=this.Hall.getElementsByTagName('p');

		for(var i=0; i<tickets.length; i++){
			var P=Rows[ tickets[i].row-1 ].getElementsByTagName('span');
			P[ tickets[i].place ].classList.add('bussy');
		}

		for(var i=0; i<cart.length; i++){
			var P=Rows[ cart[i].row-1 ].getElementsByTagName('span');
			P[ cart[i].place ].classList.add('in_cart');		
		}
	}

	viewSession(id){
		var S=this.getSessionData(id);
		if(S!={}){
			this.CurSessionData=S;
			//console.log(S);

			var P=this.Tickets.getElementsByTagName('p');
			P[0].innerHTML=S.film.film;
			P[1].innerHTML=S.film.genre;
			P[2].innerHTML=S.session.dt + '  ' + S.session.tbegin;
			P[3].innerHTML=S.session.hall;


			var cart=[];
			for(var i=0; i<this.CART.length; i++){
				if( this.CART[i].id_session==S.session.id ){
					cart.push(this.CART[i]);
				}		
			}

			this.buildHall(S.hall);
			this.showBussyPlaces(S.tickets, cart);		
		}		
	}

	buildPart(rows, places, start_row, price){
		for(var i=0; i<rows; i++){
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

		var row = CE('p');
		row.classList.add('prohod');
		this.Hall.append(row);	
	}

	buildHall(halldata){
		//$('hallname').innerHTML=halldata.hallname;

		this.Hall.innerHTML='';
		var P = halldata.places;
		var num_row=1;
		for(var i=0; i<P.length; i++){
			var r=P[i].row;
			var p=P[i].place;
			var c=P[i].price;

			this.buildPart(r, p, num_row, c);
			num_row+=r;
		}
	}

	showCart(){
		var fn='';
		for(var i=0; i<this.CART.length; i++){
			var session=this.getSessionById(this.CART[i].id_session);

			if( fn!==session.film){
				var cFilm=CE('h4');
				cFilm.innerHTML=session.film;
				this.Cart.append(cFilm);
				fn=session.film;
			}

			var p=CE('p');
			var dt=CE('span');
			dt.innerHTML=session.dt;
			p.append(dt);

			var tm=CE('span');
			tm.innerHTML='Початок о ' + session.tbegin;
			p.append(tm);

			var nh=CE('span');
			nh.innerHTML=' ' + session.hall;
			p.append(nh);

			var r=CE('span');
			r.innerHTML=' Ряд ' + this.CART[i].row;
			p.append(r);			

			var r=CE('span');
			r.innerHTML=' Місце ' + this.CART[i].place;
			p.append(r);

			this.Cart.append(p);
		}


		this.Cart.classList.remove('hidden');
	}

	closeCart(){
		this.Cart.classList.add('hidden');
	}
};
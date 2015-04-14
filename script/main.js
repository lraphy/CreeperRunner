var canvas = document.getElementById("jeu");
var context = canvas.getContext("2d");
var sol=250;
var x = 200; var y = sol;
var vitesseSaut=50;
var hauteur;
var timerJump;
var verifJump=true;
console.log(parseInt("12px"));
var score=0;
var bestScore=0;
var creaper=4;
var play=true;
var coin=0;
var pas=true;
var vitesseRun=100;
var vitesseMoveSol=50;
var timerRun = setInterval(function(){steeveRun();},vitesseRun);
var timerMoveSol = setInterval(function(){solMove();},vitesseMoveSol);
var timerScore = setInterval(function(){Score();},vitesseRun);
var largeurSaut=11;
var compt = -largeurSaut;
for (var i = 0; i <22; i++) 
		{
			document.write('<div id="obs'+i+'"></div>');
		};

//


document.addEventListener('keydown', control);
function Score()
{
	score++;
	document.getElementById('score').innerHTML=score;
	if (score%200==0&&vitesseMoveSol>10&&vitesseSaut-5>5)
	{
		clearInterval(timerMoveSol);
		vitesseMoveSol=vitesseMoveSol-2.5;
		vitesseSaut=vitesseSaut-5;
		
		timerMoveSol = setInterval(function(){solMove();},vitesseMoveSol);



	}
}
function steeveRun()
{
	var steve=document.getElementById("steve");
	if(pas==true)
	{
		steve.style.backgroundImage= 'url("img/stevePas1.png")';
		pas=false;
	}
	else
	{
		steve.style.backgroundImage = 'url("img/stevePas2.png")';
		pas=true;
	}
	score++;
	document.getElementById('score').innerHTML=score;
}

function resetTable()
{
	context.fillStyle = "white";
	context.fillRect(0,0,canvas.width,canvas.height); 
}
	var x1=0;
	var x2=1000;
	var y1=sol+80;
	var y2=sol+80;

function solMove()
{
	
	

	if(x2==0)
	{
		x1=960;
			for (var i = 0; i < 3; i++) 
		{

			var obs = document.getElementById('obs'+i);
			if (Math.random()*10>2)
			{
				obs.style.marginLeft=800+(i*65)+"px";
				obs.className='obstacle';
			}


		};
		for (var i = 6; i < 14; i++) {
			var obs = document.getElementById('obs'+i);
			if (Math.random()*10>2)
			{
				obs.style.marginLeft=800+((i-6)*65)+"px";
				obs.className='coin';
			}
		};
	}
	if(x1==0)
	{
		x2=960;
		for (var i = 3; i < 6; i++) 
		{

			var obs = document.getElementById('obs'+i);
			if (Math.random()*10>2)
			{
				obs.style.marginLeft=800+((i-3)*65)+"px";
				obs.className='obstacle';
			}


		};
		for (var i = 14; i < 22; i++) {
			var obs = document.getElementById('obs'+i);
			if (Math.random()*10>2)
			{
				obs.style.marginLeft=800+((i-14)*65)+"px";
				obs.className='coin';
			}
		};

	}
		for (var i = 0; i < 6; i++) 
		{

			var obs = document.getElementById('obs'+i);
			if (obs.className=='obstacle')
			{
			
				
				obs.style.marginLeft=parseInt(obs.style.marginLeft)-15+"px";
				if(parseInt(obs.style.marginLeft)>50&&parseInt(obs.style.marginLeft)<175)
				{
					clearInterval(timerRun);

					if(y>sol-5)
					{
						
						
						creaper--;
						chute();
						if(creaper==1)
						{
							
						}
						else if (creaper<1)
						{
							resetGame();

							creaper=4;
						}
						console.log(creaper);
					}

				}
			}
			if (parseInt(obs.style.marginLeft)<800 && parseInt(obs.style.marginLeft)>0)
			{
				obs.style.display='block';
			}
			else
			{
				obs.style.display='none';
			}
		};
		for (var i = 6; i < 22; i++) 
		{
			var obs = document.getElementById('obs'+i);
			if (obs.className=='coin')
			{
				console.log(coin);
			
				
				obs.style.marginLeft=parseInt(obs.style.marginLeft)-15+"px";
				if(parseInt(obs.style.marginLeft)>25&&parseInt(obs.style.marginLeft)<175)
				{
					
					if(y>150 && y<250)
					{
						
						coin=coin+parseInt(Math.random()*10);
						console.log(coin);
						obs.className='nada';
					}

				}
			}
			if (parseInt(obs.style.marginLeft)<800 && parseInt(obs.style.marginLeft)>0)
			{
				obs.style.display='block';
			}
			else
			{
				obs.style.display='none';
			}
		
		};
	x1=x1-15;
	x2=x2-15;
	var imageObj1 = new Image();
 		imageObj1.onload = function() 
	    {
	        context.drawImage(imageObj1,x1,300,960,100);
	    };
	var imageObj2 = new Image();
 		imageObj2.onload = function() 
	    {
	        context.drawImage(imageObj2,x2,300,960,100);
	    };
	imageObj1.src = 'img/sol.png';
	imageObj2.src = 'img/sol.png';
}

function jump()
{

		clearInterval(timerRun);
 		var steve=document.getElementById("steve");
 		
 		if(compt<1)
 		{
 			y=y-((compt*compt)/2.5);
 			
 		
	      steve.style.backgroundImage= 'url("img/steveJump.png")';
	     
	 		

 		}
 		else if (compt<largeurSaut)
 		{
 			y=y+((compt*compt)/2.5);
 			
 		
	      steve.style.backgroundImage = 'url("img/steveJump.png")';
	      
	 		

 		}
 		 
 	
 		
 		else 
 		{
 			clearInterval(timerJump);
 			compt=-largeurSaut;
 			y=sol;
 			verifJump=true;
 			steve.style.backgroundImage = 'url("img/stevePas1.png")';
 			pas=false;
 			if (play==true)
 			{
 				timerRun=setInterval(function(){steeveRun();}, vitesseRun);
 			}
 			

 			
		}
 		 steve.style.top =y+"px";



 		compt++;
}

function control(e)
{
	

	if( e.keyCode == 38 && verifJump==true)
		    {
		    	verifJump=false;
		    	timerJump = setInterval(function() { jump() },  vitesseSaut);
		       
		    }
}

function resetGame()
{

	clearInterval(timerMoveSol);
	for (var i = 0; i < 6; i++) 
		{
			document.getElementById('obs'+i).className='nada';
		}
		if (score>bestScore)
		{
			bestScore=score;
		}
			
			
			vitesseMoveSol=50;
			vitesseSaut=50;
			score=0;
			
			
			
			
			document.getElementById('bestScore').innerHTML=bestScore;
			document.getElementById('score').innerHTML=score;
}
function chute()
{
	for (var i = 0; i < 6; i++) 
		{
			document.getElementById('obs'+i).className='nada';
		}
	clearInterval(timerMoveSol);
	clearInterval(timerScore);
	clearInterval(timerRun);
	play=false;
	pas=false;
	verifJump=false;
	

	setTimeout( function(){relaunch();},1500);

}
function relaunch()
{
	verifJump=true;
	play=true;
	timerMoveSol = setInterval(function(){solMove()},vitesseMoveSol);
	timerScore = setInterval(function(){Score();},vitesseRun);
	timerRun = setInterval(function(){steeveRun();},vitesseRun);
	
		
			
			
} 
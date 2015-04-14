var canvas = document.getElementById("jeu");
var context = canvas.getContext("2d");
var sol=600;
var x = 200; var y = sol;
var vitesseSaut=50;
var timerJump;
var verifJump=true;
console.log(parseInt("12px"));



var pas=true;
var vitesseRun=100;
var vitesseMoveSol=100;
var timerRun = setInterval(function(){steeveRun();},vitesseRun);
var timerMoveSol = setInterval(function(){solMove();},vitesseMoveSol);
var largeurSaut=11;
var compt = -largeurSaut;
for (var i = 0; i < 10; i++) {
			document.write('<div id="obs'+i+'"></div>');
		};

//


document.addEventListener('keydown', control);
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
			for (var i = 0; i < 10; i++) 
		{

			var obs = document.getElementById('obs'+i);
			if (Math.random()*10>8)
			{
				obs.style.marginLeft=960+(i*96)+"px";
				obs.className='obstacle';
			}


		};
	}
	if(x1==0)
	{
		x2=960;
		for (var i = 0; i < 10; i++) 
		{

			var obs = document.getElementById('obs'+i);
			if (Math.random()*10>7)
			{
				obs.style.marginLeft=960+(i*96)+"px";
				obs.className='obstacle';
			}


		};

	}
		for (var i = 0; i < 10; i++) 
		{

			var obs = document.getElementById('obs'+i);
			if (obs.className=='obstacle')
			{
				obs.style.marginLeft=parseInt(obs.style.marginLeft)-30+"px";
				console.log('bobo');
			}
			if (parseInt(obs.style.marginLeft)<0 )
			{
				obs.style.display='inline-block';
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
	        context.drawImage(imageObj1,x1,y1,960,100);
	    };
	var imageObj2 = new Image();
 		imageObj2.onload = function() 
	    {
	        context.drawImage(imageObj2,x2,y2,960,100);
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
 			y=y-((compt*compt)/3);
 			
 		
	      steve.style.backgroundImage= 'url("img/steveJump.png")';
	     
	 		

 		}
 		else if (compt<largeurSaut)
 		{
 			y=y+((compt*compt)/3);
 			
 		
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
 			timerRun=setInterval(function(){steeveRun();}, vitesseRun);

 			

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
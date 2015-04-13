var canvas = document.getElementById("jeu");
var context = canvas.getContext("2d");
var sol=600;
var x = 200; var y = sol;
var vitesseSaut=50;
var timerJump;
var verifJump=true;



var pas=true;
var vitesseRun=150;
var vitesseMoveSol=150;
var timerRun = setInterval(function(){steeveRun();},vitesseRun);
var timerMoveSol = setInterval(function(){solMove();},vitesseMoveSol);
var largeurSaut=11;
var compt = -largeurSaut;
//


document.addEventListener('keydown', control);
function steeveRun()
{
	var imageObj = new Image();
 	imageObj.onload = function() 
	{
	    context.drawImage(imageObj,x,y,100,100);
	}
 	
	if(pas==true)
	{
		imageObj.src = 'img/stevePas1.png';
		pas=false;
	}
	else
	{
		imageObj.src = 'img/stevePas2.png'
		pas=true;
	}
	resetTable();
}

function resetTable()
{
	context.fillStyle = "white";
	context.fillRect(0,0,canvas.width,canvas.height); 
}
	var x1=0;
	var x2=1000;
	var y1=sol+100;
	var y2=sol+100;
function solMove()
{
	
	

	if(x2==0)
	{
		x1=1000;
	}
	if(x1==0)
	{
		x2=1000;
	}
	x1=x1-20;
	x2=x2-20;
	var imageObj1 = new Image();
 		imageObj1.onload = function() 
	    {
	        context.drawImage(imageObj1,x1,y1,1000,100);
	    };
	var imageObj2 = new Image();
 		imageObj2.onload = function() 
	    {
	        context.drawImage(imageObj2,x2,y2,1000,100);
	    };
	imageObj1.src = 'img/sol.png';
	imageObj2.src = 'img/sol.png';
	
	

}

function jump()
{

		clearInterval(timerRun);
 		resetTable();
 		var imageObj = new Image();
 		imageObj.onload = function() 
	    {
	        context.drawImage(imageObj,x,y,100,100);
	    };
 		
 		if(compt<1)
 		{
 			y=y-((compt*compt)/3);
 			
 		
	      imageObj.src = 'img/steveJump.png';
	 		

 		}
 		else if (compt<largeurSaut)
 		{
 			y=y+((compt*compt)/3);
 			
 		
	      imageObj.src = 'img/steveJump.png';
	 		

 		}
 		 
 	
 		
 		else 
 		{
 			clearInterval(timerJump);
 			compt=-largeurSaut;
 			y=sol;
 			verifJump=true;
 			imageObj.src = 'img/stevePas1.png';
 			pas=false;
 			timerRun=setInterval(function(){steeveRun();}, vitesseRun);

 			

 		}



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

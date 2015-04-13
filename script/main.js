var canvas = document.getElementById("jeu");
var context = canvas.getContext("2d");
var sol=600;
var x = 200; var y = sol;
var vitesseSaut=50;
var timerJump;
var verifJump=true;
var steeve=document.getElementById('steeve');
var pas=true;
var vitesseRun=150;
var timerRun = setInterval(function(){steeveRun();},vitesseRun);
var largeurSaut=11;
var compt = -largeurSaut;
//


document.addEventListener('keydown', control);
function steeveRun()
{
	resetTable();
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
}

function resetTable()
{
	context.fillStyle = "white";
	context.fillRect(0,0,canvas.width,canvas.height); 
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

var canvas = document.getElementById("jeu");
var context = canvas.getContext("2d");
context.fillStyle = "green";
var x = 200; var y = 500;
context.fillRect(x,y,50,50);
var timerJump;


document.addEventListener('keydown', control);

function resetTable()
{
	context.fillStyle = "white";
	context.fillRect(0,0,canvas.width,canvas.height); 
}

var compt = 0;
function jump()
{
		
 		resetTable();
 		if(compt<5)
 		{
 			y=y-25;
 		}
 		else 
 		{
 			y=y+25;
 		}
 		context.fillStyle = "green";
 		context.fillRect(x,y,50,50);
 		console.log(y);
 		compt++;
 		if(compt==10)
 		{
 			clearInterval(timerJump);
 			compt=0;
 		}



		
	
}

function control(e)
{
	

	if( e.keyCode == 38 )
		    {
		    	timerJump = setInterval(function() { jump() }, 75);
		       
		    }

}

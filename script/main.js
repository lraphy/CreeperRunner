var canvas = document.getElementById("jeu");
var context = canvas.getContext("2d");
context.fillStyle = "green";
var x = 90; var y = 100;
context.fillRect(x,y,50,50);

context.fillStyle = "white";
context.fillRect(0,0,canvas.width,canvas.height);
x = 20; y = 60;
context.fillStyle = "red";
context.fillRect(x,y,50,80);
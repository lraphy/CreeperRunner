$(document).ready(function () {
    var canvas = $("#jeu")[0];
    var context = $("#jeu")[0].getContext("2d");

    var block = 30;
    var PosSol = canvas.height - 30;
    var WalkableBlock = new Array();
    var ForRealtyOnly = new Array();
    var obstacle = new Array();
    var index = new Array;
    index[10] = $("#dirt")[0];
    index[11] = $("#tnt")[0];
    index[1] = $("#steve1")[0];
    index[2] = $("#steve2")[0];
    index[3] = $("#steve1")[0];
    index[4] = $("#steve3")[0];
    index[5] = $("#steve4")[0];


    var NumberOfWidthBlock = (canvas.width / block);
    var patate = 2;
    var decalage = 30;
    var background1 = document.getElementById('bg1');
    var background2 = document.getElementById('bg2');
    var X = 0;
    var Y = 900;
    var reset = 0;
    var ct = 0;
    var ctp = 0;
    var saut = false;
    var ctsaut = 0;
    var lvlfrequence = 985;
    var coll = $("#colision");
    var currentfloor = 390;
    var PhyCalculated = false;

    function physicObj(posx, posy, sizex, sizey, type, collision) {
        this.posx = posx;
        this.posy = posy;
        this.sizex = sizex;
        this.sizey = sizey;
        this.type = type;
    }


    // définition des objets statiques
    WalkableBlock[0] = new physicObj(0, PosSol, (block * NumberOfWidthBlock) + decalage, block, index[10]);
    var personnage = new physicObj(block * 3, PosSol - 60, 24, 60, index[1]);


    function Background() {


        context.drawImage(background1, X + reset, 0);
        context.drawImage(background2, Y + reset, 0);

        reset -= 1;
        if (reset == -900) {
            var tmp = X;
            X = Y;
            Y = tmp;
        }
        reset = reset % 900;


    }

    function Draw() {
        //On efface l'image précédente
        Background();

        // personnage
        context.drawImage(personnage.type, personnage.posx, personnage.posy, personnage.sizex, personnage.sizey);
        // block ou il est possible de marcher
        
        for (var i = 0; i < ForRealtyOnly.length; i++) {
            context.drawImage(ForRealtyOnly[i].type, ForRealtyOnly[i].posx, ForRealtyOnly[i].posy, ForRealtyOnly[i].sizex, ForRealtyOnly[i].sizey);
        }

        for (var i = 0; i < WalkableBlock.length; i++) {
            context.drawImage(WalkableBlock[i].type, WalkableBlock[i].posx, WalkableBlock[i].posy, WalkableBlock[i].sizex, WalkableBlock[i].sizey);
        }

        //obstacle
        for (var i = 0; i < obstacle.length; i++) {
            context.drawImage(obstacle[i].type, obstacle[i].posx, obstacle[i].posy, obstacle[i].sizex, obstacle[i].sizey);
        }

        setTimeout(Scroll, 15);
    }
    Draw();


    function Scroll() {

        // Personnage
        //Mouvement personnage
        if (ct % 10 == 1 && saut == false) {
            // ct%x = vitesse du personnage
            ct = 1;
            // modification du cycle de mouvement
            if ((ctp % 4) + 1 == 1) {
                personnage.sizex = 24;
            };
            if ((ctp % 4) + 1 == 2) {
                personnage.sizex = 45;
            };
            if ((ctp % 4) + 1 == 3) {
                personnage.sizex = 24;
            };
            if ((ctp % 4) + 1 == 4) {
                personnage.sizex = 52;
            };
            personnage.type = index[(ctp % 4) + 1];
            ctp++;
        }

        if (saut == true) {
            Jump();
        }

        //sol
        WalkableBlock[0].posx = WalkableBlock[0].posx - patate;
        WalkableBlock[0].posx = WalkableBlock[0].posx % 30;


        //on calcule les nouveaux blocks
        Obstacle();
        //block
        WBlock();
        //on bouge les obstacle
        Dematerialize();
        for (var i = 0; i < ForRealtyOnly.length; i++) {
            ForRealtyOnly[i].posx -= patate;
        }
        for (var i = 0; i < obstacle.length; i++) {
            obstacle[i].posx -= patate;
        }
        // on bouge les blocks hors sol
        for (var i = 1; i < WalkableBlock.length; i++) {
            WalkableBlock[i].posx -= patate;
        }
        // On applique le moteur physique 
        PhyCalculated = false;
        Physique();
        // on attend que le calcul de la physique soit terminé
        while (PhyCalculated == false)
        {
        }
        ct++;
        Draw();
    }


    function Jump() {

        ctsaut++;
        var courbe = 5;
        personnage.type = index[5];
        personnage.sizex = 45;

        
        if (((personnage.posy+personnage.sizey) == currentfloor) && ctsaut >=60) {
            personnage.posy=currentfloor-personnage.sizey;
            saut = false;
            personnage.type = index[1];
            personnage.sizex = 24;
            ctsaut = 0;
        }
        else {
        saut = true;
        if (ctsaut < 30) {
            personnage.posy -= courbe;
        }
        else if (ctsaut >= 30  && ((personnage.posy+personnage.sizey) != currentfloor))
        {
            personnage.posy += courbe;
        }
        else if((personnage.posy+personnage.sizey) == currentfloor)
        {
            saut=false;
            personnage.type = index[1];
            personnage.sizex = 24;
            ctsaut = 0;
        }
        }
    }
    
    document.addEventListener("keydown", function (e) {
        if (e.keyCode == 32) {
            if (saut == false) {
                Jump();
            }
        }
    }, false);

function Dematerialize()
    {
        for (var i = 0; i < ForRealtyOnly.length; i++) {
            if (ForRealtyOnly[i].posx < -block*3) {
                ForRealtyOnly.shift();
            }
        }
    }
        

  function Obstacle() {
        // on supprime les obstacles hors de l'écran
        for (var i = 0; i < obstacle.length; i++) {
            if (obstacle[i].posx < -block) {
                obstacle.shift();
            }
        }
      
      
      // une variable typique pour créer un objet 
      // respectivement posX,poY,SizeX,SizeY,Image
    //  var Nobstacle = new physicObj(canvas.width + block, PosSol - block, block, block, index[11], 1);
      // tu peux créer des "motifs en ajoutant des succession d'entré prédéfinie à la suite dans un tableau ou bien faire 
      // l'aute fonctionne de même manière j'applique juste aux objets de ce tableau une physique différente
      // /!\ le sol reste toujours à l'index 0 du tableau Walkableblock
      // variable block pour définir ta largeur / hauteur de block
      
      /* ancient ajout random d'obstacle
        var random = Math.floor(Math.random() * 1000) + 1;
        if (random > lvlfrequence) {
            var Nobstacle = new physicObj(canvas.width + block, PosSol - block, block, block, index[11], 1);
            if (obstacle.length == 0) {
                obstacle.push(Nobstacle);
            } else if (Nobstacle.posx - obstacle[obstacle.length - 1].posx > 120) {
                obstacle.push(Nobstacle);
            }
          
            
        }
        */    
   }

    function WBlock() {
        // on supprime les blocks ou l'on peut marcher qui sont hors de l'écran
        for (var i = 1; i < WalkableBlock.length; i++) {
            if (WalkableBlock[i].posx < 20) {
                //dématérialise le block 
                 ForRealtyOnly.push(WalkableBlock[i]);
                WalkableBlock.splice(i, 1);
                
            }
        }
            var Wblock = new physicObj(canvas.width + block, PosSol - block, 90, 30, index[10], 0);
            var Wblock1 = new physicObj(canvas.width + block*4, PosSol - block*2,90 , 30, index[10], 0);
            if (WalkableBlock.length == 1) {
                WalkableBlock.push(Wblock);
                WalkableBlock.push(Wblock1);
            } else if (WalkableBlock.length >= 1 && Wblock.posx - WalkableBlock[WalkableBlock.length - 1].posx > 120) {
                WalkableBlock.push(Wblock);
            }
    }


    function Physique() {


        //gravité   
        // si le personnage est sur un block ou il peut marcher
        var testfor = 1
        if (WalkableBlock.length >= 2)
        {
         var inblock = ((personnage.posx+24 <= WalkableBlock[1].posx + WalkableBlock[1].sizex + 24) && (personnage.posx+24 >= WalkableBlock[1].posx));
               
                
                if (inblock) {
                        currentfloor = WalkableBlock[1].posy;
                        }
            
                else { 
                    {
                        currentfloor = 390;
                        if (personnage.posy+personnage.sizey != currentfloor && saut == false)
                        {
                            personnage.posy += 2.5;
                        }
                    }
                }

        
                        if (((personnage.posx+personnage.sizex) >= WalkableBlock[1].posx && (personnage.posx + personnage.sizex) <= WalkableBlock[1].posx+WalkableBlock[1].sizex) || ((personnage.posx >= WalkableBlock[1].posx) && personnage.posx <= WalkableBlock[1].posx+WalkableBlock[1].sizex))
                {
                    if ((personnage.posy+personnage.sizey) > WalkableBlock[1].posy)
                    {
                        GameLost == true;
                }
                }
        
        }
            
            
            
        
       
        
        


        //test de collision avec un obtacle
        //on vérifie d'abord la présence d'obstacle sur le plateau
        if (obstacle.length != 0) {
            // on test seulement les obstacles susceptible d'entrer en collision le 2 premier du tableau car l'espacement minimal est de 4block
            for (var i = 0; i < 1; i++) {
                if (((personnage.posx+personnage.sizex) >= obstacle[i].posx && (personnage.posx + personnage.sizex) <= obstacle[i].posx+obstacle[i].sizex) || ((personnage.posx >= obstacle[i].posx) && personnage.posx <= obstacle[i].posx+obstacle[i].sizex)) {
                    // et que le point le plus bas est dans l'obstacle
                    if (personnage.posy + personnage.sizey > obstacle[i].posy) {
                        GameLost == true;
                    }
                }
            }
        }
        PhyCalculated = true;



    }

});
$(document).ready(function () {
    
    // récupération du canvas
    
    var canvas = $("#jeu")[0];
    var context = $("#jeu")[0].getContext("2d");

    ///////////////////////////////////////////

    
    //Initialisation de variables globales
    
    var block = 30;
    var PosSol = canvas.height - block;
    var lvl = 1;
    
    //////////////////////////////////////
    
    // Stockage des images utilisés 

    var index = new Array();
    
    // block commun
    index[10] = $("#dirt")[0];
    index[11] = $("#tnt")[0];
    index[12] = $("#coffre")[0];
    
    //Mouvement du personnage
    index[1] = $("#steve1")[0];
    index[2] = $("#steve2")[0];
    index[3] = $("#steve1")[0];
    index[4] = $("#steve3")[0];
    index[5] = $("#steve4")[0];
    
    //Background
    index[100] = $("#bg1")[0];
    index[101] = $("#bg2")[0];
    
    ////////////////////////////////
    
    
    // Initialisation des tableaux contenants nos différends block
    
    var PickupObject = new Array();
    var WalkableBlock = new Array();
    var ForRealtyOnly = new Array();
    var obstacle = new Array();
    
    //////////////////////////////////
    
    // Initialisation des variables pour la fonction Background
    
    var X = 0;
    var Y = 900;
    var reset = 0;
    
    //////////////////////////////////
    
    // Initialisation des variables pour le mouvement du personnage
    
    var ct = 0;
    var ctp = 0;
    
    /////////////////////////////////
    
    // Initialisation des variables pour la fonction saut
    var saut = false;
    var ctsaut = 0;
    
    /////////////////////////////////
    
    // Initialisation des variables pour la physique
    var currentfloor = 390;
    
    ////////////////////////////////
    
    //Initialisation des variable pour le score
    var bonus = 0;
    var score = 0;
    
    //////////////////////////////
    
    // Variable de régulation
    var VitesseMouvement = 5; // augmenter diminue la vitesse
    var VitesseSol = 2; 
    var VitesseSaut = 5;
    var HauteurSaut = 20;
    var VitesseBackground = 2;
    var VitesseGlobale = 15; // augmenter diminue la vitesse 
    
    ////////////////////////////
    
    
    
    // la fonction définie les objets
    
    function physicObj(posx, posy, sizex, sizey, type, collision) {
        this.posx = posx;
        this.posy = posy;
        this.sizex = sizex;
        this.sizey = sizey;
        this.type = type;
    }


    // définition des objets statiques
    WalkableBlock[0] = new physicObj(0, PosSol, (canvas.width) + block, block, index[10]);
    var personnage = new physicObj(block * 3, PosSol - block*2, 24, 60, index[1]);


    
    // Affiche et fait défiler l'arrière plan
    
    function Background() {
        
        context.drawImage(index[(lvl * 100)], X + reset, 0);
        context.drawImage(index[(lvl * 100) + 1], Y + reset, 0);

        reset -= VitesseBackground;
        if (reset == -900) {
            var tmp = X;
            X = Y;
            Y = tmp;
        }
        reset = reset % 900;
        
    }
    
    // Modification des coordonnées du personnage lors d'un saut
    function Jump() {

        ctsaut++;
        personnage.type = index[5];
        personnage.sizex = 45;


        if (((personnage.posy + personnage.sizey) == currentfloor) && ctsaut >= 60) {
            personnage.posy = currentfloor - personnage.sizey;
            saut = false;
            personnage.type = index[1];
            personnage.sizex = 24;
            ctsaut = 0;
        } else {
            saut = true;
            if (ctsaut < HauteurSaut) {
                personnage.posy -= VitesseSaut;
            } else if (ctsaut >= HauteurSaut && ((personnage.posy + personnage.sizey) != currentfloor)) {
                personnage.posy += VitesseSaut;
            } else if ((personnage.posy + personnage.sizey) == currentfloor) {
                saut = false;
                personnage.type = index[1];
                personnage.sizex = 24;
                ctsaut = 0;
            }
        }
    }
    
    
    // Récupération de l'événement si le joueur appuie sur la barre espace ou la flèche du haut
        document.addEventListener("keydown", function (e) {
        if (e.keyCode == 32 || e.keyCode == 38) {
            if (saut == false) {
                Jump();
            }
        }
    }, false);



    
    // Calcul des obstacles
    
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
    
    //Calcul des blocks de type sol
    
        function WBlock() {
        // on supprime les blocks ou l'on peut marcher qui sont hors de l'écran
        for (var i = 1; i < WalkableBlock.length; i++) {
            if (WalkableBlock[i].posx <= -90) {
                //dématérialise le block 
                ForRealtyOnly.push(WalkableBlock[i]);
                console.log("spliced");
                WalkableBlock.splice(i, 1);

            }
        }
        var Wblock = new physicObj(canvas.width + block, PosSol - block, 90, 30, index[10], 0);
        var Wblock1 = new physicObj(canvas.width + block * 4, PosSol - block * 2, 90, 30, index[10], 0);
        if (WalkableBlock.length == 1) {
            WalkableBlock.push(Wblock);
            WalkableBlock.push(Wblock1);
        } else if (WalkableBlock.length >= 1 && Wblock.posx - WalkableBlock[WalkableBlock.length - 1].posx > 110) {
            WalkableBlock.push(Wblock);
        }
    }
    
    //Calcul des blocks de apportant un bonus de Score
        function ScoreBonusBlock()
    {
        for (var i = 0; i < PickupObject.length; i++) {
            if (PickupObject[i].posx < -block) {
                PickupObject.shift();
            }
        }
              var Diamant = new physicObj(canvas.width + block, 200, block, block, index[12], 2);
              if (PickupObject.length == 0) {
                  PickupObject.push(Diamant);
              } else if (Diamant.posx - PickupObject[PickupObject.length - 1].posx > 400) {
                  PickupObject.push(Diamant);
              }
        
    }
    

    // Calcul du Score
    
    function CalcScore()
    {
        if (bonus !== 0)
        {
            score += 500;
            bonus = 0;
        }
        score++;
    }

    
    
        
    // Application de la physique aux objets

    function Physique() {
        
                //gestion de la gravité  
        // si le personnage est sur un block ou il peut marcher
         

        if (WalkableBlock.length >= 2) {
            var inblock = ((personnage.posx+personnage.sizex >= WalkableBlock[1].posx ) && (personnage.posx <= WalkableBlock[1].posx+WalkableBlock[1].sizex));
            var inblock2 = ((personnage.posx+personnage.sizex >= WalkableBlock[2].posx ) && (personnage.posx <= WalkableBlock[2].posx+WalkableBlock[2].sizex));
            var dans2block = (personnage.posx <= WalkableBlock[1].posx+WalkableBlock[1].sizex) && (personnage.posx+personnage.sizex >= WalkableBlock[2].posx);
            var pieddroitdansblock1 = (personnage.posx+personnage.sizex > WalkableBlock[1].posx) && (personnage.posx+personnage.sizex < WalkableBlock[2].posx);
            var pieddroitdansblock2 = (personnage.posx+personnage.sizex > WalkableBlock[2].posx );
            
            if (dans2block)
            {
                console.log("yes");
                if (pieddroitdansblock1)
                {
                    currentfloor = WalkableBlock[1].posy;
                     if (saut == false && personnage.posy+personnage.sizey != currentfloor)
                {
                 personnage.posy += 2.5;
                    console.log("fuck3");
                }
                }
                if (pieddroitdansblock2)
                {
                    console.log("oui");
                     currentfloor = WalkableBlock[2].posy;
                     if (saut == false && personnage.posy+personnage.sizey != currentfloor)
                {
                    
                 personnage.posy += 2.5;
                    console.log("fuck4");
                }
                }
                
            }

            else if (pieddroitdansblock1) {
                
                currentfloor = WalkableBlock[1].posy;
                if (saut == false && personnage.posy+personnage.sizey != currentfloor)
                {
                 personnage.posy += 2.5;
                    console.log("fuck1");
                }
                    
            } 
            else if (pieddroitdansblock2)
            {
                currentfloor = WalkableBlock[2].posy;
                if (saut == false && personnage.posy+personnage.sizey != currentfloor)
                {
                 personnage.posy += 2.5;
                     console.log("fuck2");
                    
            }
            }

            
            else {
                {
                    currentfloor = 390;
                    if (personnage.posy + personnage.sizey != currentfloor && saut == false) {
                        personnage.posy += 2.5;
                        console.log("jesuisresponsable");
                    }
                }
            }
        }

        
            // gestion des collisions avec les block de type sol
         if (WalkableBlock.length >= 2) {
            if (inblock || inblock2) {

                if ((personnage.posy + personnage.sizey) > currentfloor) {
                    GameLost == true;
                }
            }
         }
        
            
        

        // gestion des objets

        if (PickupObject.length != 0) {
            // on test seulement les obstacles susceptible d'entrer en collision le 2 premier du tableau car l'espacement minimal est de 4block
            for (var i = 0; i < 1; i++) {
                if (((personnage.posx + personnage.sizex) >= PickupObject[i].posx && (personnage.posx + personnage.sizex) <= PickupObject[i].posx + PickupObject[i].sizex) || ((personnage.posx >= PickupObject[i].posx) && personnage.posx <= PickupObject[i].posx + PickupObject[i].sizex)) {
                    // et que le point le plus bas est dans l'obstacle
                    if (personnage.posy > (PickupObject[i].posy+ PickupObject[i].sizey)) {
                        PickupObject.splice(i,1);
                        bonus = true;
                    }
                }
            }
        }


        //gestion des obstacles 
        
        //on vérifie d'abord la présence d'obstacle sur le plateau
        if (obstacle.length != 0) {
            // on test seulement les obstacles susceptible d'entrer en collision le 2 premier du tableau car l'espacement minimal est de 4block
            for (var i = 0; i < 1; i++) {
                if (((personnage.posx + personnage.sizex) >= obstacle[i].posx && (personnage.posx + personnage.sizex) <= obstacle[i].posx + obstacle[i].sizex) || ((personnage.posx >= obstacle[i].posx) && personnage.posx <= obstacle[i].posx + obstacle[i].sizex)) {
                    // et que le point le plus bas est dans l'obstacle
                    if (personnage.posy + personnage.sizey > obstacle[i].posy) {
                        GameLost == true;
                    }
                }
            }
        }



    }
    
    //Calcul de l'état de jeu N+1
    
     function Scroll() {
         
         
        WBlock();
        Physique();
        ct++;   
        CalcScore();
         if (saut == true) {
            Jump();
        }

        // Personnage
        //Mouvement personnage
        if (ct % VitesseMouvement == 1 && saut == false) {
            
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



        //sol
        WalkableBlock[0].posx = WalkableBlock[0].posx - VitesseSol;
        WalkableBlock[0].posx = WalkableBlock[0].posx % 30;


        //on calcule les nouveaux blocks
        Obstacle();
        ScoreBonusBlock();
        
        //on bouge les blocks
        for (var i = 0; i < obstacle.length; i++) {
            obstacle[i].posx -= VitesseSol;
        }
        for (var i = 1; i < WalkableBlock.length; i++) {
            WalkableBlock[i].posx -= VitesseSol;
        }
        for (var i = 0; i < PickupObject.length; i++) {
            PickupObject[i].posx -= VitesseSol;
        }
        // On applique le moteur physique
        Draw();
    }

    // Affichage de l'état de jeu
    
    function Draw() {
        //On efface en affichant le Background par dessus l'image précédente
        
        Background();
        // Score
        context.fillText(score,25,25);
        // personnage
        context.drawImage(personnage.type, personnage.posx, personnage.posy, personnage.sizex, personnage.sizey);

        //Block de type sol 
        for (var i = 0; i < WalkableBlock.length; i++) {
            context.drawImage(WalkableBlock[i].type, WalkableBlock[i].posx, WalkableBlock[i].posy, WalkableBlock[i].sizex, WalkableBlock[i].sizey);
        }
        //Block de type obstacle
        for (var i = 0; i < obstacle.length; i++) {
            context.drawImage(obstacle[i].type, obstacle[i].posx, obstacle[i].posy, obstacle[i].sizex, obstacle[i].sizey);
        }
        //Block de type Objet
        for (var i = 0; i < PickupObject.length;i++) {
            context.drawImage(PickupObject[i].type, PickupObject[i].posx, PickupObject[i].posy, PickupObject[i].sizex, PickupObject[i].sizey);
        }
        setTimeout(Scroll, VitesseGlobale);
    }
    Draw();

});
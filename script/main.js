$(document).ready(function () {
    
    
  

    // récupération du canvas

    var canvas = $("#jeu")[0];
    var context = $("#jeu")[0].getContext("2d");

    ///////////////////////////////////////////


    //Initialisation de variables globales

    var block = 30;
    var PosSol = canvas.height - block;
    var solcube = 360;
    var level = 1;
    var diamandcount = 0;
    var GameLost = false;
    var meilleurscore = 0;
    context.font = '20pt VT323';
    
 

    //////////////////////////////////////

    // Stockage des images utilisés 

    var index = new Array();

    // block commun
    index[10] = $("#dirt")[0];
    index[20] = $("#sable")[0];
    index[30] = $("#crepuscule")[0];
    index[40] = $("#neige")[0];
    index[50] = $("#nocturne")[0];
    index[11] = $("#tnt")[0];
    index[12] = $("#pierre")[0];
    index[13] = $("#diamand")[0];
    index[14] = $("#overlayscore")[0];
    index[15] = $("#overlaydiamand")[0];
    index[16] = $("#overlayperdu")[0];
    

    //Mouvement du personnage
    index[1] = $("#steve1")[0];
    index[2] = $("#steve2")[0];
    index[3] = $("#steve1")[0];
    index[4] = $("#steve3")[0];
    index[5] = $("#steve4")[0];

    //Background
    index[100] = $("#bg1")[0];
    index[101] = $("#bg2")[0];
    index[200] = $("#bg3")[0];
    index[201] = $("#bg4")[0];
    index[300] = $("#bg5")[0];
    index[301] = $("#bg6")[0];
    index[400] = $("#bg7")[0];
    index[401] = $("#bg8")[0];
    index[500] = $("#bg9")[0];
    index[501] = $("#bg10")[0];

    ////////////////////////////////


    // Initialisation des tableaux contenants nos différends block

    var PickupObject = new Array();
    var WalkableBlock = new Array();
    var obstacle = new Array();
    var Map = new Array();

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
    var VitesseMouvement = 15; // augmenter diminue la vitesse
    var VitesseSol = 1;
    var VitesseSaut = 0.4;
    var HauteurSaut = 15;
    var VitesseBackground = 2;
    var VitesseGlobale = 10; // augmenter diminue la vitesse 
    var Gravite = 5;
    // fréquence block
    var waitthis = 730;
    var waitthistnt = 200;
    var waitthispickup = 500;

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
    var personnage = new physicObj(block * 3, PosSol - block * 2, 54, 60, index[1]);
Map[0] = new physicObj(0, PosSol, (canvas.width) + block, block, index[level*10]);
var overlayscore = new physicObj(10,10,180,48,index[14]);
var overlaydiamand = new physicObj(10,70,115,48,index[15]);




    // Affiche et fait défiler l'arrière plan

    function Background() {
        context.drawImage(index[level * 100], X + reset, 0);
        context.drawImage(index[level * 100 + 1], Y + reset, 0);

        reset -= VitesseBackground;
        if (reset == -900) {
            var tmp = X;
            X = Y;
            Y = tmp;
        }
        reset = reset % 900;

    }


    function Jump() {

        ctsaut+= VitesseSaut;
        personnage.type = index[5];
        personnage.sizex = 48;

        saut = true;
        if (ctsaut < 1) {
            personnage.posy = personnage.posy - (ctsaut * ctsaut / HauteurSaut);
        } else if (((personnage.posy + personnage.sizey) < currentfloor)) {
            personnage.posy = personnage.posy + (ctsaut * ctsaut / HauteurSaut);
            if ((personnage.posy + personnage.sizey) > currentfloor) {
                personnage.posy = currentfloor - personnage.sizey;
            }
        } else if ((personnage.posy + personnage.sizey) >= currentfloor) {
            saut = false;

            personnage.type = index[1];
            personnage.sizex = 52;
            personnage.posy = currentfloor - personnage.sizey;
        }

    }

    document.addEventListener("keydown", control);

    function control(e) {
        if (e.keyCode == 32 || e.keyCode == 38) {
             e.preventDefault();
            if (saut == false) {
                ctsaut = -HauteurSaut;
                Jump();
                saut = true;
            }
        }
    }







    // Calcul des obstacles

    function Obstacle() {
        // on supprime les obstacles hors de l'écran
        for (var i = 0; i < obstacle.length; i++) {
            if (obstacle[i].posx < -block) {
                obstacle.shift();
            }
            }
        
        var random = Math.floor(Math.random()*300)+1;
            
            if (obstacle.length == 0)
            {

                if (random <5)
                {
                var Nobs = new physicObj(canvas.width + block, solcube-block, 30, 30, index[11], 0);
                obstacle.push(Nobs);
                Map.push(Nobs);
                }
                
            }
            else if (obstacle[obstacle.length - 1].posx <= waitthistnt)
            {
                  if (random <100)
                {
                var Nobs = new physicObj(canvas.width + block, solcube-block, 30, 30, index[11], 0);
                obstacle.push(Nobs);
                Map.push(Nobs);
                }
            
        }

    }

    //Calcul des blocks de type sol

    function WaBlock() {
        
 psolcube = solcube;
        for (var i = 0; i < WalkableBlock.length; i++) {
            if (WalkableBlock[i].posx <= -252) {
                WalkableBlock.shift();
            }
        }
        var Wblock = new physicObj(canvas.width + block, solcube, 200, 30, index[12], 0);
        if (WalkableBlock.length > 0) {
            if (WalkableBlock[WalkableBlock.length - 1].posx <= waitthis) {

                var random = Math.floor(Math.random() * 100);


                if (random > 50) {
                    if ((solcube - block) > 30) {
                        solcube -= block;
                    }
                } else if (random <= 50) {
                    
                    if (solcube + block == 390)
                    {
                    solcube =390;
                    }
                    if (solcube + block < 390) {
                        solcube += block;
                    }
                }
                if (solcube == 390)
                {
                    waitthis -=200
                }
                else
                {
                var Wblock = new physicObj(canvas.width + block, solcube, 200, 30, index[12], 0);
                WalkableBlock.push(Wblock);
                Map.push(Wblock);
                waitthis = 730;
                }

            }
        }
         else {
            WalkableBlock.push(Wblock);
            Map.push(Wblock);
        }

    }

    //Calcul des blocks de apportant un bonus de Score
    function ScoreBonusBlock() {
        for (var i = 0; i < PickupObject.length; i++) {
            if (PickupObject[i].posx < -block) {
                PickupObject.shift();
            }
        }
        
        var random = Math.floor(Math.random()*300)+1;
            
            if (PickupObject.length == 0)
            {

                if (random <5)
                {
                var Npickup = new physicObj(canvas.width + block, solcube-block*5, 30, 30, index[13], 0);
                PickupObject.push(Npickup);
                }
                
            }
            else if (PickupObject[PickupObject.length - 1].posx <= waitthispickup)
            {
                  if (random <100)
                {
                var Npickup = new physicObj(canvas.width + block, solcube-block*5, 30, 30, index[13], 0);
                PickupObject.push(Npickup);
                }

    }
    }

    // Calcul du score
    function CalcScore() {
           
        score++;
        if (bonus != 0) {
            score += 500;
            bonus = 0;
        }
        if (score >= 2000 && score <= 4000 ) {
            level = 2;
          VitesseSol = 1.25;
          VitesseSaut = 0.5
          HauteurSaut = 17;
        VitesseMouvement = 13;

        }
        else if (score >= 4000 && score <= 6000) {
            level = 3;
         VitesseSol = 1.5;
          VitesseSaut = 0.6;
          HauteurSaut = 17;
            VitesseMouvement = 11;
        }
        else if (score >= 6000 && score <= 8000) {
            level = 4;
        VitesseSol = 2;
          VitesseSaut = 0.7;
          HauteurSaut = 20;
            VitesseMouvement = 9;
        }
        else if (score >= 8000) {
        VitesseMouvement = 9;
         level = 5;
          VitesseSol = 2;
          VitesseSaut = 0.8;
          HauteurSaut = 25;
        }
        }
    




    // Application de la physique aux objets

    function Physique() {

        //gestion de la gravité  
        // si le personnage est sur un block ou il peut marcher


        if (WalkableBlock.length >= 2) {
            var inblock = ((personnage.posx + personnage.sizex >= WalkableBlock[0].posx) && (personnage.posx <= WalkableBlock[0].posx + WalkableBlock[0].sizex));
            var inblock2 = ((personnage.posx + personnage.sizex >= WalkableBlock[1].posx) && (personnage.posx <= WalkableBlock[1].posx + WalkableBlock[1].sizex));
            var dans2block = (personnage.posx <= WalkableBlock[0].posx + WalkableBlock[0].sizex) && (personnage.posx + personnage.sizex >= WalkableBlock[1].posx);
            var pieddroitdansblock1 = (personnage.posx + personnage.sizex > WalkableBlock[0].posx) && (personnage.posx + personnage.sizex < WalkableBlock[1].posx);
            var pieddroitdansblock2 = (personnage.posx+30 > WalkableBlock[1].posx);

            if (dans2block) {
                if (pieddroitdansblock1) {
                    currentfloor = WalkableBlock[0].posy;
                    if (saut == false && personnage.posy + personnage.sizey != currentfloor) {
                        personnage.posy += Gravite;
                    }
                }
                if (pieddroitdansblock2) {
                    currentfloor = WalkableBlock[1].posy;
                    if (saut == false && personnage.posy + personnage.sizey != currentfloor) {

                        personnage.posy += Gravite;
                        }
                    }
                }

             else if (inblock) {

                currentfloor = WalkableBlock[0].posy;
                if (saut == false && personnage.posy + personnage.sizey != currentfloor) {
                    personnage.posy += Gravite;
                }

            } else if (inblock2) {
                currentfloor = WalkableBlock[1].posy;
                if (saut == false && personnage.posy + personnage.sizey != currentfloor) {
                    personnage.posy += Gravite;
                }
            } else {
                {
                    currentfloor = 390;
                    if (personnage.posy + personnage.sizey != currentfloor && saut == false) {
                        personnage.posy += Gravite;
                    }
                }
            }
        }


        // gestion des collisions avec les block de type sol
        if (WalkableBlock.length >= 2) {
            if (inblock || inblock2) {

                if ((personnage.posy + personnage.sizey) > currentfloor) {
                    GameLost = true;
                }

                }
            }
        
    




        // gestion des objets

        if (PickupObject.length != 0) {
            for (var i = 0; i < 1; i++) {
                if ( (personnage.posx+personnage.sizex-18 >= PickupObject[i].posx) || ((personnage.posx > PickupObject[i].posx) && (personnage.posx <PickupObject[i].posx+PickupObject[i].sizex))) {
                    // et que le point le plus bas est dans l'obstacle
                    if (personnage.posy <= (PickupObject[i].posy+PickupObject[i].sizey)) {
                        PickupObject.splice(i, 1);
                        bonus = true;
                        diamandcount++;
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
                        GameLost = true;
                    }
                }
            }
        }



    }


    function HorsMap() {

        // le sol est situé dans l'index 0 on commence donc à 1
        for (var i = 1; i < Map.length; i++) {
            if (Map[i].posx <= -252) {
                Map.splice(i, 1);

            }
        }
    }

    //Calcul de l'état de jeu N+1

    function Scroll() {
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
            personnage.type = index[(ctp % 4) + 1];
            ctp++;
        }



        //sol
        Map[0].type = index[level*10];
        Map[0].posx = Map[0].posx - VitesseSol;
        Map[0].posx = Map[0].posx % 30;


        //on calcule les nouveaux blocks
        WaBlock();
        Obstacle(); 
        ScoreBonusBlock();
        HorsMap();

        //on bouge les blocks de la map
        for (var i = 1; i < Map.length; i++) {
            Map[i].posx -= VitesseSol;
        }
        for (var i = 0; i < WalkableBlock.length; i++) {
            WalkableBlock[i].posx -= VitesseSol;
        }
        for (var i = 0; i < obstacle.length; i++) {
            obstacle[i].posx -= VitesseSol;
        }
        for (var i = 0; i < PickupObject.length; i++) {
            PickupObject[i].posx -= VitesseSol*2;
        }

        // On applique le moteur physique
        Draw();
    }

    // Affichage de l'état de jeu

    function Draw() {
        //On efface en affichant le Background par dessus l'image précédente
       if (GameLost == false)
        {
        Background();
        // personnage
        context.drawImage(personnage.type, personnage.posx, personnage.posy, personnage.sizex, personnage.sizey);

        //Map 
        for (var i = 0; i < Map.length; i++) {
            context.drawImage(Map[i].type, Map[i].posx, Map[i].posy, Map[i].sizex, Map[i].sizey);
        }
         for (var i = 0; i < PickupObject.length; i++) {
            context.drawImage(PickupObject[i].type, PickupObject[i].posx, PickupObject[i].posy, PickupObject[i].sizex, PickupObject[i].sizey);
        }
        //overlay
        context.drawImage(overlayscore.type,overlayscore.posx,overlayscore.posy,overlayscore.sizex,overlayscore.sizey);
        context.drawImage(overlaydiamand.type,overlaydiamand.posx,overlaydiamand.posy,overlaydiamand.sizex,overlaydiamand.sizey);
                // Score
        context.fillText(score, 80, 37);
        context.fillText(diamandcount, 55, 95);
 
        setTimeout(Scroll, VitesseGlobale);
        }
        else
        {
         context.drawImage(index[16],0,0);
         context.font = '20pt VT323';
         context.fillText(score,465,310);
        }
    }
   Draw();

});
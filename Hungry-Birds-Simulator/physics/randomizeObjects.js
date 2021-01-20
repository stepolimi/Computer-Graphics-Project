// JavaScript source code
let bird; 
let pigChoiche;
let choiche;
let tower;
let piece;
let objType;

//meshes for random birds
var bird1;
var bird2;
var bird3;
var bird4;
var bird5;

//meshes fot tower 1
var tower11;
var tower12;
var tower13;
var tower14;
var tower15;
var tower16;
var tower17;
var tower18;
var tower19;
var tower110;
var tower111;
var tower112;
var tower113;
var tower114;
var tower115;
var tower116;
var tower117;
var tower118;
var tower119;
var tower120;
var pig11;
var pig12;
var pig13;


//meshes for tower 2
var pig21; 
var	pig22; 
var pig23; 
var pig24; 
var pig25; 

var tower21;   
var tower22;   
var tower23;   
var tower24;   
var tower25;   
var tower26;   
var tower27;   
var tower28;   
var tower29;   
var tower210;   
var tower211;   
var tower212;
var tower213;
var tower214;
var tower215;
var tower216;
var tower217;
var tower218;
var tower219;
var tower220;


//Tower 3
var pig31;
var tower31;
var tower32;
var tower33;
var tower34;
var tower35;
var tower36;
var tower37;

//arrays
var birdsArray = [];
var structureObjs = [];


function randomizeBirds(birdChuck, birdRed, birdBomb, birdMatilda){
    for(let i=0; i<5; i++){
        let min = Math.ceil(1);
        let max = Math.floor(4);
        choiche = Math.floor(Math.random() * (max - min + 1)) + min;
        let birdName;

        switch(choiche){
            case 1:
                bird = birdRed;
                birdName = "red";
                break;
            case 2:
                bird = birdChuck;
                birdName = "chuck";
                break;
            case 3:
                bird = birdBomb;
                birdName = "bomb";
                break;
            case 4:
                bird = birdMatilda;
                birdName = "matilda";
                break;
            default:
                bird = birdRed;
                birdName = "red";
                break;
        }

        switch(i){
            case 0:
                  bird1 = bird;
                  birdsArray[i] = new birdObject(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, birdName);
                  break;
            case 1:
                  bird2 = bird;
                  birdsArray[i] = new birdObject(-0.5, 0.0 , -7.5, 0.0, 0.0, 0.0, birdName);
                  break;
            case 2:
                  bird3 = bird;
                  birdsArray[i] = new birdObject(-1.5, 0.0 , -7.5, 0.0, 0.0, 0.0, birdName);
                  break;
            case 3:
                  bird4 = bird;
                  birdsArray[i] = new birdObject(-2.5, 0.0 , -7.5, 0.0, 0.0, 0.0, birdName);
                  break;
            case 4:
                  bird5 = bird;
                  birdsArray[i] = new birdObject(-3.5, 0.0 , -7.5, 0.0, 0.0, 0.0, birdName);
                  break;
        }
    }
}
    

function randomizePigs(pig, pigHelmet, pigMustache){
	for(let i=0; i<9; i++){
        let min = Math.ceil(1);
        let max = Math.floor(3);
        choiche = Math.floor(Math.random() * (max - min + 1)) + min;
        
        switch(choiche){
            case 1:
                pigChoiche = pig;
                objType = "pig";
                break;
            case 2:
                pigChoiche = pigHelmet;
                objType = "pigHelmet";
                break;
            case 3:
                pigChoiche = pigMustache;
                objType = "pigMustache";
                break;
            default:
                pigChoiche = pig;
                objType = "pig";
                break;
        }
        
        switch(i){
            case 0:
                pig11 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 0.0 , 1.8, 270.0, 0.0, 0.0, objType, 10 ));
                break;
            case 1:
                pig12 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 1.8 , 0.2, 270.0, 0.0, 0.0, objType, 11 ));
                break;
            case 2:
                pig13 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 3.8 , 0.2, 270.0, 0.0, 0.0, objType, 12 ));
                break;
             case 3:
                pig21 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 0.6 , 5.0, 270.0, 0.0, 0.0, objType, 34 ));
                break;
            case 4:
                pig22 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 1.35 , 5.8, 270.0, 0.0, 0.0, objType, 35 ));
                break;
            case 5:
                pig23 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 2.15 , 4.8, 270.0, 0.0, 0.0, objType, 36 ));
                break;
            case 6:
                pig24 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 4.0 , 5.0, 270.0, 0.0, 0.0, objType, 37 ));
                break;
            case 7:
                pig25 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 6.8 , 5.0, 270.0, 0.0, 0.0, objType, 38 ));
                break;
            case 8:
                pig31 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 2.1 , 7.8, 270.0, 0.0, 0.0, objType, 60 ));
                break;
                
        }
    }
}



function defineStructureObjs(tnt, glassBox, woodBox, stoneBox, stoneSquare, woodPyramid, glassPyramid, stonePyramid, glassVerticalPlane, woodVerticalPlane, glassHorizontalPlane, woodHorizontalPlane){
    tower112 = tnt;
    structureObjs.push(new structureObjects(0.0, 0.75,0.2, 0.4, 0.0, 0.0,  "tnt", 24 ));

    tower210 = tnt;
    structureObjs.push(new structureObjects(0.0, 3.2, 5.0 , 0.4, 0.0, 0.0,  "tnt", 48 ));

    tower31 = tnt;
    structureObjs.push(new structureObjects(0.0, 1.5 , 7.0, 0.0, 0.0, 0.0,  "tnt", 61 ));

    tower32 = tnt;
    structureObjs.push(new structureObjects(0.0, 1.5 , 7.8, 0.0, 0.0, 0.0,  "tnt", 62 ));
    
    tower33 = tnt;
    structureObjs.push(new structureObjects(0.0, 1.5 , 8.6, 0.0, 0.0, 0.0,  "tnt", 63 ));


    randomizeCube(glassBox, woodBox, stoneBox, stoneSquare);
    randomizePyramid(woodPyramid, glassPyramid, stonePyramid);
    randomizeVerticalPlane(glassVerticalPlane, woodVerticalPlane);
    randomizeHorizontalPlane(glassHorizontalPlane, woodHorizontalPlane);
}


//randomize type of horizontal pieces between glass and wood
function randomizeHorizontalPlane(glassHorizontalPlane, woodHorizontalPlane){
    for(let i=0; i<7; i++){
        let min = Math.ceil(1);
        let max = Math.floor(2);
        choiche = Math.floor(Math.random() * (max - min + 1)) + min;

        switch(choiche){
            case 1:
                piece = glassHorizontalPlane;
                objType = "glassHorizontalPlane";
                break;
            case 2:
                piece = woodHorizontalPlane;
                objType = "woodHorizontalPlane";
                break;
            default:
                piece = glassHorizontalPlane;
                objType = "glassHorizontalPlane";
                break;
        }

        switch(i){
            case 0:
                tower16 = piece;
                structureObjs.push(new structureObjects(0.0, 0.5 ,  1.8, 0.0, 0.0, 0.0, objType, 18 ));
                break;
            case 1:
                tower113 = piece;
                structureObjs.push(new structureObjects(0.0, 1.3 , 0.2, 0.0, 0.0, 0.0, objType, 25 ));
                break;
            case 2:
                tower116 = piece;
                structureObjs.push(new structureObjects(0.0, 2.3 , 0.2, 0.0, 0.0, 0.0, objType, 28 ));
                break;
            case 3:
                tower118 = piece;
                structureObjs.push(new structureObjects(0.0, 3.3 , 0.2, 0.0, 0.0, 0.0, objType, 30 ));
                break;
            case 4:
                tower212 = piece;
                structureObjs.push(new structureObjects(0.0, 3.7, 5.0, 0.0, 0.0, 0.0, objType, 50 ));
                break;
            case 5:
                tower220 = piece;
                structureObjs.push(new structureObjects(0.0, 6.3 , 5.0, 0.0, 0.0, 0.0, objType, 58 ));
                break;
            case 6:
                tower36 = piece;
                structureObjs.push(new structureObjects(0.0, 2.8 , 7.8, 0.0, 0.0, 0.0, objType, 66 ));
                break;
        }
    }
}


//randomize type of vertical pieces between glass or wood
function randomizeVerticalPlane(glassVerticalPlane, woodVerticalPlane){
    for(let i=0; i<10; i++){
        let min = Math.ceil(1);
        let max = Math.floor(2);
        choiche = Math.floor(Math.random() * (max - min + 1)) + min;

        switch(choiche){
            case 1:
                piece = glassVerticalPlane;
                objType = "glassVerticalPlane";
                break;
            case 2:
                piece = woodVerticalPlane;
                objType = "woodVerticalPlane";
                break;
            default:
                piece = glassVerticalPlane;
                objType = "glassVerticalPlane";
                break;
        }

        
        console.log("birdName " + objType );

        switch(i){
            case 0:
                tower14 = piece;
                structureObjs.push(new structureObjects(0.0, 0.0 , 1.05, 0.0, 0.0, 0.0, objType, 16 ));
                break;
            case 1:
                tower15 = piece;
                structureObjs.push(new structureObjects(0.0, 0.0 , 2.55, 0.0, 0.0, 0.0, objType, 17 ));
                break;
            case 2:
                tower110 = piece;
                structureObjs.push(new structureObjects(0.0, 0.8,-0.55, 0.0, 0.0, 0.0, objType, 22 ));
                break;
            case 3:
                tower111 = piece;
                structureObjs.push(new structureObjects(0.0, 0.8 ,0.95, 0.0, 0.0, 0.0, objType, 23 ));
                break;
            case 4:
                tower114 = piece;
                structureObjs.push(new structureObjects(0.0, 1.8,-0.55, 0.0, 0.0, 0.0, objType, 26 ));
                break;
            case 5:
                tower115 = piece;
                structureObjs.push(new structureObjects(0.0, 1.8 ,0.95, 0.0, 0.0, 0.0, objType, 27 ));
                break;
            case 6:
                tower24 = piece;
                structureObjs.push(new structureObjects(0.0, 1.6 , 5.45, 0.0, 0.0, 0.0, objType, 42 ));
                break;
            case 7:
                tower25 = piece;
                structureObjs.push(new structureObjects(0.0, 1.6 , 6.15, 0.0, 0.0, 0.0, objType, 43 ));
                break;
            case 8:
                tower26 = piece;
                structureObjs.push(new structureObjects(0.0, 2.4 , 5.45, 0.0, 0.0, 0.0, objType, 44 ));
                break;
            case 9:
                tower27 = piece;
                structureObjs.push(new structureObjects(0.0, 2.4 , 6.15, 0.0, 0.0, 0.0, objType, 45 ));
                break;

        }
    }
}


//randomize type of pyramid between stone, glass or wood
function randomizePyramid(woodPyramid, glassPyramid, stonePyramid){
    for(let i=0; i<8; i++){
        let min = Math.ceil(1);
        let max = Math.floor(3);
        choiche = Math.floor(Math.random() * (max - min + 1)) + min;

        switch(choiche){
            case 1:
                piece = glassPyramid;
                objType = "glassPyramid";
                break;
            case 2:
                piece = woodPyramid;
                objType = "woodPyramid";
                break;
            case 3:
                piece = stonePyramid;
                objType = "stonePyramid";
                break;
            default:
                piece = glassPyramid;
                objType = "glassPyramid";
                break;
        }//same number as the possible different pieces


        switch(i){
            case 0:
                tower11 = piece;
                structureObjs.push(new structureObjects(0.0, 0.0 , -1.0, 0.0, 0.0, 0.0, objType, 13 ));
                break;
            case 1:
                tower19 = piece;
                structureObjs.push(new structureObjects(0.0, 2.6 ,  1.8, 0.0, 0.0, 0.0, objType, 21 ));
                break;
            case 2:
                tower120 = piece;
                structureObjs.push(new structureObjects(0.0, 4.6 , 0.2, 0.0, 0.0, 0.0, objType, 32 ));
                break;
            case 3:
                tower215 = piece;
                structureObjs.push(new structureObjects(0.0, 5.8 , 5.8, 0.0, 0.0, 0.0, objType, 53 ));
                break;
            case 4:
                tower217 = piece;
                structureObjs.push(new structureObjects(0.0, 5.8 , 4.2, 0.0, 0.0, 0.0, objType, 55 ));
                break;
            case 5:
                tower34 = piece;
                structureObjs.push(new structureObjects(0.0, 2.3 , 7.2, 0.0, 0.0, 0.0, objType, 64 ));
                break;
            case 6:
                tower35 = piece;
                structureObjs.push(new structureObjects(0.0, 2.3 , 8.6, 0.0, 0.0, 0.0, objType, 65 ));
                break;
            case 7:
                tower37 = piece;
                structureObjs.push(new structureObjects(0.0, 3.3 , 7.8, 0.0, 0.0, 0.0, objType, 67 ));
                break;
        }
    }
}


//randomize type of cube between ston, glass or wood
function randomizeCube(glassBox, woodBox, stoneBox, stoneSquare){
    for(let i=0; i<17; i++){
        let min = Math.ceil(1);
        let max = Math.floor(4);
        choiche = Math.floor(Math.random() * (max - min + 1)) + min;

        switch(choiche){
            case 1:
                piece = glassBox;
                objType = "glassBox";
                break;
            case 2:
                piece = woodBox;
                objType = "woodBox";
                break;
            case 3:
                piece = stoneBox;
                objType = "stoneBox";
                break;
            case 4:
                piece = stoneSquare;
                objType = "stoneSquare";
                break;
            default:
                piece = glassBox;
                objType = "glassBox";
                break;
        }//same number as the possible different pieces


        switch(i){
            case 0:
                tower12 = piece;
                structureObjs.push(new structureObjects(0.0, 6.0 , -0.2, 0.0, 0.0, 0.0, objType, 14 ));
                break;
            case 1:
                tower13 = piece;
                structureObjs.push(new structureObjects(0.0, 0.0 ,  0.6, 0.0, 0.0, 0.0, objType, 15 ));
                break;
            case 2:
                tower17 = piece;
                structureObjs.push(new structureObjects(0.0, 1.0 ,  1.8, 0.0, 0.0, 0.0, objType, 19 ));
                break;
            case 3:
                tower18 = piece;
                structureObjs.push(new structureObjects(0.0, 1.8 ,  1.8, 0.0, 0.0, 0.0, objType, 20 ));
                break;
            case 4:
                tower117 = piece;
                structureObjs.push(new structureObjects(0.0, 2.8 , 0.2, 0.0, 0.0, 0.0, objType, 29 ));
                break;
            case 5:
                tower119 = woodBox;
                structureObjs.push(new structureObjects(0.0, 3.8 , 0.2, 0.0, 0.0, 0.0, "woodBox", 31 ));
                break;
            case 6:
                tower21 = piece;
                structureObjs.push(new structureObjects(0.0, 0.8 , 4.2, 0.0, 0.0, 0.0, objType, 39 ));
                break;
            case 7:
                tower22 = piece;
                structureObjs.push(new structureObjects(0.0, 0.8 , 5.8, 0.0, 0.0, 0.0, objType, 40 ));
                break;
            case 8:
                tower23 = piece;
                structureObjs.push(new structureObjects(0.0, 1.6 , 4.6, 0.0, 0.0, 0.0, 0.2, objType, 41 ));
                break;
            case 9:
                tower28 = piece;
                structureObjs.push(new structureObjects(0.0, 2.4 ,  4.2, 0.0, 0.0, 0.0, objType, 46 ));
                break;
            case 10:
                tower29 = piece;
                structureObjs.push(new structureObjects(0.0, 3.2 ,  4.2, 0.0, 0.0, 0.0, objType, 47 ));
                break;
            case 11:
                tower211 = piece;
                structureObjs.push(new structureObjects(0.0, 3.2 , 5.8, 0.0, 0.0, 0.0, objType, 49 ));
                break;
            case 12:
                tower213 = piece;
                structureObjs.push(new structureObjects(0.0, 4.2 , 5.8, 0.0, 0.0, 0.0, objType, 51 ));
                break;
            case 13:
                tower214 = piece;
                structureObjs.push(new structureObjects(0.0, 5.0 , 5.8, 0.0, 0.0, 0.0, objType, 52 ));
                break;
            case 14:
                tower216 = piece;
                structureObjs.push(new structureObjects(0.0, 5.8 , 5.0, 0.0, 0.0, 0.0, objType, 54 ));
                break;
            case 15:
                tower218 = piece;
                structureObjs.push(new structureObjects(0.0, 5.0 , 4.2, 0.0, 0.0, 0.0, objType, 56 ));
                break;
            case 16:
                tower219 = piece;
                structureObjs.push(new structureObjects(0.0, 4.2 , 4.2, 0.0, 0.0, 0.0, objType, 57 ));
                break;

        }
    }
}
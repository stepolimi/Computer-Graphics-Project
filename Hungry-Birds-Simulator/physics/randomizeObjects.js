// JavaScript source code
let bird; 
let pigChoiche;
let choiche;
let tower;
let piece;
let objType

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


//arrays
var birdsArray = [];
var structureObjs = [];



function randomizeBirds(birdC, birdR, birdB, birdM){
    for(let i=0; i<5; i++){
        let min = Math.ceil(1);
        let max = Math.floor(4);
        choiche = Math.floor(Math.random() * (max - min + 1)) + min;
        let birdName;

        switch(choiche){
            case 1:
                bird = birdR;
                birdName = "red";
                break;
            case 2:
                bird = birdC;
                birdName = "chuck";
                break;
            case 3:
                bird = birdB;
                birdName = "bomb";
                break;
            case 4:
                bird = birdM;
                birdName = "matilda";
                break;
            default:
                bird = birdR;
                birdName = "red";
                break;
        }
        console.log("birdName " + birdName );

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
	for(let i=0; i<3; i++){
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
        
        console.log("birdName " + objType );
        
        switch(i){
            case 0:
                pig11 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 0.0 , 6.0, 270.0, 0.0, 0.0, objType ));
                break;
            case 1:
                pig12 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 1.8 , 6.0, 270.0, 0.0, 0.0, objType ));
                break;
            case 2:
                pig13 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 3.8 , 2.0, 270.0, 0.0, 0.0, objType ));
                break;
            default:
                break;
        }
    }
}



function defineStructureObjs(tnt, glassBox, woodBox, stoneBox, woodPyramid, glassPyramid, stonePyramid, glassVerticalPlane, woodVerticalPlane, glassHorizontalPlane, woodHorizontalPlane){
    tower112 = tnt;
    structureObjs.push(new structureObjects(0.0, 0.7 , 2.0, 0.0, 0.0, 0.0,  "tnt" ));

    randomizeCube(glassBox, woodBox, stoneBox);
    randomizePyramid(woodPyramid, glassPyramid, stonePyramid);
    randomizeVerticalPlane(glassVerticalPlane, woodVerticalPlane);
    randomizeHorizontalPlane(glassHorizontalPlane, woodHorizontalPlane);
}


//randomize type of horizontal pieces between glass and wood
function randomizeHorizontalPlane(glassHorizontalPlane, woodHorizontalPlane){
    for(let i=0; i<3; i++){
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

        switch(i){
            case 0:
                tower16 = piece;
                structureObjs.push(new structureObjects(0.0, 0.5 ,  6.0, 0.0, 0.0, 0.0, objType ));
                break;
            case 1:
                tower113 = piece;
                structureObjs.push(new structureObjects(0.0, 2.3 , 2.0, 0.0, 0.0, 0.0, objType ));
                break;
            case 2:
                tower116 = piece;
                structureObjs.push(new structureObjects(0.0, 3.3 , 2.0, 0.0, 0.0, 0.0, objType ));
                break;
            case 3:
                tower118 = piece;
                structureObjs.push(new structureObjects(0.0, 4.3 , 4.0, 0.0, 0.0, 0.0, objType ));
                break;
        }
    }
}


//randomize type of vertical pieces between glass or wood
function randomizeVerticalPlane(glassVerticalPlane, woodVerticalPlane){
    for(let i=0; i<6; i++){
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
        }//same number as the possible different pieces


        switch(i){
            case 0:
                tower14 = piece;
                structureObjs.push(new structureObjects(0.0, 0.0 ,  4.5, 0.0, 0.0, 0.0, objType ));
                break;
            case 1:
                tower15 = piece;
                structureObjs.push(new structureObjects(0.0, 0.0 ,  7.5, 0.0, 0.0, 0.0, objType ));
                break;
            case 2:
                tower110 = piece;
                structureObjs.push(new structureObjects(0.0, 0.8 , 1.0, 0.0, 0.0, 0.0, objType ));
                break;
            case 3:
                tower111 = piece;
                structureObjs.push(new structureObjects(0.0, 0.8 , 3.0, 0.0, 0.0, 0.0, objType ));
                break;
            case 4:
                tower115 = piece;
                structureObjs.push(new structureObjects(0.0, 2.8 , 3.0, 0.0, 0.0, 0.0, objType ));
                break;
            case 5:
                tower116 = piece;
                structureObjs.push(new structureObjects(0.0, 3.3 , 2.0, 0.0, 0.0, 0.0, objType ));
                break;
        }
    }
}


//randomize type of pyramid between stone, glass or wood
function randomizePyramid(woodPyramid, glassPyramid, stonePyramid){
    for(let i=0; i<3; i++){
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
                structureObjs.push(new structureObjects(0.0, 0.0 , -1.0, 0.0, 0.0, 0.0, objType ));
                break;
            case 1:
                tower19 = piece;
                structureObjs.push(new structureObjects(0.0, 2.6 ,  6.0, 0.0, 0.0, 0.0, objType ));
                break;
            case 2:
                tower120 = piece;
                structureObjs.push(new structureObjects(0.0, 5.6 , 4.0, 0.0, 0.0, 0.0, objType ));
                break;
            default:
                break;
}


//randomize type of cube between ston, glass or wood
function randomizeCube(glassBox, woodBox, stoneBox){
    for(let i=0; i<6; i++){
        let min = Math.ceil(1);
        let max = Math.floor(3);
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
            default:
                piece = glassBox;
                objType = "glassBox";
                break;
        }//same number as the possible different pieces


        switch(i){
            case 0:
                tower12 = piece;
                structureObjs.push(new structureObjects(0.0, 0.0 ,  1.0, 0.0, 0.0, 0.0, objType ));
                break;
            case 1:
                tower13 = piece;
                structureObjs.push(new structureObjects(0.0, 0.0 ,  3.0, 0.0, 0.0, 0.0, objType ));
                break;
            case 2:
                tower17 = piece;
                structureObjs.push(new structureObjects(0.0, 1.0 ,  6.0, 0.0, 0.0, 0.0, objType ));
                break;
            case 3:
                tower18 = piece;
                structureObjs.push(new structureObjects(0.0, 1.8 ,  6.0, 0.0, 0.0, 0.0, objType ));
                break;
            case 4:
                tower117 = piece;
                structureObjs.push(new structureObjects(0.0, 3.8 , 2.0, 0.0, 0.0, 0.0, objType ));
                break;
            case 5:
                tower119 = piece;
                structureObjs.push(new structureObjects(0.0, 4.8 , 4.0, 0.0, 0.0, 0.0, objType ));
                break;

        }
    }
}
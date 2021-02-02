// JavaScript source code
var birdChoiche; 
var pigChoiche;
var choiche;
var tower;
var piece;
var objType;
var mass;

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

//meshes for tower 3
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

//randomize type of birds between red, chuck, matilda and bomb
function randomizeBirds(birdChuck, birdRed, birdBomb, birdMatilda){
    for(let i=0; i<5; i++){
        let min = Math.ceil(1);
        let max = Math.floor(4);
        choiche = Math.floor(Math.random() * (max - min + 1)) + min;
        let birdName;

        switch(choiche){
            case 1:
                birdChoiche = birdRed;
                birdName = "red";
                mass = 1;
                break;
            case 2:
                birdChoiche = birdChuck;
                birdName = "chuck";
                mass = 1;
                break;
            case 3:
                birdChoiche = birdBomb;
                birdName = "bomb";
                mass = 2;
                break;
            case 4:
                birdChoiche = birdMatilda;
                birdName = "matilda";
                mass = 2;
                break;
            default:
                birdChoiche = birdRed;
                birdName = "red";
                mass = 1;
                break;
        }

        switch(i){
            case 0:
                  bird1 = birdChoiche;
                  birdsArray[i] = new birdObject(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, birdName, mass);
                  break;
            case 1:
                  bird2 = birdChoiche;
                  birdsArray[i] = new birdObject(-0.5, 0.0 , -7.5, 0.0, 0.0, 0.0, birdName, mass);
                  break;
            case 2:
                  bird3 = birdChoiche;
                  birdsArray[i] = new birdObject(-1.5, 0.0 , -7.5, 0.0, 0.0, 0.0, birdName, mass);
                  break;
            case 3:
                  bird4 = birdChoiche;
                  birdsArray[i] = new birdObject(-2.5, 0.0 , -7.5, 0.0, 0.0, 0.0, birdName, mass);
                  break;
            case 4:
                  bird5 = birdChoiche;
                  birdsArray[i] = new birdObject(-3.5, 0.0 , -7.5, 0.0, 0.0, 0.0, birdName, mass);
                  break;
        }
    }
}
    
//randomize type of pigs between pig, pigHelmet and pigMustache
async function randomizePigs(){
	for(let i=0; i<9; i++){
        let min = Math.ceil(1);
        let max = Math.floor(3);
        choiche = Math.floor(Math.random() * (max - min + 1)) + min;
        
        switch(choiche){
            case 1:
                pigChoiche = await utils.loadMesh("../assets/Pigs/pig.obj"); 
                objType = "pig";
                mass = 3;
                break;
            case 2:
                pigChoiche = await utils.loadMesh("../assets/Pigs/pighelment.obj"); 
                objType = "pigHelmet";
                mass = 5;
                break;
            case 3:
                pigChoiche = await utils.loadMesh("../assets/Pigs/pigstache.obj"); 
                objType = "pigMustache";
                mass = 7;
                break;
            default:
                pigChoiche = await utils.loadMesh("../assets/Pigs/pig.obj"); 
                objType = "pig";
                mass = 1;
                break;
        }
        
        switch(i){
            case 0:
                pig11 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 0.0 , 1.8, 270.0, 0.0, 0.0, objType, 10, mass * 0.7, 0.7 ));
                break;
            case 1:
                pig12 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 1.8 , 0.2, 270.0, 0.0, 0.0, objType, 11, mass * 0.7, 0.7 ));
                break;
            case 2:
                pig13 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 3.8 , 0.2, 270.0, 0.0, 0.0, objType, 12, mass * 0.4, 0.4 ));
                break;
             case 3:
                pig21 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 0.8 , 5.0, 270.0, 0.0, 0.0, objType, 34, mass * 0.75, 0.75 ));
                break;
            case 4:
                pig22 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 1.35 , 5.8, 270.0, 0.0, 0.0, objType, 35, mass * 0.4, 0.4 ));
                break;
            case 5:
                pig23 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 2.15 , 4.8, 270.0, 0.0, 0.0, objType, 36, mass * 0.4, 0.4 ));
                break;
            case 6:
                pig24 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 4.0 , 5.0, 270.0, 0.0, 0.0, objType, 37, mass * 0.6, 0.6 ));
                break;
            case 7:
                pig25 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 7 , 5.0, 270.0, 0.0, 0.0, objType, 38, mass * 1.0, 1.0 ));
                break;
            case 8:
                pig31 = pigChoiche;
                structureObjs.push(new structureObjects(0.0, 2.1 , 7.8, 270.0, 0.0, 0.0, objType, 60, mass * 0.6, 0.6 ));
                break;
                
        }
    }
}



async function defineStructureObjs(){
    mass = 3;
    tower112 = await utils.loadMesh("../assets/Others/tnt.obj");
    structureObjs.push(new structureObjects(0.0, 0.8,0.2, 0.4, 0.0, 0.0,  "tnt", 24, mass ));

    tower210 = await utils.loadMesh("../assets/Others/tnt.obj");
    structureObjs.push(new structureObjects(0.0, 3.2, 5.0 , 0.4, 0.0, 0.0,  "tnt", 48, mass ));

    tower31 = await utils.loadMesh("../assets/Others/tnt.obj");
    structureObjs.push(new structureObjects(0.0, 1.5 , 7.0, 0.0, 0.0, 0.0,  "tnt", 61, mass ));

    tower32 = await utils.loadMesh("../assets/Others/tnt.obj");
    structureObjs.push(new structureObjects(0.0, 1.5 , 7.8, 0.0, 0.0, 0.0,  "tnt", 62, mass ));
    
    tower33 = await utils.loadMesh("../assets/Others/tnt.obj");
    structureObjs.push(new structureObjects(0.0, 1.5 , 8.6, 0.0, 0.0, 0.0,  "tnt", 63, mass ));


    await randomizeCube();
    await randomizePyramid();
    await randomizeVerticalPlane();
    await randomizeHorizontalPlane();
}


//randomize type of horizontal pieces between glass and wood
async function randomizeHorizontalPlane(){
    for(let i=0; i<7; i++){
        let min = Math.ceil(1);
        let max = Math.floor(2);
        choiche = Math.floor(Math.random() * (max - min + 1)) + min;

        switch(choiche){
            case 1:
                piece = await utils.loadMesh("../assets/Others/glassHorizontalPlane.obj");
                objType = "glassHorizontalPlane";
                mass = 3;
                break;
            case 2:
                piece = await utils.loadMesh("../assets/Others/woodHorizontalPlane.obj");
                objType = "woodHorizontalPlane";
                mass = 5;
                break;
            default:
                piece = await utils.loadMesh("../assets/Others/glassHorizontalPlane.obj");
                objType = "glassHorizontalPlane";
                mass = 3;
                break;
        }

        switch(i){
            case 0:
                tower16 = piece;
                structureObjs.push(new structureObjects(0.0, 0.5 ,  1.8, 0.0, 0.0, 0.0, objType, 18, mass ));
                break;
            case 1:
                tower113 = piece;
                structureObjs.push(new structureObjects(0.0, 1.3 , 0.2, 0.0, 0.0, 0.0, objType, 25, mass ));
                break;
            case 2:
                tower116 = piece;
                structureObjs.push(new structureObjects(0.0, 2.3 , 0.2, 0.0, 0.0, 0.0, objType, 28, mass ));
                break;
            case 3:
                tower118 = piece;
                structureObjs.push(new structureObjects(0.0, 3.3 , 0.2, 0.0, 0.0, 0.0, objType, 30, mass ));
                break;
            case 4:
                tower212 = piece;
                structureObjs.push(new structureObjects(0.0, 3.7, 5.0, 0.0, 0.0, 0.0, objType, 50, mass ));
                break;
            case 5:
                tower220 = piece;
                structureObjs.push(new structureObjects(0.0, 6.3 , 5.0, 0.0, 0.0, 0.0, objType, 58, mass ));
                break;
            case 6:
                tower36 = piece;
                structureObjs.push(new structureObjects(0.0, 2.8 , 7.8, 0.0, 0.0, 0.0, objType, 66, mass ));
                break;
        }
        
    }
}


//randomize type of vertical pieces between glass or wood
async function randomizeVerticalPlane(){
    for(let i=0; i<10; i++){
        let min = Math.ceil(1);
        let max = Math.floor(2);
        choiche = Math.floor(Math.random() * (max - min + 1)) + min;

        switch(choiche){
            case 1:
                piece = await utils.loadMesh("../assets/Others/glassVerticalPlane.obj");
                objType = "glassVerticalPlane";
                mass = 3;
                break;
            case 2:
                piece = await utils.loadMesh("../assets/Others/woodVerticalPlane.obj");
                objType = "woodVerticalPlane";
                mass = 5;
                break;
            default:
                piece = await utils.loadMesh("../assets/Others/glassVerticalPlane.obj");
                objType = "glassVerticalPlane";
                mass = 3;
                break;
        }

        switch(i){
            case 0:
                tower14 = piece;
                structureObjs.push(new structureObjects(0.0, 0.0 , 1.05, 0.0, 0.0, 0.0, objType, 16, mass ));
                break;
            case 1:
                tower15 = piece;
                structureObjs.push(new structureObjects(0.0, 0.0 , 2.55, 0.0, 0.0, 0.0, objType, 17, mass ));
                break;
            case 2:
                tower110 = piece;
                structureObjs.push(new structureObjects(0.0, 0.8,-0.55, 0.0, 0.0, 0.0, objType, 22, mass ));
                break;
            case 3:
                tower111 = piece;
                structureObjs.push(new structureObjects(0.0, 0.8 ,0.95, 0.0, 0.0, 0.0, objType, 23, mass ));
                break;
            case 4:
                tower114 = piece;
                structureObjs.push(new structureObjects(0.0, 1.8,-0.55, 0.0, 0.0, 0.0, objType, 26, mass ));
                break;
            case 5:
                tower115 = piece;
                structureObjs.push(new structureObjects(0.0, 1.8 ,0.95, 0.0, 0.0, 0.0, objType, 27, mass ));
                break;
            case 6:
                tower24 = piece;
                structureObjs.push(new structureObjects(0.0, 1.6 , 5.45, 0.0, 0.0, 0.0, objType, 42, mass ));
                break;
            case 7:
                tower25 = piece;
                structureObjs.push(new structureObjects(0.0, 1.6 , 6.15, 0.0, 0.0, 0.0, objType, 43, mass ));
                break;
            case 8:
                tower26 = piece;
                structureObjs.push(new structureObjects(0.0, 2.4 , 5.45, 0.0, 0.0, 0.0, objType, 44, mass ));
                break;
            case 9:
                tower27 = piece;
                structureObjs.push(new structureObjects(0.0, 2.4 , 6.15, 0.0, 0.0, 0.0, objType, 45, mass ));
                break;

        }
    }
}


//randomize type of pyramid between stone, glass or wood
async function randomizePyramid(){
    for(let i=0; i<8; i++){
        let min = Math.ceil(1);
        let max = Math.floor(3);
        choiche = Math.floor(Math.random() * (max - min + 1)) + min;

        switch(choiche){
            case 1:
                piece = await utils.loadMesh("../assets/Others/glassPyramid.obj");
                objType = "glassPyramid";
                mass = 4;
                break;
            case 2:
                piece = await utils.loadMesh("../assets/Others/woodPyramid.obj");
                objType = "woodPyramid";
                mass = 6;
                break;
            case 3:
                piece = await utils.loadMesh("../assets/Others/stonePyramid.obj");
                objType = "stonePyramid";
                mass = 9;
                break;
            default:
                piece = await utils.loadMesh("../assets/Others/glassPyramid.obj");
                objType = "glassPyramid";
                mass = 4;
                break;
        }//same number as the possible different pieces


        switch(i){
            case 0:
                tower11 = piece;
                structureObjs.push(new structureObjects(0.0, 0.0 , -1.0, 0.0, 0.0, 0.0, objType, 13, mass ));
                break;
            case 1:
                tower19 = piece;
                structureObjs.push(new structureObjects(0.0, 2.6 ,  1.8, 0.0, 0.0, 0.0, objType, 21, mass ));
                break;
            case 2:
                tower120 = piece;
                structureObjs.push(new structureObjects(0.0, 4.6 , 0.2, 0.0, 0.0, 0.0, objType, 32, mass ));
                break;
            case 3:
                tower215 = piece;
                structureObjs.push(new structureObjects(0.0, 5.8 , 5.8, 0.0, 0.0, 0.0, objType, 53, mass ));
                break;
            case 4:
                tower217 = piece;
                structureObjs.push(new structureObjects(0.0, 5.8 , 4.2, 0.0, 0.0, 0.0, objType, 55, mass ));
                break;
            case 5:
                tower34 = piece;
                structureObjs.push(new structureObjects(0.0, 2.3 , 7.2, 0.0, 0.0, 0.0, objType, 64, mass ));
                break;
            case 6:
                tower35 = piece;
                structureObjs.push(new structureObjects(0.0, 2.3 , 8.6, 0.0, 0.0, 0.0, objType, 65, mass ));
                break;
            case 7:
                tower37 = piece;
                structureObjs.push(new structureObjects(0.0, 3.3 , 7.8, 0.0, 0.0, 0.0, objType, 67, mass ));
                break;
        }
        
    }
}


//randomize type of cube between ston, glass or wood
async function randomizeCube(){
    for(let i=0; i<17; i++){
        let min = Math.ceil(1);
        let max = Math.floor(4);
        choiche = Math.floor(Math.random() * (max - min + 1)) + min;

        switch(choiche){
            case 1:
                piece = await utils.loadMesh("../assets/Others/glassBox.obj");
                objType = "glassBox";
                mass = 5;
                break;
            case 2:
                piece = await utils.loadMesh("../assets/Others/woodBox.obj");
                objType = "woodBox";
                mass = 7;
                break;
            case 3:
                piece = await utils.loadMesh("../assets/Others/stoneBox.obj");
                objType = "stoneBox";
                mass = 10;
                break;
            case 4:
                piece = await utils.loadMesh("../assets/Others/stoneSquare.obj");
                objType = "stoneSquare";
                mass = 6;
                break;
            default:
                piece = await utils.loadMesh("../assets/Others/glassBox.obj");
                objType = "glassBox";
                mass = 5;
                break;
        }//same number as the possible different pieces


        switch(i){
            case 0:
                tower12 = piece;
                structureObjs.push(new structureObjects(0.0, 0.0 , -0.2, 0.0, 0.0, 0.0, objType, 14, mass ));
                break;
            case 1:
                tower13 = piece;
                structureObjs.push(new structureObjects(0.0, 0.0 ,  0.6, 0.0, 0.0, 0.0, objType, 15, mass ));
                break;
            case 2:
                tower17 = piece;
                structureObjs.push(new structureObjects(0.0, 1.0 ,  1.8, 0.0, 0.0, 0.0, objType, 19, mass ));
                break;
            case 3:
                tower18 = piece;
                structureObjs.push(new structureObjects(0.0, 1.8 ,  1.8, 0.0, 0.0, 0.0, objType, 20, mass ));
                break;
            case 4:
                tower117 = piece;
                structureObjs.push(new structureObjects(0.0, 2.8 , 0.2, 0.0, 0.0, 0.0, objType, 29, mass ));
                break;
            case 5:
                tower119 = await utils.loadMesh("../assets/Others/glassVerticalPlane.obj");
                let trial = await utils.loadMesh("../assets/Others/glassVerticalPlaneBroken2.obj");
                console.log("TOWER");
                console.log("vertex " + tower119.vertices);
                console.log("vertex length " + tower119.vertices.length);
                console.log("texture " + tower119.textures);
                console.log("vertex length " + tower119.textures.length);
                console.log("normals " + tower119.vertexNormals);
                console.log("vertex length " + tower119.vertexNormals.length);
                console.log("indices " + tower119.indices);
                console.log("vertex length " + tower119.indices.length);

                console.log("BROKEN PIECE");
                console.log("trial " + trial.vertices);
                console.log("vertex length " + trial.vertices.length);
                console.log("texture " + trial.textures);
                console.log("vertex length " + trial.textures.length);
                console.log("normals " + trial.vertexNormals);
                console.log("vertex length " + trial.vertexNormals.length);
                console.log("indices " + trial.indices);
               // tower119.textures =  GLASSBOX_BROKEN_1;
                structureObjs.push(new structureObjects(0.0, 3.8 , 0.2, 0.0, 0.0, 0.0, "glassBox", 31, mass ));
                break;
            case 6:
                tower21 = piece;
                structureObjs.push(new structureObjects(0.0, 0.8 , 4.2, 0.0, 0.0, 0.0, objType, 39, mass ));
                break;
            case 7:
                tower22 = piece;
                structureObjs.push(new structureObjects(0.0, 0.8 , 5.8, 0.0, 0.0, 0.0, objType, 40, mass ));
                break;
            case 8:
                tower23 = piece;
                structureObjs.push(new structureObjects(0.0, 1.6 , 4.6, 0.0, 0.0, 0.0, objType, 41, mass ));
                break;
            case 9:
                tower28 = piece;
                structureObjs.push(new structureObjects(0.0, 2.4 ,  4.2, 0.0, 0.0, 0.0, objType, 46, mass ));
                break;
            case 10:
                tower29 = piece;
                structureObjs.push(new structureObjects(0.0, 3.2 ,  4.2, 0.0, 0.0, 0.0, objType, 47, mass ));
                break;
            case 11:
                tower211 = piece;
                structureObjs.push(new structureObjects(0.0, 3.2 , 5.8, 0.0, 0.0, 0.0, objType, 49, mass ));
                break;
            case 12:
                tower213 = piece;
                structureObjs.push(new structureObjects(0.0, 4.2 , 5.8, 0.0, 0.0, 0.0, objType, 51, mass ));
                break;
            case 13:
                tower214 = piece;
                structureObjs.push(new structureObjects(0.0, 5.0 , 5.8, 0.0, 0.0, 0.0, objType, 52, mass ));
                break;
            case 14:
                tower216 = piece;
                structureObjs.push(new structureObjects(0.0, 5.8 , 5.0, 0.0, 0.0, 0.0, objType, 54, mass ));
                break;
            case 15:
                tower218 = piece;
                structureObjs.push(new structureObjects(0.0, 5.0 , 4.2, 0.0, 0.0, 0.0, objType, 56, mass ));
                break;
            case 16:
                tower219 = piece;
                structureObjs.push(new structureObjects(0.0, 4.2 , 4.2, 0.0, 0.0, 0.0, objType, 57, mass ));
                break;

        }        
    }
}
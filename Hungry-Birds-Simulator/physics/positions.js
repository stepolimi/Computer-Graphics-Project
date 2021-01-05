//world: z:-8 --> z: +8
//world: x:-4 --> x: +4
var envMatrix = utils.MakeWorld(0.0, -5.0 , 0.0, 0.0, 0.0, 0.0, 4.5);
var slingMatrix = utils.MakeWorld(0, -0.45 , -7.0, 0.0, 0.0, 0.0, 0.15);
var bird1 = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
var bird2 = utils.MakeWorld(-0.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);
var bird3 = utils.MakeWorld(-1.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);	
var bird4 = utils.MakeWorld(-2.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);	
var bird5 = utils.MakeWorld(-3.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);	
var pig1 = utils.MakeWorld(0.0, 0.0 , 2.0, 270.0, 0.0, 0.0, 1);
var	pig2 = utils.MakeWorld(0.0, 0.0 , 4.0, 270.0, 0.0, 0.0, 1);
var pig3 = utils.MakeWorld(0.0, 1.6 , 3.0, 270.0, 0.0, 0.0, 1);
var tower11 = utils.MakeWorld(0.0, 0.0 , 1.0, 0.0, 0.0, 0.0, 0.2);
var tower12 = utils.MakeWorld(0.0, 0.8 , 1.0, 0.0, 0.0, 0.0, 0.2);
var tower13 = utils.MakeWorld(0.0, 1.6 , 1.0, 0.0, 0.0, 0.0, 0.2);
var tower14 = utils.MakeWorld(0.0, 2.4 , 1.0, 0.0, 0.0, 0.0, 0.2);
var tower21 = utils.MakeWorld(0.0, 0.0 , 3.0, 0.0, 0.0, 0.0, 0.2);
var tower22 = utils.MakeWorld(0.0, 0.8 , 3.0, 0.0, 0.0, 0.0, 0.2);
var tower31 = utils.MakeWorld(0.0, 0.0 , 5.0, 0.0, 0.0, 0.0, 0.2);
var tower32 = utils.MakeWorld(0.0, 0.8 , 5.0, 0.0, 0.0, 0.0, 0.2);
var slingElasticMatrix = utils.MakeWorld(0, 1.0 , -7.0, 0.0, 0.0, 0.0, 1.0);


var worldPositions = [
	envMatrix,  //0
	slingMatrix,	//1
	bird1,			//2
	bird2,
	bird3,
	bird4,
	bird5,
	pig1,
	pig2,
	pig3,
	tower11,
	tower12,
	tower13,
	tower14,
	tower21,
	tower22,
	tower31,
	tower32,
	slingElasticMatrix
];


function waitingBirdsAnimation(){
	birdY += 0.01;
    worldPositions[3] = utils.MakeWorld(-0.5,  0.1 + Math.sin(birdY*2.0)/10 , -7.5, 0.0, 0.0, 0.0, 0.5); 
	worldPositions[4] = utils.MakeWorld(-1.5,  0.1 + Math.sin(birdY*4.0)/10 , -7.5, 0.0, 0.0, 0.0, 0.5); 
	worldPositions[5] = utils.MakeWorld(-2.5,  0.1 + Math.sin(birdY*3.5)/10 , -7.5, 0.0, 0.0, 0.0, 0.5);  
	worldPositions[6] = utils.MakeWorld(-3.5,  0.1 + Math.sin(birdY*5.0)/10 , -7.5, 0.0, 0.0, 0.0, 0.5);  
}
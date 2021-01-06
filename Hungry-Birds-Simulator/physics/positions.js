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
var slingElasticMatrix = utils.MakeWorld(0, 1.0 , -7.0, 0.0, 0.0, 0.0, 0.1);


var worldPositions = [
	envMatrix,				//0
	slingMatrix,			//1
	bird1,					//2
	bird2,					//3
	bird3,					//4
	bird4,					//5
	bird5,					//6
	pig1,					//7
	pig2,					//8
	pig3,					//9
	tower11,				//10
	tower12,				//11
	tower13,				//12
	tower14,				//13
	tower21,				//14
	tower22,				//15
	tower31,				//16
	tower32,				//17
	slingElasticMatrix		//18
];


function waitingBirdsAnimation(){
	birdY += BIRD_Y;       
	switch(counter){
		case 0:
			worldPositions[3] = utils.MakeWorld(-0.5,  0.1 + Math.sin(birdY*8.0)/10 , -7.5, 0.0, 0.0, 0.0, 0.5); 
			worldPositions[4] = utils.MakeWorld(-1.5,  0.1 + Math.sin(birdY*4.0)/10 , -7.5, 0.0, 0.0, 0.0, 0.5); 
			worldPositions[5] = utils.MakeWorld(-2.5,  0.1 + Math.sin(birdY*3.5)/10 , -7.5, 0.0, 0.0, 0.0, 0.5);  
			worldPositions[6] = utils.MakeWorld(-3.5,  0.1 + Math.sin(birdY*5.0)/10 , -7.5, 0.0, 0.0, 0.0, 0.5);  
			break;
		case 1:
			worldPositions[2] = utils.MakeWorld(0.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[3] = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[4] = utils.MakeWorld(-0.5, 0.1 + Math.sin(birdY*8.0)/10 , -7.5, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[5] = utils.MakeWorld(-1.5, 0.1 + Math.sin(birdY*4.0)/10  , -7.5, 0.0, 0.0, 0.0, 0.5);	
		    worldPositions[6] = utils.MakeWorld(-2.5, 0.1 + Math.sin(birdY*3.5)/10  , -7.5, 0.0, 0.0, 0.0, 0.5);	
			break;
		case 2:
			worldPositions[3] = utils.MakeWorld(1.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[4] = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[5] = utils.MakeWorld(-0.5, 0.1 + Math.sin(birdY*8.0)/10 , -7.5, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[6] = utils.MakeWorld(-1.5, 0.1 + Math.sin(birdY*4.0)/10  , -7.5, 0.0, 0.0, 0.0, 0.5);	
			break;
		case 3:
			worldPositions[4] = utils.MakeWorld(2.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[5] = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[6] = utils.MakeWorld(-0.5, 0.1 + Math.sin(birdY*8.0)/10 , -7.5, 0.0, 0.0, 0.0, 0.5);
			break;
		case 4:
			worldPositions[5] = utils.MakeWorld(3.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[6] = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
			break;
		case 5:
			worldPositions[6] = utils.MakeWorld(4.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 0.5);
			break;
		default:
		    break;
	}
}

function scaleSlingElasticZ(){
	if(elasticScalingZ*5.5 < 0.7)
		elasticScalingZ += SLING_ELASTIC_Z_SCALING_SPEED;
	if(isRotating){
		if(mouseY <= canvas.height/2)
			elasticRotationY += SLING_ELASTIC_Y_SPEED;
		else
			elasticRotationY -= SLING_ELASTIC_Y_SPEED;

		worldPositions[18] = utils.MakeWorldScaled(0, 1.0 + elasticRotationY , -7.0 , 0.0, 0.0, 0.0, 0.1, 0.1, 0.1+ elasticScalingZ);
	}
	else
		worldPositions[18] = utils.MakeWorldScaled(0, 1.0 , -7.0, 0.0, 0.0, 0.0, 0.1, 0.1, 0.1+ elasticScalingZ);
	if (counter < 5)
		worldPositions[2 + counter] = utils.MakeWorld(0.0, 1.1 + elasticRotationY , -7.2 - elasticScalingZ*5.5, 0.0, 90.0, 0.0, 0.5);
	
}
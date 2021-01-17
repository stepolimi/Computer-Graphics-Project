//world: z:-8 --> z: +8
//world: x:-4 --> x: +4
var elasticForce;
var birdStartingY;
var birdStartingZ;
var angleY;


var envMatrix = utils.MakeWorld(0.0, -5.0 , 0.0, 0.0, 0.0, 0.0, 4.5);
var slingMatrix = utils.MakeWorld(0, -0.45 , -7.0, 0.0, 0.0, 0.0, 0.15);
var bird1Matrix = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
var bird2Matrix = utils.MakeWorld(-0.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);
var bird3Matrix = utils.MakeWorld(-1.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);	
var bird4Matrix = utils.MakeWorld(-2.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);	
var bird5Matrix = utils.MakeWorld(-3.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);	
var slingElasticMatrix = utils.MakeWorld(0, 1.0 , -7.0, 0.0, 0.0, 0.0, 0.1);
var eggMatrix = utils.MakeWorld(0.0, -5.0 , 0.0, 0.0, 0.0, 0.0, 0.5);
var plumeExplosionMatrix = utils.MakeWorld(0.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0);


//Tower 1 pigs
var pig11Matrix = utils.MakeWorld(0.0, 0.0 , 6.0, 270.0, 0.0, 0.0, 0.4);		//pig1 of tower 1
var	pig12Matrix = utils.MakeWorld(0.0, 1.8 , 6.0, 270.0, 0.0, 0.0, 0.4);		//pig2 of tower 1
var pig13Matrix = utils.MakeWorld(0.0, 3.8 , 2.0, 270.0, 0.0, 0.0, 0.4);		//pig3 of tower 1

//Tower 1 pieces
var tower11Matrix = utils.MakeWorld(0.0, 0.0 , -1.0, 0.0, 0.0, 0.0, 0.2);		//pyramid
var tower12Matrix = utils.MakeWorld(0.0, 0.0 ,  1.0, 0.0, 0.0, 0.0, 0.2);		//cube
var tower13Matrix = utils.MakeWorld(0.0, 0.0 ,  3.0, 0.0, 0.0, 0.0, 0.2);		//cube
var tower14Matrix = utils.MakeWorld(0.0, 0.0 ,  4.5, 0.0, 0.0, 0.0, 0.2);		//vertical plane
var tower15Matrix = utils.MakeWorld(0.0, 0.0 ,  7.5, 0.0, 0.0, 0.0, 0.2);		//vertical plane
var tower16Matrix = utils.MakeWorld(0.0, 0.5 ,  6.0, 0.0, 0.0, 0.0, 0.2);		//horizontal plane
var tower17Matrix = utils.MakeWorld(0.0, 1.0 ,  6.0, 0.0, 0.0, 0.0, 0.2);		//cube
var tower18Matrix = utils.MakeWorld(0.0, 1.8 ,  6.0, 0.0, 0.0, 0.0, 0.2);		//cube
var tower19Matrix = utils.MakeWorld(0.0, 2.6 ,  6.0, 0.0, 0.0, 0.0, 0.2);		//pyramid
var tower110Matrix = utils.MakeWorld(0.0, 0.8 , 1.0, 0.0, 0.0, 0.0, 0.2);		//vertical plane
var tower111Matrix = utils.MakeWorld(0.0, 0.8 , 3.0, 0.0, 0.0, 0.0, 0.2);		//vertical plane
var tower112Matrix = utils.MakeWorld(0.0, 0.7 , 2.0, 0.0, 0.0, 0.0, 0.18);		//tnt
var tower113Matrix = utils.MakeWorld(0.0, 2.3 , 2.0, 0.0, 0.0, 0.0, 0.2);		//horizontal plane
var tower114Matrix = utils.MakeWorld(0.0, 2.8 , 1.0, 0.0, 0.0, 0.0, 0.2);		//vertical plane
var tower115Matrix = utils.MakeWorld(0.0, 2.8 , 3.0, 0.0, 0.0, 0.0, 0.2);		//vertical plane
var tower116Matrix = utils.MakeWorld(0.0, 3.3 , 2.0, 0.0, 0.0, 0.0, 0.2);		//horizontal plane
var tower117Matrix = utils.MakeWorld(0.0, 3.8 , 2.0, 0.0, 0.0, 0.0, 0.2);		//cube
var tower118Matrix = utils.MakeWorld(0.0, 4.3 , 4.0, 0.0, 0.0, 0.0, 0.2);		//horizontal plane
var tower119Matrix = utils.MakeWorld(0.0, 4.8 , 4.0, 0.0, 0.0, 0.0, 0.2);		//cube
var tower120Matrix = utils.MakeWorld(0.0, 5.6 , 4.0, 0.0, 0.0, 0.0, 0.2);		//pyramid


//var tower21Matrix = utils.MakeWorld(0.0, 0.0 , 3.0, 0.0, 0.0, 0.0, 0.2);
//var tower22Matrix = utils.MakeWorld(0.0, 0.8 , 3.0, 0.0, 0.0, 0.0, 0.2);
//var tower31Matrix = utils.MakeWorld(0.0, 0.0 , 5.0, 0.0, 0.0, 0.0, 0.2);
//var tower32Matrix = utils.MakeWorld(0.0, 0.8 , 5.0, 0.0, 0.0, 0.0, 0.2);


//birds rotation
var lastUpdateTime = (new Date).getTime();


var worldPositions = [
	envMatrix,					//0
	slingMatrix,				//1
	bird1Matrix,				//2
	bird2Matrix,				//3
	bird3Matrix,				//4
	bird4Matrix,				//5
	bird5Matrix,				//6
	slingElasticMatrix,			//7
	eggMatrix,					//8
	plumeExplosionMatrix,		//9
	pig11Matrix,				//10
	pig12Matrix,				//11
	pig13Matrix,				//12
	tower11Matrix,				//13
	tower12Matrix,				//14
	tower13Matrix,				//15
	tower14Matrix,				//16
	tower15Matrix,				//17
	tower16Matrix,				//18
	tower17Matrix,				//19
	tower18Matrix,				//20
	tower19Matrix,				//21
	tower110Matrix,				//22
	tower111Matrix,				//23
	tower112Matrix,				//24
	tower113Matrix,				//25
	tower114Matrix,				//26
	tower115Matrix,				//27
	tower116Matrix,				//28
	tower117Matrix,				//29
	tower118Matrix,				//30
	tower119Matrix,				//31
	tower120Matrix				//32
];


function waitingBirdsAnimation(){
	birdY += BIRD_Y; 
	var currentTime = (new Date).getTime();
	var roundZ = 0.0;
    if(lastUpdateTime - currentTime >= 1700 &&  lastUpdateTime - currentTime <= 2100)
		roundZ = 75.0;
	else
		roundZ = 0.0;

	switch(counter){
		case 0:
			worldPositions[3] = utils.MakeWorld(-0.5,  0.1 + Math.sin(birdY*8.0)/10 , -7.5, 0.0, 0.0, roundZ, 0.5); 
			worldPositions[4] = utils.MakeWorld(-1.5,  0.1 + Math.sin(birdY*4.0)/10 , -7.5, 0.0, 0.0, roundZ, 0.5); 
			worldPositions[5] = utils.MakeWorld(-2.5,  0.1 + Math.sin(birdY*3.5)/10 , -7.5, 0.0, 0.0, roundZ, 0.5);  
			worldPositions[6] = utils.MakeWorld(-3.5,  0.1 + Math.sin(birdY*5.0)/10 , -7.5, 0.0, 0.0, roundZ, 0.5);  
			break;
		case 1:
			birdTrajectory(2);
			setTimeout(function(){},1000);
		    worldPositions[3] = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[4] = utils.MakeWorld(-0.5, 0.1 + Math.sin(birdY*8.0)/10 , -7.5, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[5] = utils.MakeWorld(-1.5, 0.1 + Math.sin(birdY*4.0)/10  , -7.5, 0.0, 0.0, 0.0, 0.5);	
		    worldPositions[6] = utils.MakeWorld(-2.5, 0.1 + Math.sin(birdY*3.5)/10  , -7.5, 0.0, 0.0, 0.0, 0.5);	
			break;
		case 2:
			birdTrajectory(3);
			setTimeout(function(){},1000);
		    worldPositions[4] = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[5] = utils.MakeWorld(-0.5, 0.1 + Math.sin(birdY*8.0)/10 , -7.5, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[6] = utils.MakeWorld(-1.5, 0.1 + Math.sin(birdY*4.0)/10  , -7.5, 0.0, 0.0, 0.0, 0.5);	
			break;
		case 3:
			birdTrajectory(4);
			setTimeout(function(){},1000);
		    worldPositions[5] = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[6] = utils.MakeWorld(-0.5, 0.1 + Math.sin(birdY*8.0)/10 , -7.5, 0.0, 0.0, 0.0, 0.5);
			break;
		case 4:
			birdTrajectory(5);
			setTimeout(function(){},1000);
		    worldPositions[6] = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
			break;
		case 5:
			birdTrajectory(6);
			break;
		default:
		    break;
	}
}


function scaleSlingElasticZ(){

	var normlizedY;
	angleY = 0.0;
	var midValue = canvas.height / 2;
	
	elasticForce = elasticScalingZ*5.5;
	console.log("elasticForce " + elasticForce);
	if(elasticForce < 0.7 && !isReleased)     
		elasticScalingZ += SLING_ELASTIC_Z_SCALING_SPEED;	

	if(isRotating){
		if(mouseY <= midValue){
			normalizedY = mouseY / midValue;
			angleY = 90.0 - (normalizedY*90.0);
		}
		else{
			normalizedY = (mouseY - midValue) / (canvas.height - midValue);
			angleY = -(normalizedY*90.0);
		}
		worldPositions[10] = utils.MakeWorldScaled(0.0, 1.0 , -7.0 , 0.0, angleY , 0.0, 0.1, 0.1, 0.1+ elasticScalingZ);
	}
	else
		worldPositions[10] = utils.MakeWorldScaled(0.0, 1.0 , -7.0, 0.0, 0.0, 0.0, 0.1, 0.1, 0.1+ elasticScalingZ);

	if (counter < 5)
		moveBirdWithSling();
	
}

function moveBirdWithSling(){
	var variation = 7.2 + elasticForce;

	var cos = Math.cos(utils.degToRad(angleY));
	var sin = Math.sin(utils.degToRad(angleY));
	birdStartingY = (1.95 - 1.1)*sin + 1.1;
	birdStartingZ = (variation - 7.0)*cos + 7.0;
	worldPositions[2 + counter] = utils.MakeWorld(0.0 , birdStartingY, -birdStartingZ , 0.0,  angleY, 0.0, 0.5);

}
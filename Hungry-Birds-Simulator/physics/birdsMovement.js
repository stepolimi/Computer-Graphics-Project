// JavaScript source code
var t = 0;
var prec = 0;
var busy = false;

var angle;
var g = GRAVITY;
var v = 0; 

var trajectoryY;
var trajectoryZ;

//matilda
var isMatildaActiveFirstTime = true;
var matildaY = 0;
var matildaZ = 0;
var eggY = 0;
var eggZ = 0;


function birdTrajectory(index){
	if(index != prec){
		t = 0;
		prec = index;
	}

	v = BIRD_SPEED * elasticForce; 

	if(angleY > 0)
		angle = -90 + angleY;
	else
		angle = Math.abs(angleY);

	console.log("angle " + angle);


	trajectoryY = birdStartingY + v*t*Math.sin(utils.degToRad(angle)) - (g*t*t /2);
	trajectoryZ = -birdStartingZ + v*t*Math.cos(utils.degToRad(angle));
	
	if(activateBirdPower)
		activatePower(index);

	if(trajectoryY >= -5.0)
		worldPositions[index] = utils.MakeWorld(0.0 , trajectoryY, trajectoryZ, 0.0,  angleY, 0.0, 0.5);
	else
		busy = false;
	t += 0.1;
}



/*If the user has pressed the spacebar the specific bird power will be activate throw this function:
	1. red doesn't have any power so nothing will change in its trajectory
	2. bomb
	3. chuck
	4. matilda will change its trajectory throw the angle change and will eject an egg with a linear trajectory
	   The egg trajectory will have: 
		a) z = starting matilda z
		b) y = the speed variation over this axis
*/
function activatePower(index){
	var bird = birdsArray[index-2];
	console.log("bird" + bird);
	switch(bird){
		case "red":
		case "bomb":
		default:
			break;

		case "chuck":
			v = CHUCK_SPEED * elasticForce;  
			trajectoryY = birdStartingY + v*t*Math.sin(utils.degToRad(angle)) - (g*t*t /2);
			trajectoryZ = -birdStartingZ + v*t*Math.cos(utils.degToRad(angle));
			if(trajectoryY >= -5.0)
				activateBirdPower = false;
			break;

		case "matilda":
			activateMatildaPower();
			break;
	}
}


function activateMatildaPower(){
	//at first round the new starting coord must be set
	if (isMatildaActiveFirstTime){
		isMatildaActiveFirstTime = false;
		matildaZ = trajectoryZ;
		matildaY = trajectoryY;
		eggT = 0;
		console.log("matildeZ " + matildaZ);
		console.log("matildeY " + matildaY);
	}
	eggZ = matildaZ;
	eggY = matildaY - (0.1*t*t /2);
	eggT += 0.1;
	
	if(eggY >= -5.0)
		worldPositions[19] = utils.MakeWorld(0.0, eggY, eggZ, 0.0, 0.0, 0.0, 0.5);
	else{
		eggT = 0;
		isMatildaActiveFirstTime = true;
		activateBirdPower = false;
	}
	
	angle = angle + 30;
	
	trajectoryY = matildaY + v*t*Math.sin(utils.degToRad(angle)) - (g*t*t /2);
	trajectoryZ = matildaZ + v*t*Math.cos(utils.degToRad(angle));
}
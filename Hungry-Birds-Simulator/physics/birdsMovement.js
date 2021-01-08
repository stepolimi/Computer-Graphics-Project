// JavaScript source code
var t = 0;
var prec = 0;
var busy = false;

var angle;
var g = GRAVITY;
var v = BIRD_SPEED * elasticForce; 

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

	if(angleY > 0)
		angle = -90 + angleY;
	else
		angle = Math.abs(angleY);


	trajectoryY = birdStartingY + v*t*Math.sin(utils.degToRad(angle)) - (g*t*t /2);
	trajectoryZ = -birdStartingZ + v*t*Math.cos(utils.degToRad(angle));
	
	if(activateBirdPower)
		activatePower(index);

	if(trajectoryY >= 0.0)
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
			v  = 0.8 * variation;
			break;
		case "matilda":
			if (isMatildaActiveFirstTime){
				isMatildaActiveFirstTime = false;
				matildaZ = trajectoryZ;
				matildaY = trajectoryY;
				eggT = 0;
				console.log("matildeZ " + matildaZ);
				console.log("matildeY " + matildaY);
			}
			eggZ = matildaZ;
			eggY = matildaY - (g*t*t /2);
			eggT += 0.1;
			
			if(eggY >= 0)
				worldPositions[19] = utils.MakeWorld(0.0, eggY, eggZ, 0.0, 0.0, 0.0, 0.5);
			else{
				eggT = 0;
				//isMatildaActiveFirstTime = true;
			}
			
			angle = angle + 40;
			
			trajectoryY = matildaY + SPEED*t*Math.sin(utils.degToRad(angle)) - (g*t*t /2);
			trajectoryZ = matildaZ + SPEED*t*Math.cos(utils.degToRad(angle));

			break;
	}
}
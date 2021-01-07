// JavaScript source code
var t = 0;
var v;
var g;
var angle;
var trajectoryY;
var trajectoryZ;


function birdTrajectory(index){

	if(angleY > 0)
		angle = -90 + angleY;
	else
		angle = Math.abs(angleY);


	v = BIRD_SPEED * variation;
	g = 0.8;	

	if(activateBirdPower){
		var bird = birdsArray[index-2];
		switch(bird){
			case "red":
			case "bomb":
				break;
			case "chuck":
				v  = 0.8 * variation;
				break;
			case "matilde":
				break;
		}
	}


	trajectoryY = birdStartingY + v*t*Math.sin(utils.degToRad(angle)) - (g*t*t /2);
	trajectoryZ = -birdStartingZ + v*t*Math.cos(utils.degToRad(angle));

	console.log("angle" + angle);
	console.log("y " + y);
	console.log("z " + z);
	console.log("t "+ t);
	console.log("------------------------");

	if(y >= 0.0)
		worldPositions[index] = utils.MakeWorld(0.0 , trajectoryY, trajectoryZ, 0.0,  angleY, 0.0, 0.5);
	t += 0.1;
}


function activatePower(index){
	var bird = birdsArray[index-2];
	switch(bird){
		case "red":
			break;
		case "chuck":
			BIRD_SPEED  = 0.8;
			break;
	}
}
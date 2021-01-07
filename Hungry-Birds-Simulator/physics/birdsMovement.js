// JavaScript source code
var t = 0;

function birdTrajectory(index){
	var angle;
	if(angleY > 0)
		angle = -90 + angleY;
	else
		angle = Math.abs(angleY);

	var v = BIRD_SPEED * variation;
	var g = 0.8;	


	var y = birdStartingY + v*t*Math.sin(utils.degToRad(angle)) - (g*t*t /2);
	var z = -birdStartingZ + v*t*Math.cos(utils.degToRad(angle));

	console.log("angle" + angle);
	console.log("y " + y);
	console.log("z " + z);
	console.log("t "+ t);
	console.log("------------------------");

	if(y >= 0.0){

		worldPositions[index] = utils.MakeWorld(0.0 , y, z , 0.0,  angleY, 0.0, 0.5);
	}
	t += 0.1;
	

	if(activateBirdPower)
		activatePower(index);
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
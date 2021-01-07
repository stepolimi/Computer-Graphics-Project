// JavaScript source code
var t = 0.0001;

function birdTrajectory(index){
	var angle = Math.abs(angleY);
	var v = BIRD_SPEED * variation;
	var g = -0.8;	

	//get the time
    var currentTime = (new Date).getTime();


	var y = v*t*Math.sin(utils.degToRad(angle)) - (g*t*t /2);
	var z = v*t*Math.cos(utils.degToRad(angle));

	console.log("angle" + angleY);
	console.log("y " + y);
	console.log("z " + z);
	console.log("t "+ t);
	console.log("------------------------");

	worldPositions[index] = utils.MakeWorld(0.0 , y, z , 0.0,  angleY, 0.0, 0.5);
	t += 0.0001;
	//birdTrajectory(index);
}
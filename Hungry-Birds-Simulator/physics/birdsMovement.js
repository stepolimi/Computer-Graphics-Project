// JavaScript source code


function birdTrajectory(index){
	var angle = Math.abs(angleY);
	var v = BIRD_SPEED * variation;
	var g = -9.2;	

	//get the time
    var currentTime = (new Date).getTime();
    if(lastUpdateTime)
      var t = (30 * (currentTime - lastUpdateTime)) / 1000.0;



	var y = v*t*Math.sin(angle) - (g*Math.sqrt(t) /2);
	var z = v*t*Math.cos(angle);

	worldPositions[index] = utils.MakeWorld(0.0 , y, -z , 0.0,  angleY, 0.0, 0.5);
	
    lastUpdateTime = currentTime;  
	if(y > 0.0)
		birdTrajectory(index);
}
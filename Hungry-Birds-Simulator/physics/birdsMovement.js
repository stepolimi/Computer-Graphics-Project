// JavaScript source code
var t = 0;
var prec = 0;
var busy = false;

var angle;
var rotation = 0.0;
var g = GRAVITY;
var v = 0; 
var vx = 0;
var vy = 0;

var trajectoryY;
var trajectoryZ;

//sound
var firstTimeSound = true;

//matilda
var isMatildaActiveFirstTime = true;
var matildaY = 0;
var matildaZ = 0;
var eggY = 0;
var eggZ = 0;

//chuck
var isChuckActiveFirstTime = true;
var chuckY = 0;
var chuckZ = 0;
var m = 0;
var q = 0;


//bomb
var scaling = 0.5;
var isBombActiveFirstTime = true;
var bombZ = 0;
var bombY = 0;


//
var birdCollides = false;
var birdPosition;

function birdTrajectory(index){
	activateSound(index);
	if(index != prec){
		t = 0;
		prec = index;
		v = BIRD_SPEED * elasticForce;
	}

	if(angleY > 0)
		angle = -90 + angleY;
	else
		angle = Math.abs(angleY);
	
	vy = v*t*Math.sin(utils.degToRad(angle));
	vz = v*t*Math.cos(utils.degToRad(angle));

	trajectoryY = birdStartingY + vy - (g*t*t /2);
	trajectoryZ = -birdStartingZ + vz;
	
	if(activateBirdPower)
		activatePower(index);

	if(trajectoryY >= -5.0 && trajectoryY <= 20.00 && !birdCollides){
		birdsArray[index-2].ty = trajectoryY;
		birdsArray[index-2].tz = trajectoryZ;
		birdsArray[index-2].ry = angle;
		birdsArray[index-2].rz = rotation;
		worldPositions[index] = utils.MakeWorld(0.0 , trajectoryY, trajectoryZ, 0.0,  angle, rotation, scaling);
		isColliding(birdsArray[index-2]);
	}
	else{
		//if vx ==0
		rotation = 0.0;
		scaling = 0.5;
		busy = false;

		if(counter == 5)
			window.location.replace("./endGame.html");
	}
	t += TICK;
}


function isColliding(bird){
	let radiusY;
	let radiusZ;
	let useless;
	for(let i = 0; i < structureObjs.length; i++ ){
		let objY = structureObjs[i].ty;
		let objZ = structureObjs[i].tz;
		radiusY = structureObjs[i].rady;
		radiusZ = structureObjs[i].radz;

		if(objY > trajectoryY + BIRD_RADIUS || trajectoryY > objY + radiusY || objZ > trajectoryZ + BIRD_RADIUS || trajectoryZ > objZ + radiusZ )
			useless = 0;
		else{
			birdCollides = true;
			birdCollision(bird, structureObjs[i]);
			console.log("objY " + objY);
			console.log("objZ " + objZ);
			console.log("trajectoryY " + trajectoryY);
			console.log("trajectoryZ " + trajectoryZ);

		}
	}	
}

function birdCollision(obj){
	let elasticCoefficient = 0.5;
	let birdVzFinal = vz * elasticCoefficient;
	let birdVyFinal = vy * elasticCoefficient;

	obj.vz = (bird.m * vz + obj.m * obj.vz - bird.m * birdVzFinal) / obj.m;
	obj.vy = (bird.m * vy + obj.m * obj.vy - bird.m * birdVyFinal) / obj.m;

	vz = birdVzFinal;
	vy = birdVyFinal;

	startMovement(obj);
}

function activateSound(index){
	var sound = document.getElementById( birdsArray[index-2].type);
	if(firstTimeSound){
		firstTimeSound = false;
		sound.play();
	}
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
	var bird = birdsArray[index-2].type;
	switch(bird){
		case "red":
		default:
			break;
		
		case "bomb":
			activateBombPower();
			break;

		case "chuck":
			activateChuckPower();
			break;

		case "matilda":
			activateMatildaPower();
			break;
	}
}

function activateBombPower(){
	scaling = 0.0;
	if(isBombActiveFirstTime){
		isBombActiveFirstTime = false;
		bombZ = trajectoryZ;
		bombY = trajectoryY;
		explosionScaling = 0.0;
	
	}
	
	explosionScaling += 0.02;
	if(explosionScaling <= 1.0)
		worldPositions[9] = utils.MakeWorld(0.0, bombY, bombZ, 0.0, 0.0, 0.0, explosionScaling);
	else{
		explosionScaling = 0.0;
		isBombActiveFirstTime = true;
		activateBirdPower = false;
		setTimeout(function(){worldPositions[9] = utils.MakeWorld(0.0, bombY, bombZ, 0.0, 0.0, 0.0, explosionScaling)}, 1000);
	}
}

function activateChuckPower(){
	if (isChuckActiveFirstTime){
		isChuckActiveFirstTime = false;
		chuckZ = trajectoryZ;
		chuckY = trajectoryY;
		t = 0;	
		
		var angleInRad = utils.degToRad(angle);
		var cos = Math.cos(angleInRad);
		var sin = Math.sin(angleInRad);
		var tan = Math.sin(angleInRad) / Math.cos(angleInRad);
		var cosSquared = Math.pow(cos,2);
		
		var parabolicA = - (g)/(2*v*v*cosSquared) ;
		var parabolicB = (g*chuckZ)/(v*v*cosSquared) + tan ;
		var parabolicC = (g*chuckZ*chuckZ) / (2*v*v*cosSquared) - tan*chuckZ; 

		var mB = 2*parabolicB + 4*parabolicA*chuckZ;
		var mC = parabolicB*parabolicB - 4*parabolicA*parabolicC;
		//value mA = 1 so useless

		if(mB*mB - 4*mC < 0)
			m = - mB*0.5;
		else
			m = (- mB - Math.sqrt(mB*mB - 4*mC)) / 2;
		q = chuckZ + chuckY;
	}
	
	console.log("q: " + q);
	
	trajectoryZ = chuckZ + t*v*v;
	trajectoryY = m*trajectoryZ + t*v*v + q;

	console.log("Z: " + trajectoryZ);
	console.log("Y: " + trajectoryY);
	console.log("-----------------------");
	if(trajectoryY >= 20.0 | trajectoryY <= 0.0){
		isChuckActiveFirstTime = true;
		activateBirdPower = false;
	}
}


function activateMatildaPower(){
	//at first round the new starting coord must be set
	if (isMatildaActiveFirstTime){
		isMatildaActiveFirstTime = false;
		matildaZ = trajectoryZ;
		matildaY = trajectoryY;
		eggT = 0;
		t = 0;
	}
	eggZ = matildaZ;
	eggY = matildaY - (0.3*t*t /2);
	eggT += 0.1;
	
	if(eggY >= -5.0)
		worldPositions[8] = utils.MakeWorld(0.0, eggY, eggZ, 0.0, 0.0, 0.0, 0.5);
	else{
		eggT = 0;
		isMatildaActiveFirstTime = true;
		activateBirdPower = false;
	}
	
	v = v*1.2;
	var tan = Math.sin(utils.degToRad(angle)) / Math.cos(utils.degToRad(angle));
	trajectoryY = matildaY + v*t*tan;
	trajectoryZ = matildaZ + v*t*tan;
	rotation += 20.0;
	  
}

//functions to manage objects collisions

function collides(objMoving){
	let useless;
	structureObjs.forEach(function(obj) {
		if(obj.ty > objMoving.ty + objMoving.rady || objMoving.vy > obj.ty + obj.rady || obj.tz > objMoving.tz + objMoving.radz || objMoving.tz > obj.tz + obj.radz )
			useless = 0;
		else{
			let elasticCoefficient = 0.4;
			let thisVzFinal = objMoving.vz * elasticCoefficient;
			let thisVyFinal = objMoving.vy * elasticCoefficient;
		
			obj.vz = (objMoving.m * objMoving.vz + obj.m * obj.vz - objMoving.m * thisVzFinal) / obj.m;
			obj.vy = (objMoving.m * objMoving.vy + obj.m * obj.vy - objMoving.m * thisVyFinal) / obj.m;
		
			objMoving.vz = thisVzFinal;
			objMoving.vy = thisVyFinal;
			startMovement(obj);
		}
	});
}

function startMovement(obj){
	while(obj.vx >= 0.001 || obj.vy >= 0.001){
		obj.vy = obj.vy - (g*TICK*TICK /2);
		obj.ty = obj.ty + obj.vy * TICK;
		obj.tz = obj.vz * TICK;
		worldPositions[obj.index] = utils.MakeWorld(obj.tx , obj.ty, obj.tz, obj.rx, obj.ry, obj.rz, obj.scale);
		collides(obj);
	}
	obj.vx = 0;
	obj.vy = 0;
}
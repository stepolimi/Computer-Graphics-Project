// JavaScript source code
var t = 0;
var prec = 0;
var busy = false;

var angle;
var rotation = 0.0;
var g = GRAVITY;
var v = 0; 
var vely = 0;
var velz = 0;

var trajectoryY;
var trajectoryZ;

var collisionY;
var collisionZ;
var collisionT = 0;

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
	
	//second check this thing
	if(!birdCollides){
		let velys = v*Math.sin(utils.degToRad(angle));
		let velyg = g*t;
	
		vely = velys - velyg;
		velz = v*Math.cos(utils.degToRad(angle));

		trajectoryY = birdStartingY + velys*t - velyg*t/2;
		trajectoryZ = -birdStartingZ + velz*t;
	}else{
		let deltaT = t - collisionT;
		trajectoryY = collisionY + vely*deltaT - (g*deltaT*deltaT /2);
		trajectoryZ = collisionZ + velz*deltaT;

		worldPositions[index] = utils.MakeWorld(0.0 , trajectoryY, trajectoryZ, 0.0,  angle, rotation, scaling);
		isColliding(birdsArray[index-2]);
	}

	if(activateBirdPower){
		activatePower(index);
	}

	let ground = -0.4;

	if(trajectoryY >= ground && trajectoryY <= 20 && !birdCollides){
		birdsArray[index-2].ty = trajectoryY;
		birdsArray[index-2].tz = trajectoryZ;
		birdsArray[index-2].ry = angle;
		birdsArray[index-2].rz = rotation;
		worldPositions[index] = utils.MakeWorld(0.0 , trajectoryY, trajectoryZ, 0.0,  angle, rotation, scaling);
		isColliding(birdsArray[index-2]);
	}
	else{
		//if velx ==0
		rotation = 0.0;
		scaling = 0.5;
		busy = false;
/*
		if(counter == 5)
			window.location.replace("./endGame.html");*/
	}
	t += TICK;
}


function isColliding(bird){
	let radiusY;
	let radiusZ;
	for(let i = 0; i < structureObjs.length; i++ ){
		let objY = structureObjs[i].ty;
		let objZ = structureObjs[i].tz;
		radiusY = structureObjs[i].rady;
		radiusZ = structureObjs[i].radz;

		if(structureObjs[i].type != "egg"){
			if(objY > trajectoryY + BIRD_RADIUS || trajectoryY > objY + radiusY || objZ > trajectoryZ + BIRD_RADIUS || trajectoryZ > objZ + radiusZ)
				;
			else{
				if(vely <= -0.0001 || velz >= 0.0001){
					birdCollides = true;
					collisionY = trajectoryY;
					collisionZ = trajectoryZ;
					collisionT = t;
				
					birdCollision(bird, structureObjs[i]);
				}else{
					//bird done
				}
			}
		}
	}	
}

//urto
function birdCollision(bird, obj){
	let elasticCoefficient = 0.4;
	let birdVzFinal = velz * elasticCoefficient;
	let birdVyFinal = vely * elasticCoefficient;

	obj.vz = (bird.m * velz + obj.m * obj.vz - bird.m * birdVzFinal) / obj.m;
	obj.vy = (bird.m * vely + obj.m * obj.vy - bird.m * birdVyFinal) / obj.m;
/*
	console.log("bird pz: " + bird.m * velz);
	console.log("bird py: " + bird.m * vely);
	console.log("obj pz: " + obj.vz * obj.m);
	console.log("obj py: " + obj.vy * obj.m);*/

	obj.hp = obj.hp - bird.m * velz - bird.m * vely;
 
	checkHp(obj);

	velz = birdVzFinal;
	vely = birdVyFinal;

	obj.isMoving = true;
}

//functions to manage objects collisions
function collides(objMoving){
	let tollerance = 0.1;

	structureObjs.forEach(function(obj) {
		if(obj.scale > 0 && obj != objMoving){
			let objMovingInf = objMoving.ty - objMoving.rady;
			let objMovingSup = objMoving.ty + objMoving.rady;
			let objMovingStart = objMoving.tz - objMoving.radz;
			let objMovingEnd = objMoving.tz + objMoving.radz;
			let objInf = obj.ty - obj.rady;
			let objSup = obj.ty + obj.rady;
			let objStart = obj.tz - obj.radz;
			let objEnd = obj.tz + obj.radz;
	
			if(objSup > objMovingInf && obj.ty < objMovingInf && ((objEnd > objMovingStart + tollerance && objEnd < objMovingEnd) || (objStart < objMovingEnd - tollerance && objStart > objMovingStart) || (objStart - tollerance <= objMovingStart && objEnd + tollerance >= objMovingEnd))){
				if(objMoving.vy <= -0.0001){
					let elasticCoefficient = 0.4;
					let thisVyFinal = objMoving.vy * elasticCoefficient;
					obj.vy = (objMoving.m * objMoving.vy + obj.m * obj.vy - objMoving.m * thisVyFinal) / obj.m;

					objMoving.hp = objMoving.hp - objMoving.m * objMoving.vy;
					obj.hp = obj.hp - objMoving.m * objMoving.vy;
					checkHp(objMoving);
					checkHp(obj)

					objMoving.vy = thisVyFinal;
					obj.isMoving = true;
				}else{
					objMoving.vy = 0;
					if(objMoving.vz <= 0.0001){
						objMoving.vz = 0;
						objMoving.isMoving = false;
					}
				}
			}
	
			if(objStart < objMovingEnd && obj.tz > objMovingEnd && ((objSup > objMovingInf + tollerance && objSup < objMovingSup)  || (objInf < objMovingSup - tollerance && objInf > objMovingInf) ||(objInf - tollerance <= objMovingInf && objSup + tollerance >= objMovingSup))){
				if(objMoving.vz >= 0.0001){
					let elasticCoefficient = 0.4;
					let thisVzFinal = objMoving.vz * elasticCoefficient;
					obj.vz = (objMoving.m * objMoving.vz + obj.m * obj.vz - objMoving.m * thisVzFinal) / obj.m;
				
					objMoving.hp = objMoving.hp - objMoving.m * objMoving.vz;
					obj.hp = obj.hp - objMoving.m * objMoving.vz;
					checkHp(objMoving);
					checkHp(obj)

					objMoving.vz = thisVzFinal;
					obj.isMoving = true;
				}else{
					objMoving.vz = 0;
					if(objMoving.vy >= -0.0001){
						objMoving.vy = 0;
						objMoving.isMoving = false;
					}
				}
			}
		}
	});
}

function checkHp(obj){
	if(obj.hp <= 0){
		obj.scale = 0;
		obj.ty = -5;
		obj.tz = 0;
		obj.vy = 0;
		obj.vz = 0;
	} else if(obj.hp < obj.hp / 3){
		worldPositions[obj.index].textures = GLASSBOX_BROKEN_1;
	} else if(obj.hp < (obj.hp / 3) * 2){
		worldPositions[obj.index].textures = GLASSBOX_BROKEN_2;
	}
}

function moveObject(obj){
	if(obj.isMoving || !obj.isStable){
		let ground = -0.4;

		if(!obj.isStable){
			obj.ty = obj.ty + obj.vy * TICK - (g*TICK*TICK /2);
			obj.vy = obj.vy - g*TICK;
		}else{
			obj.vy = 0;
		}
		obj.vz = obj.vz - obj.vz/100;
		obj.tz = obj.tz + obj.vz * TICK;
		if(obj.tz < 9.5 || obj.ty - obj.rady > ground)
			worldPositions[obj.index] = utils.MakeWorld(obj.tx , obj.ty, obj.tz, obj.rx, obj.ry, obj.rz, obj.scale);
		else{
			worldPositions[obj.index] = utils.MakeWorld(0 , -5, 0, obj.rx, obj.ry, obj.rz, 0);
		}
		collides(obj);
		if(obj.vz <= 0.0001 && obj.vy >= -0.0001)
			obj.isMoving = false;
	}else{
		obj.vy = 0;
		obj.vz = 0;
	}
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

var egg;

function activateMatildaPower(){
	//at first round the new starting coord must be set
	if (isMatildaActiveFirstTime){
		isMatildaActiveFirstTime = false;
		matildaZ = trajectoryZ;
		matildaY = trajectoryY;
		t = 0;
		structureObjs.forEach(function(obj) {
			if(obj.type == "egg"){
				egg = obj;
				obj.tz = matildaZ;
				obj.ty = matildaY;
				obj.vy = -2;
				obj.scale = 0.5;
			}
		});
	}

	//don't always resets right
	if(egg.vy == 0){
		console.log("reset");
		isMatildaActiveFirstTime = true;
		activateBirdPower = false;
	}
	
	var tan = Math.sin(utils.degToRad(angle)) / Math.cos(utils.degToRad(angle));
	trajectoryY = matildaY + v*t*tan;
	trajectoryZ = matildaZ + v*t*tan;
	rotation += 20.0;
}

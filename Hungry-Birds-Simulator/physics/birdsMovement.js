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
var landed = false;
var birdPosition;

var ground = -0.4;

//score variables
var score = 0;
var scoreDiv;

function birdTrajectory(index){
	let bird = birdsArray[index-2];

	activateSound(index);

	if(index != prec){
		t = 0;
		landed = false;
		birdCollides = false;
		prec = index;
		v = BIRD_SPEED * elasticForce;
	}

	if(angleY > 0)
		angle = -90 + angleY;
	else
		angle = Math.abs(angleY);
	
	if(!birdCollides && !landed){
		let velys = v*Math.sin(utils.degToRad(angle));
		let velyg = g*t;
	
		vely = velys - velyg;
		velz = v*Math.cos(utils.degToRad(angle));

		trajectoryY = birdStartingY + velys*t - velyg*t/2;
		trajectoryZ = -birdStartingZ + velz*t;
		bird.ty = trajectoryY;
		bird.tz = trajectoryZ;

		bird.ry = angle;
		bird.rz = rotation;
		worldPositions[index] = utils.MakeWorld(0.0 , bird.ty, bird.tz, 0.0,  angle, rotation, scaling);
		isColliding(bird);
	}else{
	
		if((bird.isStable && velz < 0.001) || landed){
			killBird(bird,index,1000);
			rotation = 0.0;
			scaling = 0.5;
			busy = false;
			if(counter == 5){
				let remainings = 0;
				structureObjs.forEach(function(obj) {
					if((obj.type == "pig" || obj.type =="pigHelmet" || obj.type == "pigMustache") && obj.ty != -5)
						remainings ++;
				});
				window.location.replace("https://hungry-birds-simulator.herokuapp.com/endGame.html?score=" + score + "&p=" + remainings);
			}
		} else{
			checkBirdStability(bird);
			let deltaT = t - collisionT;
			trajectoryY = collisionY + vely*deltaT - (g*deltaT*deltaT /2);
			trajectoryZ = collisionZ + velz*deltaT;
			bird.ty = trajectoryY;
			bird.tz = trajectoryZ;
	
			worldPositions[index] = utils.MakeWorld(0.0 , bird.ty, bird.tz, 0.0,  angle, rotation, scaling);
			isColliding(bird);
		}
	}

	if(activateBirdPower){
		activatePower(index);
	}

	if(trajectoryY - bird.rady <= ground){
		landed = true;
		killBird(bird,index, 1000);
		rotation = 0.0;
		scaling = 0.5;
		busy = false;
		if(counter == 5){
			let remainings = 0;
			structureObjs.forEach(function(obj) {
				if((obj.type == "pig" || obj.type =="pigHelmet" || obj.type == "pigMustache") && obj.ty != -5)
					remainings ++;
			});
			window.location.replace("https://hungry-birds-simulator.herokuapp.com/endGame.html?score=" + score + "&p=" + remainings);
		}
	} else if(trajectoryY > 20){
		killBird(bird,index, 0);
		rotation = 0.0;
		scaling = 0.5;
		busy = false;
		if(counter == 5){
			let remainings = 0;
			structureObjs.forEach(function(obj) {
				if((obj.type == "pig" || obj.type =="pigHelmet" || obj.type == "pigMustache") && obj.ty != -5)
					remainings ++;
			});
			window.location.replace("https://hungry-birds-simulator.herokuapp.com/endGame.html?score=" + score + "&p=" + remainings);
		}
	}
	t += TICK;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function killBird(b,ind, t) {
	await sleep(t);
	b.ty = -5;
	b.tz = 0;
	worldPositions[ind] = utils.MakeWorld(b.tx , b.ty, b.tz, b.rx, b.ry, b.rz, 0);
  }

function checkBirdStability(bird){
	let birdY = bird.ty - bird.rady;
	let birdZ = bird.tz;
	let birdZStart = bird.tz - bird.radz;
	let birdZEnd = bird.tz + bird.radz;
	let ground = -0.4;
	let tollerance = 0.05;
	let stable = false;

	if( ground < birdY - tollerance && bird.ty != -5){
		structureObjs.forEach(function(obj) {
			if((obj.ty + obj.rady >= birdY - tollerance) && (obj.ty + obj.rady <= birdY + tollerance)){
				if((obj.tz + obj.radz >= birdZ && obj.tz - obj.radz <= birdZ) || (obj.tz - obj.radz <= birdZ && obj.tz + obj.radz >= birdZ)){
					stable = true;
				} else if(obj.tz + obj.radz > birdZStart && obj.tz - obj.radz <= birdZEnd && obj.tz < birdZ){
					stable = true;
				} else if(obj.tz - obj.radz < birdZEnd && obj.tz + obj.radz >= birdZStart){
					stable = true;
				}
			}
		});

		if(!stable){
			bird.isStable = false;
		}else{
			bird.isStable = true;
			bird.vy = 0;
			vely = 0;
		}
	}
	else{
		bird.isStable = true;
		birdCollides = true;
		bird.vy = 0;
		vely = 0;
	}
}


function isColliding(bird){
	let tollerance = 0.1;
	for(let i = 0; i < structureObjs.length; i++ ){
		let obj = structureObjs[i];
		let birdInf = bird.ty - bird.rady;
		let birdSup = bird.ty + bird.rady;
		let birdStart = bird.tz - bird.radz;
		let birdEnd = bird.tz + bird.radz;
		let objInf = obj.ty - obj.rady;
		let objSup = obj.ty + obj.rady;
		let objStart = obj.tz - obj.radz;
		let objEnd = obj.tz + obj.radz;

		if(structureObjs[i].type != "egg"){
			if(objSup > birdInf && obj.ty < birdInf && ((objEnd > birdStart + tollerance && objEnd < birdEnd) || (objStart < birdEnd - tollerance && objStart > birdStart) || (objStart - tollerance <= birdStart && objEnd + tollerance >= birdEnd))){
				if(vely <= -0.0001 || velz >= 0.0001){
					birdCollides = true;
					collisionY = trajectoryY;
					collisionZ = trajectoryZ;
					collisionT = t;
				
					birdCollision(bird, structureObjs[i]);
				}
			} else if(objStart < birdEnd && obj.tz > birdEnd && ((objSup > birdInf + tollerance && objSup < birdSup)  || (objInf < birdSup - tollerance && objInf > birdInf) ||(objInf - tollerance <= birdInf && objSup + tollerance >= birdSup))){
				if(vely <= -0.0001 || velz >= 0.0001){
					birdCollides = true;
					collisionY = trajectoryY;
					collisionZ = trajectoryZ;
					collisionT = t;
				
					birdCollision(bird, structureObjs[i]);
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

	obj.hp = obj.hp -(bird.m * Math.abs(velz) + bird.m * Math.abs(vely) )* BIRD_DMG_COEFFICIENT;
 
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

					objMoving.hp = objMoving.hp - objMoving.m * Math.abs(objMoving.vy);
					obj.hp = obj.hp - objMoving.m * Math.abs(objMoving.vy) * COLLISION_DMG_COEFFICIENT;
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
				
					objMoving.hp = objMoving.hp - objMoving.m * Math.abs(objMoving.vz);
					obj.hp = obj.hp - objMoving.m * Math.abs(objMoving.vz) * COLLISION_DMG_COEFFICIENT;
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
	scoreDiv = document.getElementById("score");
	if(obj.hp <= 0){
		if(obj.type == "pig"){
			score += 500;
		}else if(obj.type == "pigHelmet"){
			score += 750;
		}else if(obj.type == "pigMustache"){
			score += 1000;
		}else {
			score += 200;
		}
		scoreDiv.innerHTML = "Score: " + score;

		obj.scale = 0;
		obj.ty = -5;
		obj.tz = 0;
		obj.vy = 0;
		obj.vz = 0;
		worldPositions[obj.index] = utils.MakeWorld(obj.tx , obj.ty, obj.tz, obj.rx, obj.ry, obj.rz, obj.scale);
	} else if(obj.hp < obj.maxHp / 3){
		score += 100;
		scoreDiv.innerHTML = "Score: " + score;

		switch(obj.type){
			case "glassVerticalPlane":
				allMeshes[obj.index].textures = GLASSVERTICAL_BROKEN_1;
				break;
			case "woodVerticalPlane":
				allMeshes[obj.index].textures = WOODVERTICAL_BROKEN_1;
				break;
			case "glassHorizontalPlane":
				allMeshes[obj.index].textures = GLASSHORIZONTAL_BROKEN_1;
				break;
			case "woodHorizontalPlane":
				allMeshes[obj.index].textures = WOODHORIZONTAL_BROKEN_1;
				break;
			case "glassPyramid":
				allMeshes[obj.index].textures = GLASSBOX_BROKEN_1;
				break;
			case "glassBox":
				allMeshes[obj.index].textures = GLASSBOX_BROKEN_1;
				break;
			case "woodPyramid":
				allMeshes[obj.index].textures = WOODBOX_BROKEN_1;
				break;
			case "woodBox":
				allMeshes[obj.index].textures = WOODBOX_BROKEN_1;
				break;
			case "stoneSquare":
				allMeshes[obj.index].textures = STONESQUARE_BROKEN_1;
				break;
			case "stonePyramid":
				allMeshes[obj.index].textures = STONEBOX_BROKEN_1;
				break;
			case "stoneBox":
				allMeshes[obj.index].textures = STONEBOX_BROKEN_1;
				break;
			default:
				break;
		}
	} else if(obj.hp < (obj.maxHp / 3) * 2){
		score += 50;
		scoreDiv.innerHTML = "Score: " + score;

		switch(obj.type){
			case "glassVerticalPlane":
				allMeshes[obj.index].textures = GLASSVERTICAL_BROKEN_2;
				break;
			case "woodVerticalPlane":
				allMeshes[obj.index].textures = WOODVERTICAL_BROKEN_2;
				break;
			case "glassHorizontalPlane":
				allMeshes[obj.index].textures = GLASSHORIZONTAL_BROKEN_2;
				break;
			case "woodHorizontalPlane":
				allMeshes[obj.index].textures = WOODHORIZONTAL_BROKEN_2;
				break;
			case "glassPyramid":
				allMeshes[obj.index].textures = GLASSBOX_BROKEN_2;
				break;
			case "glassBox":
				allMeshes[obj.index].textures = GLASSBOX_BROKEN_2;
				break;
			case "woodPyramid":
				allMeshes[obj.index].textures = WOODBOX_BROKEN_2;
				break;
			case "woodBox":
				allMeshes[obj.index].textures = WOODBOX_BROKEN_2;
				break;
			case "stoneSquare":
				allMeshes[obj.index].textures = STONESQUARE_BROKEN_1;
				break;
			case "stonePyramid":
				allMeshes[obj.index].textures = STONEBOX_BROKEN_2;
				break;
			case "stoneBox":
				allMeshes[obj.index].textures = STONEBOX_BROKEN_2;
				break;
			default:
				break;
		}
	}
	
	addMeshToScene(obj.index);
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
		obj.vz = obj.vz - obj.vz/100 * 2;
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

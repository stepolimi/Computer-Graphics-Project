//birds base variables
var t = 0;
var prec = 0;
var busy = false;
var angle;
var rotation = 0.0;
var g = GRAVITY;
var v = 0; 
var vely = 0;
var velz = 0;
var bird = new birdObject(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, "red", 5);

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


//collision variables
var collisionY;
var collisionZ;
var collisionT = 0;
var birdCollides = false;
var landed = false;
var escaped = false;
var birdPosition;
var ground = -0.4;

//score variables
var score = 0;
var scoreDiv;
var ended = false;

//main function to manage birds launch, trajectory and liveliness
function birdTrajectory(index){
	activateSound(index);

	if(index != prec){
		bird = birdsArray[index-2];
		t = 0;
		landed = false;
		escaped = false;
		birdCollides = false;
		prec = index;
		scaling = 0.5;
		v = BIRD_SPEED * elasticForce;
	}

	if(angleY > 0)
		angle = -90 + angleY;
	else
		angle = Math.abs(angleY);
	
	if(!birdCollides && !landed && !escaped){
		let velys = v*Math.sin(utils.degToRad(angle));
		let velyg = g*t;
	
		vely = velys - velyg;
		velz = v*Math.cos(utils.degToRad(angle));

		bird.ty = birdStartingY + velys*t - velyg*t/2;
		bird.tz = -birdStartingZ + velz*t;

		if(activateBirdPower){
			activatePower();
		}

		bird.ry = angle;
		bird.rz = rotation;

		worldPositions[index] = utils.MakeWorld(0.0 , bird.ty, bird.tz, 0.0,  angle, rotation, scaling);
		isColliding();
	}else{
	
		if((bird.isStable && velz < 0.001) || landed){
			if(bird.type == "bomb"){
				activateBombPower();
			}
			endBird(index);
			worldPositions[index] = utils.MakeWorld(0.0 , bird.ty, bird.tz, 0.0,  angle, rotation, scaling);
		} else{
			if(!escaped){
				checkBirdStability();
				let deltaT = t - collisionT;
				bird.ty = collisionY + vely*deltaT - (g*deltaT*deltaT /2);
				bird.tz = collisionZ + velz*deltaT;
		
				if(bird.type == "bomb")
					activateBombPower();
	
				worldPositions[index] = utils.MakeWorld(0.0 , bird.ty, bird.tz, 0.0,  angle, rotation, scaling);
				isColliding();
			}
		}
	}

	if(bird.ty - bird.rady <= ground){
		landed = true;
		endBird(index);
	} else if(bird.ty > 20){
		escaped = true;
		endBird(index);
	}
	t += TICK;
}


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

//kills the current bird
async function killBird(ind, t) {
	await sleep(t);
	if(bird.type != "bomb")
		document.getElementById("bird_death").play();
	bird.ty = -5;
	bird.tz = 0;
	if(ind-1 < 5)
		bird = birdsArray[ind-1];
	worldPositions[ind] = utils.MakeWorld(bird.tx , bird.ty, bird.tz, bird.rx, bird.ry, bird.rz, 0);
}

//resets some values and kills the bird when it is done
function endBird(index){
		if(busy)
			killBird(index, 1000);
		rotation = 0.0;
		scaling = 0.5;
		busy = false;
		resetBirdPower();
		if(counter == 5){
			let remainings = 0;
			structureObjs.forEach(function(obj) {
				if((obj.type == "pig" || obj.type =="pigHelmet" || obj.type == "pigMustache") && obj.ty >= -0.4)
					remainings ++;
			});
			if(!ended){
				endGame(remainings);
			}		
		}
}

//replace index page with endGame page
async function endGame(remainings){
	ended = true;
	await sleep(3000);
	window.location.replace("https://hungry-birds-simulator.herokuapp.com/endGame.html?score=" + score + "&p=" + remainings);
}

//ceck is the bird is able to free falling or is over an object
function checkBirdStability(){
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

//checks if the current bird is colliding with some objects
function isColliding(){
	let tollerance = 0.05;
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
			//bird collision down
			if((objSup > birdInf - tollerance && obj.ty < birdInf) && ((objEnd > birdStart + tollerance && objEnd < birdEnd) || (objStart < birdEnd - tollerance && objStart > birdStart) || (objStart - tollerance <= birdStart && objEnd + tollerance >= birdEnd)))
				if(vely <= -0.0001 || vely >= 0.0001 || velz >= 0.0001 || velz <= -0.0001){
					let elasticCoefficient = 0.4;
					let birdVzFinal = velz * elasticCoefficient;
					let birdVyFinal = vely * elasticCoefficient;

					if(bird.type == "bomb"){
						bird.vy= 10.0;
						bird.vz = 5.0;
						vely = bird.vy;
						velz = bird.vz;
					}
				
					obj.vz = (bird.m * velz + obj.m * obj.vz - bird.m * birdVzFinal) / obj.m;
					obj.vy = (bird.m * vely + obj.m * obj.vy - bird.m * birdVyFinal) / obj.m;
					
					birdCollides = true;
					collisionY = bird.ty;
					collisionZ = bird.tz;
					collisionT = t;
				
					birdCollision(structureObjs[i]);
				}
			//bird collision up
			if((objInf < birdSup + tollerance && obj.ty > birdSup) && ((objEnd > birdStart + tollerance && objEnd < birdEnd) || (objStart < birdEnd - tollerance && objStart > birdStart) || (objStart - tollerance <= birdStart && objEnd + tollerance >= birdEnd)))
				if(vely <= -0.0001 || vely >= 0.0001 || velz >= 0.0001 || velz <= -0.0001){
					let elasticCoefficient = 0.4;
					let birdVzFinal = velz * elasticCoefficient;
					let birdVyFinal = vely * elasticCoefficient;

					if(bird.type == "bomb"){
						bird.vy= 10.0;
						bird.vz = 5.0;
						vely = bird.vy;
						velz = bird.vz;
					}
				
					obj.vz = (bird.m * velz + obj.m * obj.vz - bird.m * birdVzFinal) / obj.m;
					obj.vy = - (bird.m * vely + obj.m * obj.vy - bird.m * birdVyFinal) / obj.m;
					
					birdCollides = true;
					collisionY = bird.ty;
					collisionZ = bird.tz;
					collisionT = t;
				
					birdCollision(structureObjs[i]);
				}
			//bird collision right
			if((objStart < birdEnd + tollerance && obj.tz > birdEnd) && ((objSup > birdInf + tollerance && objSup < birdSup)  || (objInf < birdSup - tollerance && objInf > birdInf) ||(objInf - tollerance <= birdInf && objSup + tollerance >= birdSup)))
				if(vely <= -0.0001 || vely >= 0.0001 || velz >= 0.0001 || velz <= -0.0001){
					let elasticCoefficient = 0.4;
					let birdVzFinal = velz * elasticCoefficient;
					let birdVyFinal = vely * elasticCoefficient;

					console.log("obj: " + obj.type);
				
					if(bird.type == "bomb"){
						bird.vy= 10.0;
						bird.vz = 5.0;
						vely = bird.vy;
						velz = bird.vz;
					}
					obj.vz = (bird.m * velz + obj.m * obj.vz - bird.m * birdVzFinal) / obj.m;
					obj.vy = (bird.m * vely + obj.m * obj.vy - bird.m * birdVyFinal) / obj.m;

					birdCollides = true;
					collisionY = bird.ty;
					collisionZ = bird.tz;
					collisionT = t;

					birdCollision(structureObjs[i]);
				}
			//bird collision left
			if( (objEnd > birdStart - tollerance && obj.tz < birdStart)&& ((objSup > birdInf + tollerance && objSup < birdSup)  || (objInf < birdSup - tollerance && objInf > birdInf) ||(objInf - tollerance <= birdInf && objSup + tollerance >= birdSup)))
				if(vely <= -0.0001 || vely >= 0.0001 || velz >= 0.0001 || velz <= -0.0001){
					let elasticCoefficient = 0.4;
					let birdVzFinal = velz * elasticCoefficient;
					let birdVyFinal = vely * elasticCoefficient;

					if(bird.type == "bomb"){
						bird.vy= 10.0;
						bird.vz = 5.0;
						vely = bird.vy;
						velz = bird.vz;
					}
				
					obj.vz = - (bird.m * velz + obj.m * obj.vz - bird.m * birdVzFinal) / obj.m;
					obj.vy = (bird.m * vely + obj.m * obj.vy - bird.m * birdVyFinal) / obj.m;
					
					birdCollides = true;
					collisionY = bird.ty;
					collisionZ = bird.tz;
					collisionT = t;
				
					birdCollision(structureObjs[i]);
				}
		}	
	}
}

//manages collisions of birds
function birdCollision(obj){
	let elasticCoefficient = 0.4;
	let birdVzFinal = velz * elasticCoefficient;
	let birdVyFinal = vely * elasticCoefficient;

	if(bird.type == "bomb"){
		obj.hp = obj.hp -(bird.m * Math.abs(velz) + bird.m * Math.abs(vely) )* BIRD_DMG_COEFFICIENT * 2;
	}else if(bird.type == "chuck" && !isChuckActiveFirstTime){
		velz = birdVzFinal;
		vely = birdVyFinal;
		obj.hp = obj.hp - bird.m * Math.abs(v) * BIRD_DMG_COEFFICIENT;
	}else{
		velz = birdVzFinal;
		vely = birdVyFinal;
		obj.hp = obj.hp -(bird.m * Math.abs(velz) + bird.m * Math.abs(vely) )* BIRD_DMG_COEFFICIENT;
	}

	switch(bird.type){
		case "red":
			document.getElementById("red_collision").play();
			break;
		case "matilda":
			document.getElementById("matilda_collision").play();
			break;
		case "chuck":
			document.getElementById("chuck_collision").play();
			break;
		default:
			break;
	}

	checkHp(obj);
	obj.isMoving = true;
}

//check objects hp to change theyr textures, calculate the score and eliminate destroyed objects
function checkHp(obj){
	scoreDiv = document.getElementById("score");
	let newMesh = allMeshes[obj.index];
	if(obj.hp <= 0){
		if(obj.type == "pig"){
			score += 500;
			document.getElementById("pig_death").play();
		}else if(obj.type == "pigHelmet"){
			score += 750;
			document.getElementById("pig_death").play();
		}else if(obj.type == "pigMustache"){
			score += 1000;
			document.getElementById("pig_death").play();
		}else {
			score += 200;
		}
		scoreDiv.innerHTML = "Score: " + score;

		if(obj.type == "tnt"){
			if(obj.scale != 0){
				document.getElementById("tnt").play();
				explode(obj);
			}
		} else{
			obj.scale = 0;
			obj.ty = -5;
			obj.tz = 0;
			obj.vy = 0;
			obj.vz = 0;
		}

		worldPositions[obj.index] = utils.MakeWorld(obj.tx , obj.ty, obj.tz, obj.rx, obj.ry, obj.rz, obj.scale);
	} else if(obj.hp < obj.maxHp / 3){
		score += 100;
		scoreDiv.innerHTML = "Score: " + score;

		switch(obj.type){
			case "glassVerticalPlane":
			case "glassHorizontalPlane":
				newMesh.textures = GLASSPLANE_BROKEN_1;
				break;
			case "woodVerticalPlane":
			case "woodHorizontalPlane":
				allMeshes[obj.index].textures = WOODPLANE_BROKEN_1;
				break;
			case "glassPyramid":
				allMeshes[obj.index].textures = GLASSPYRAMID_BROKEN_1;
				break;
			case "glassBox":
				allMeshes[obj.index].textures = GLASSBOX_BROKEN_1;
				break;
			case "woodPyramid":
				allMeshes[obj.index].textures = WOODPYRAMID_BROKEN_1;
				break;
			case "woodBox":
				allMeshes[obj.index].textures = WOODBOX_BROKEN_1;
				break;
			case "stoneSquare":
				allMeshes[obj.index].textures = STONESQUARE_BROKEN_1;
				break;
			case "stonePyramid":
				allMeshes[obj.index].textures = STONEPYRAMID_BROKEN_1;
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
			case "glassHorizontalPlane":
				newMesh.textures = GLASSPLANE_BROKEN_2;
				break;
			case "woodVerticalPlane":
			case "woodHorizontalPlane":
				allMeshes[obj.index].textures = WOODPLANE_BROKEN_2;
				break;
			case "glassPyramid":
				allMeshes[obj.index].textures = GLASSPYRAMID_BROKEN_2;
				break;
			case "glassBox":
				allMeshes[obj.index].textures = GLASSBOX_BROKEN_2;
				break;
			case "woodPyramid":
				allMeshes[obj.index].textures = WOODPYRAMID_BROKEN_2;
				break;
			case "woodBox":
				allMeshes[obj.index].textures = WOODBOX_BROKEN_2;
				break;
			case "stoneSquare":
				allMeshes[obj.index].textures = STONESQUARE_BROKEN_2;
				break;
			case "stonePyramid":
				allMeshes[obj.index].textures = STONEPYRAMID_BROKEN_2;
				break;
			case "stoneBox":
				allMeshes[obj.index].textures = STONEBOX_BROKEN_2;
				break;
			default:
				break;
		}
	}

	if(obj.hp < (obj.maxHp / 3) * 2){
		switch(obj.type){
			case "glassHorizontalPlane":
			case "glassPyramid":
			case "glassBox":
			case "glassVerticalPlane":
				document.getElementById("ice_collision").play();
				break;
			case "woodVerticalPlane":
			case "woodHorizontalPlane":
			case "woodPyramid":
			case "woodBox":
				document.getElementById("wood_collision").play();
				break;
			case "stoneSquare":
			case "stonePyramid":
			case "stoneBox":
				document.getElementById("stone_collision").play();
				break;
			case "pig":
				document.getElementById("pig_collision").play();
				break;
			case "pigHelmet":
			case "pigMustache":
				document.getElementById("big_pig_collision").play();
				break;
		}
	}
	
	addMeshToScene(obj.index);
}

async function changeMesh(index){
	allMeshes[index] = await utils.loadMesh("../assets/Others/glassPlaneBroken1.obj");
}

//plays the launch sound of birds
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
function activatePower(){
	var birdType = bird.type;
	switch(birdType){
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

//resets each bird power, is called at each bird change
function resetBirdPower(){
	isMatildaActiveFirstTime = true;
	activateBirdPower = false;
	isBombActiveFirstTime = true;
	isChuckActiveFirstTime = true;
}

//manages the explosion of bomb
function activateBombPower(){
	scaling = 0.0;
	let bombTemp = bird;
	if(isBombActiveFirstTime){
		isBombActiveFirstTime = false;
		bombZ = bombTemp.tz;
		bombY = bombTemp.ty;
		scaling = 0.0;
		explosionScaling = 0.0;
		if(bird.ty != -5)
			document.getElementById("bomb_explode").play();
	}

	explosionScaling += 0.02;
	if(explosionScaling <= 1.0){
		bird.rady += 0.02; 
		bird.radz += 0.02;
		bird.ty = bombY;
		bird.tz = bombZ;
		worldPositions[9] = utils.MakeWorld(0.0, bombY, bombZ, 0.0, 0.0, 0.0, explosionScaling);
	}else{
		explosionScaling = 0.0;
		isBombActiveFirstTime = true;
		activateBirdPower = false;
		bird.ty = -5;
		bird.tz = 0;
		bird.rady = 0;
		bird.radz = 0;
		endBird(prec);
		setTimeout(function(){worldPositions[9] = utils.MakeWorld(0.0, bombY, bombZ, 0.0, 0.0, 0.0, explosionScaling)}, 1000);
	}
}

var chuckV;
var angleChange = false;

//manages the change of valocity of chuck
function activateChuckPower(){
	if (isChuckActiveFirstTime){
		isChuckActiveFirstTime = false;
		angleChange = false;
		chuckV = v*2.5;
		chuckY = bird.ty;
		chuckZ = bird.tz;
		
		let futureTy = birdStartingY + v*Math.sin(utils.degToRad(angle))*(t+TICK) - g*(t+TICK)*(t+TICK)/2;
		if(futureTy < bird.ty)
			angleChange = true;
	}

	if(!angleChange)
		chuckY = chuckY + v*Math.sin(utils.degToRad(angle))*TICK - g*TICK*TICK/2;
	else
		chuckY = chuckY - v*Math.sin(utils.degToRad(angle))*TICK - g*TICK*TICK/2;
	chuckZ = chuckZ + chuckV*Math.cos(utils.degToRad(angle))*TICK;
	bird.ty = chuckY;
	bird.tz = chuckZ;
}

var egg;

//manages the Matilda's power
function activateMatildaPower(){
	if (isMatildaActiveFirstTime){
		isMatildaActiveFirstTime = false;
		matildaZ = bird.tz;
		matildaY = bird.ty;

		t = TICK;
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
	
	var tan = Math.sin(utils.degToRad(angle)) / Math.cos(utils.degToRad(angle));
	bird.ty = matildaY + v*t*tan;
	bird.tz = matildaZ + v*t*tan;
	
	rotation += 20.0;
}

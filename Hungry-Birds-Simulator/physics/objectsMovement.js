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
			case "glassHorizontalPlane":
				allMeshes[obj.index].textures = GLASSPLANE_BROKEN_1;
				break;
			case "woodVerticalPlane":
			case "woodHorizontalPlane":
				allMeshes[obj.index].textures = WOODPLANE_BROKEN_1;
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
			case "glassHorizontalPlane":
				allMeshes[obj.index].textures = GLASSPLANE_BROKEN_2;
				break;
			case "woodVerticalPlane":
			case "woodHorizontalPlane":
				allMeshes[obj.index].textures = WOODPLANE_BROKEN_2;
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
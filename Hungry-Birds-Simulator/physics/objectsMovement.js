
//function to manage objects collisions
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
	
			//object collision down
			if(((objSup > objMovingInf && obj.ty < objMovingInf) || (objInf < objMovingSup && obj.ty > objMovingSup)) && ((objEnd > objMovingStart + tollerance && objEnd < objMovingEnd) || (objStart < objMovingEnd - tollerance && objStart > objMovingStart) || (objStart - tollerance <= objMovingStart && objEnd + tollerance >= objMovingEnd))){
				if(objMoving.vy <= -0.0001 || objMoving.vy >= 0.0001){
					let elasticCoefficient = 0.4;
					let thisVyFinal = objMoving.vy * elasticCoefficient;
					obj.vy = (objMoving.m * objMoving.vy + obj.m * obj.vy - objMoving.m * thisVyFinal) / obj.m;

					if(obj.vy > 0 )
						obj.vy = - obj.vy;

					objMoving.hp = objMoving.hp - objMoving.m * Math.abs(objMoving.vy);
					obj.hp = obj.hp - objMoving.m * Math.abs(objMoving.vy) * COLLISION_DMG_COEFFICIENT;
					checkHp(objMoving);
					checkHp(obj)

					objMoving.vy = thisVyFinal;
					obj.isMoving = true;
				}else{
					objMoving.vy = 0;
					if(objMoving.vz <= 0.0001 && objMoving.vz >= -0.0001){
						objMoving.vz = 0;
						objMoving.isMoving = false;
					}
				}
			//object collision up
			}else if((objInf < objMovingSup && obj.ty > objMovingSup) && ((objEnd > objMovingStart + tollerance && objEnd < objMovingEnd) || (objStart < objMovingEnd - tollerance && objStart > objMovingStart) || (objStart - tollerance <= objMovingStart && objEnd + tollerance >= objMovingEnd))){
				if(objMoving.vy <= -0.0001 || objMoving.vy >= 0.0001){
					let elasticCoefficient = 0.4;
					let thisVyFinal = objMoving.vy * elasticCoefficient;
					obj.vy = (objMoving.m * objMoving.vy + obj.m * obj.vy - objMoving.m * thisVyFinal) / obj.m;

					if(obj.vy < 0 )
						obj.vy = - obj.vy;

					objMoving.hp = objMoving.hp - objMoving.m * Math.abs(objMoving.vy);
					obj.hp = obj.hp - objMoving.m * Math.abs(objMoving.vy) * COLLISION_DMG_COEFFICIENT;
					checkHp(objMoving);
					checkHp(obj)

					objMoving.vy = thisVyFinal;
					obj.isMoving = true;
				}else{
					objMoving.vy = 0;
					if(objMoving.vz <= 0.0001 && objMoving.vz >= -0.0001){
						objMoving.vz = 0;
						objMoving.isMoving = false;
					}
				}
			}
	
			//object collision right
			if((objStart < objMovingEnd && obj.tz > objMovingEnd) && ((objSup > objMovingInf + tollerance && objSup < objMovingSup)  || (objInf < objMovingSup - tollerance && objInf > objMovingInf) ||(objInf - tollerance <= objMovingInf && objSup + tollerance >= objMovingSup))){
				if(objMoving.vz >= 0.0001 || objMoving.vz <= -0.0001){
					let elasticCoefficient = 0.4;
					let thisVzFinal = objMoving.vz * elasticCoefficient;
					obj.vz = (objMoving.m * objMoving.vz + obj.m * obj.vz - objMoving.m * thisVzFinal) / obj.m;

					if(obj.vz < 0 )
						obj.vz = - obj.vz;
										
					objMoving.hp = objMoving.hp - objMoving.m * Math.abs(objMoving.vz);
					obj.hp = obj.hp - objMoving.m * Math.abs(objMoving.vz) * COLLISION_DMG_COEFFICIENT;
					checkHp(objMoving);
					checkHp(obj)

					objMoving.vz = thisVzFinal;
					obj.isMoving = true;
				}else{
					objMoving.vz = 0;
					if(objMoving.vy >= -0.0001 && objMoving.vy <= 0.0001){
						objMoving.vy = 0;
						objMoving.isMoving = false;
					}
				}
			//object collision left
			}else if((objEnd > objMovingStart && obj.tz < objMovingStart) && ((objSup > objMovingInf + tollerance && objSup < objMovingSup)  || (objInf < objMovingSup - tollerance && objInf > objMovingInf) ||(objInf - tollerance <= objMovingInf && objSup + tollerance >= objMovingSup))){
				if(objMoving.vz >= 0.0001 || objMoving.vz <= -0.0001){
					let elasticCoefficient = 0.4;
					let thisVzFinal = objMoving.vz * elasticCoefficient;
					obj.vz = (objMoving.m * objMoving.vz + obj.m * obj.vz - objMoving.m * thisVzFinal) / obj.m;

					if(obj.vz > 0 )
						obj.vz = - obj.vz;
				
					objMoving.hp = objMoving.hp - objMoving.m * Math.abs(objMoving.vz);
					obj.hp = obj.hp - objMoving.m * Math.abs(objMoving.vz) * COLLISION_DMG_COEFFICIENT;
					checkHp(objMoving);
					checkHp(obj)

					objMoving.vz = thisVzFinal;
					obj.isMoving = true;
				}else{
					objMoving.vz = 0;
					if(objMoving.vy >= -0.0001 && objMoving.vy <= 0.0001){
						objMoving.vy = 0;
						objMoving.isMoving = false;
					}
				}
			}
		}
	});
}

//tnt explosion
async function explode(obj){
	let objTy = obj.ty;
	let objTz = obj.tz;
	while(obj.rady < 1){
		obj.rady += 0.1; 
		obj.radz += 0.1;
		obj.isMoving = false;
		obj.vy = 10;
		obj.vz = 5;
		obj.ty = objTy;
		obj.tz = objTz
		obj.scale = 0;
		collides(obj);
	}

	obj.scale = 0;
	obj.ty = -5;
	obj.tz = 0;
	obj.vy = 0;
	obj.vz = 0;
	worldPositions[obj.index] = utils.MakeWorld(obj.tx , obj.ty, obj.tz, obj.rx, obj.ry, obj.rz, obj.scale);
}

//manages the moves of each object in the scene
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
		if(obj.vz <= 0.0001 && obj.vz >= -0.0001 && obj.vy >= -0.0001 && obj.vy <= 0.0001)
			obj.isMoving = false;
	}else{
		obj.vy = 0;
		obj.vz = 0;
	}
}

//check stability conditions for objects
function checkStability(){
    let tollerance = 0.05;

    structureObjs.forEach(function(objTocheck) {
        let objY = objTocheck.ty - objTocheck.rady;
        let objZ = objTocheck.tz;
        let objZStart = objTocheck.tz - objTocheck.radz;
        let objZEnd = objTocheck.tz + objTocheck.radz;
        let stable = false;
        let precStable = false;
        let sucStable = false;
        let ground = -0.4;
        let hitObjs = [];

        if( !((ground > objY - tollerance) && (ground < objY + tollerance)) && objTocheck.ty != -5){
            structureObjs.forEach(function(obj) {
                if((obj.ty + obj.rady >= objY - tollerance) && (obj.ty + obj.rady <= objY + tollerance)){
                    if((obj.tz + obj.radz >= objZ && obj.tz - obj.radz <= objZ) || (obj.tz - obj.radz <= objZ && obj.tz + obj.radz >= objZ)){
                        stable = true;
                        hitObjs.push(obj);
                    }else if(obj.tz + obj.radz > objZStart && obj.tz - obj.radz <= objZEnd && obj.tz < objZ){
                        precStable = true;
                        objTocheck.supLeftPieces.push(obj);
                        hitObjs.push(obj);
                    }
                    else if(obj.tz - obj.radz < objZEnd && obj.tz + obj.radz >= objZStart){
                        sucStable = true;
                        objTocheck.supRightPieces.push(obj);
                        hitObjs.push(obj);
                    }
                }else if(obj.type =="glassBox" || obj.type == "woodBox"  || obj.type == "stoneBox"){
                    if(objY > obj.ty - obj.rady && objTocheck.ty + objTocheck.rady < obj.ty + obj.rady){
                        if(obj.tz + obj.radz >= objZ && obj.tz - obj.radz <= objZ){
                            stable = true;
                            hitObjs.push(obj);
                        }
                    }
                }
            });

            if(!stable && !(precStable && sucStable)){
                objTocheck.isStable = false;
            }else{
                if(objTocheck.vy != 0){
                    let hit = Math.abs(objTocheck.vy) * objTocheck.m * FALL_DMG_COEFFICIENT;
                    objTocheck.hp = objTocheck.hp - hit;
                    checkHp(objTocheck);
    
                    hitObjs.forEach(function(obj) {
                        obj.hp = obj.hp - hit;
                        checkHp(obj)
                    });
                }

                objTocheck.isStable = true;
                if(!objTocheck.isMoving){
                    objTocheck.vy = 0;
                    objTocheck.vz = 0;
                }
            }
        }
        else{
            if(objTocheck.vy != 0){
                let hit = Math.abs(objTocheck.vy) * objTocheck.m * FALL_DMG_COEFFICIENT;
                objTocheck.hp = objTocheck.hp - hit;
                checkHp(objTocheck);
    
                hitObjs.forEach(function(obj) {
                    obj.hp = obj.hp - hit;
                    checkHp(obj)
                });
            }
            objTocheck.isStable = true;
            if(!objTocheck.isMoving){
                objTocheck.vy = 0;
                objTocheck.vz = 0;
            }
        }
    });
}

//manages falls of partially instable objects
function objectFall(){
    structureObjs.forEach(function(obj) {
       if(!obj.isStable){
        //object supported only on the left
        if(obj.supLeftPieces.length != 0){
            let maxZ = -100;
            let rotObj = obj;
            obj.supLeftPieces.forEach(function(supObj) {
                if(supObj.tz + supObj.radz > maxZ){
                    maxZ = supObj.tz + supObj.radz;
                    rotObj = supObj;
                }
            });
            if(obj.vz == 0 && obj.type!="egg")
                obj.vz = 0.1;
        }
        //object supported only on the right
        else if(obj.supRightPieces.length != 0){
            let minZ = 100;
            obj.supRightPieces.forEach(function(supObj) {
                if(supObj.tz - supObj.radz < minZ)
                    minZ = supObj.tz - supObj.radz;
            });
            if(obj.vz == 0 && obj.type!="egg")
                obj.vz = - 0.1;
        }
     }
    });
}
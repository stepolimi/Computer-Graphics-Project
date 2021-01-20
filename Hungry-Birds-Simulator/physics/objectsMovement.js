//applies gravity to objects
function checkStability(){
    structureObjs.forEach(function(objTocheck) {
        let objY = objTocheck.ty - objTocheck.rady;
        let objZ = objTocheck.tz;
        let objZStart = objTocheck.tz - objTocheck.radz;
        let objZEnd = objTocheck.tz + objTocheck.radz;
        let stable = false;
        let precStable = false;
        let nextStable = false;
        let tollerance = 0.05;
        structureObjs.forEach(function(obj) {
            if((obj.ty + obj.rady > objY - tollerance) && (obj.ty + obj.rady < objY + tollerance)){
                if((obj.tz + obj.radz >= objZ) || (obj.tz - obj.radz <= objZ))
                    stable = true;
                else if(obj.tz + obj.radz >= objZStart)
                    precStable = true;
                else if(obj.tz - obj.radz <= objZEnd)
                    nextStable = true;
            }
        });
        if(stable || (precStable && nextStable))
            objTocheck.isStable = false;
    });
}

function objectFall(){
    structureObjs.forEach(function(obj) {
       if(!obj.isStable){
           //todo: scaling
        obj.vy = obj.vy - (g*TICK*TICK /2);
        obj.ty = obj.ty + obj.vy * TICK;
        worldPositions[obj.index] = utils.MakeWorld(obj.tx , obj.ty, obj.tz, obj.rx, obj.ry, obj.rz, 0.2);
       }
    });
}
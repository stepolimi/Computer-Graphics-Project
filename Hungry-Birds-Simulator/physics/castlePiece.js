// JavaScript source code
class structureObjects {
	constructor(tx, ty, tz, rx, ry, rz, type, index, m, scale){
		this.tx = tx;
		this.ty = ty;
		this.tz = tz;
		this.rx = rx;
		this.ry = ry;
		this.rz = rz;
		this.vz = 0;
		this.vy = 0;
		this.m = m;
		this.scale = 0.2;
		this.durability = 3;
		this.index = index;
		this.type = type;
		this.isColliding = false;
		this.isStable = true;
		this.supLeftPieces = [];
		this.supRightPieces = [];

		if(type == "glassVerticalPlane" ||  type == "woodVerticalPlane"){
			this.rady = VERTICAL_PANE_BIG_RADIUS;
			this.radz = VERTICAL_PANE_SMALL_RADIUS;
		} else if(type == "glassHorizontalPlane" ||  type == "woodHorizontalPlane"){
			this.rady = HORIZONTAL_PANE_SMALL_RADIUS;
			this.radz =  HORIZONTAL_PANE_BIG_RADIUS;
		} else if(type == "pig" ||  type == "pigHelmet"){  
			this.scale = scale;
			this.rady = scale/3;
			this.radz = this.rady;
		} else if(type == "pigMustache"){
			this.scale = scale;
			this.rady = scale/3;
			this.radz = scale/3;	
		}else{
			this.rady = STRUCTURE_OBJ_RADIUS;
			this.radz = STRUCTURE_OBJ_RADIUS;
		}
	}

	collides(){
		let useless;
		structureObjs.forEach(function(obj) {
			if(obj.ty > this.ty + this.rady || this.vy > obj.ty + obj.rady || obj.tz > this.tz + this.radz || this.tz > obj.tz + obj.radz )
				useless = 0;
			else{
				let elasticCoefficient = 0.4;
				let thisVzFinal = this.vz * elasticCoefficient;
				let thisVyFinal = this.vy * elasticCoefficient;
			
				obj.vz = (this.m * this.vz + obj.m * obj.vz - this.m * thisVzFinal) / obj.m;
				obj.vy = (this.m * this.vy + obj.m * obj.vy - this.m * thisVyFinal) / obj.m;
			
				this.vz = thisVzFinal;
				this.vy = thisVyFinal;
				obj.startMovement();
		}
	});
	}

	startMovement(){
		while(this.vx >= 0.001 || this.vy >= 0.001){
			this.vy = this.vy - (g*TICK*TICK /2);
			this.ty = this.ty + this.vy * TICK;
			this.tz = this.vz * TICK;
			worldPositions[this.index] = utils.MakeWorld(this.tx , this.ty, this.tz, this.rx, this.ry, this.rz, this.scale);
			this.collides();
		}
		this.vx = 0;
		this.vy = 0;
	}
}
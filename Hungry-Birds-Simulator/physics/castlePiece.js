// JavaScript source code
class structureObjects {
	constructor(tx, ty, tz, rx, ry, rz, type, index){
		this.tx = tx;
		this.ty = ty;
		this.tz = tz;
		this.rx = rx;
		this.ry = ry;
		this.rz = rz;
		this.vz = 0;
		this.vy = 0;
		this.index = index;
		this.type = type;
		this.isColliding = false;
		this.isStable = true;

		if(type == "glassVerticalPlane" ||  type == "woodVerticalPlane"){
			this.rady = STRUCTURE_OBJ_RADIUS;
			this.radz = SMALLER_OBJ_RADIUS;
		}
		else if(type == "glassHorizontalPlane" ||  type == "woodHorizontalPlane"){
			this.rady = SMALLER_OBJ_RADIUS;
			this.radz =  STRUCTURE_OBJ_RADIUS;
		}
		else{
			this.rady = STRUCTURE_OBJ_RADIUS;
			this.radz = SMALLER_OBJ_RADIUS;
		}
	}
}
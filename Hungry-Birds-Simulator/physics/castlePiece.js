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
		this.hp = 3;
		this.isColliding = false;
		this.isStable = true;
		this.isMoving = false;
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
		} else if(type == "rock1"){
			this.rady = VERTICAL_ROCK_1_RADIUS;
			this.radz = HORIZONTAL_ROCK_1_RADIUS;
		} else if(type == "rock2"){
			this.rady = VERTICAL_ROCK_2_RADIUS;
			this.radz = HORIZONTAL_ROCK_2_RADIUS;
		} else if(type == "egg"){
			this.scale = 0.0 //to be transformed in 0.5
			this.rady = 0.2;
			this.radz = 0.2;
		} else{
			this.rady = STRUCTURE_OBJ_RADIUS;
			this.radz = STRUCTURE_OBJ_RADIUS;
		}
	}
}
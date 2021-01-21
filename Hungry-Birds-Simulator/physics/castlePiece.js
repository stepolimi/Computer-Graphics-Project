// JavaScript source code
class structureObjects {
	constructor(tx, ty, tz, rx, ry, rz, type, index, scale){
		this.tx = tx;
		this.ty = ty;
		this.tz = tz;
		this.rx = rx;
		this.ry = ry;
		this.rz = rz;
		this.vz = 0;
		this.vy = 0;
		this.scale = 0.2;
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
			this.rady = scale/2;
			this.radz = this.rady;
		} else if(type == "pigMustache"){
			this.scale = scale;
			this.rady = scale/2 + 0.1;
			this.radz = scale/2;	
		}else{
			this.rady = STRUCTURE_OBJ_RADIUS;
			this.radz = STRUCTURE_OBJ_RADIUS;
		}
	}
}
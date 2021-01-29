// JavaScript source code
class birdObject {
	constructor(tx, ty, tz, rx, ry, rz, type, m){
		this.tx = tx;
		this.ty = ty;
		this.tz = tz;
		this.rx = rx;
		this.ry = ry;
		this.rz = rz;
		this.vx = 0;
		this.vy = 0;
		this.vz = 0;
		this.m = m;
		this.radz = 0;
		this.rady = 0;
		this.type = type;
		this.isStable = false;
		this.isColliding = false;

		if(type == "red"){
			this.rady = 0.2;
			this.radz = 0.2;
		} else if(type == "chuck"){
			this.rady = 0.2;
			this.radz =  0.2;
		} else if(type == "bomb"){  
			this.rady = 0.25;
			this.radz = 0.25;
		} else if(type == "matilda"){
			this.rady = 0.3;
			this.radz = 0.25;	
		} else{
			this.rady = 0.2;
			this.radz = 0.2;
		}
	}
}
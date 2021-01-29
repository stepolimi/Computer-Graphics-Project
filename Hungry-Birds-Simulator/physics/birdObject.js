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
		this.type = type;
		this.isStable = false;
		this.isColliding = false;
	}
}
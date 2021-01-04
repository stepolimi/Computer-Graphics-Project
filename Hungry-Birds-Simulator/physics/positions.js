//world: z:-8 --> z: +8
//world: x:-4 --> x: +4
var envMatrix = utils.MakeWorld(0.0, -5.0 , 0.0, 0.0, 0.0, 0.0, 4.5);
var slingMatrix = utils.MakeWorld(0, -0.45 , -7.0, 0.0, 0.0, 0.0, 0.15);
var tntMatrix = utils.MakeWorld(0, 4.0 , 0.0, 0.0, 0.0, 0.0, 1);
var redMatrix = utils.MakeWorld(0.0, 1.5 , -7.0, 0.0, 0.0, 0.0, 0.5);		//bird 1
var chuckMatrix = utils.MakeWorld(0.0, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);		//bird 2
var bombMatrix = utils.MakeWorld(-1.0, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);		//bird 3
var matildaMatrix = utils.MakeWorld(-2.0, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);	//bird 4
var matilda2Matrix = utils.MakeWorld(-3.0, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);	//bird 5
var pigMatrix = utils.MakeWorld(-2.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 1);
var	pigHelmetmatrix = utils.MakeWorld(-4.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 1);
var pigMustacheMatrix = utils.MakeWorld(-6.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 1);


var worldPositions = [
	envMatrix,
	slingMatrix,
	tntMatrix,
	redMatrix,
	chuckMatrix,
	bombMatrix,
	matildaMatrix,
	matilda2Matrix,
	pigMatrix,
	pigHelmetmatrix,
	pigMustacheMatrix
];
//world: z:-8 --> z: +8
var envMatrix = utils.MakeWorld(0.0, -5.0 , 0.0, 0.0, 0.0, 0.0, 4.5);
var slingMatrix = utils.MakeWorld(0, -0.45 , -5.0, 0.0, 0.0, 0.0, 0.15);
vat tntMatrix = utils.MakeWorld(0, 4.0 , 0.0, 0.0, 0.0, 0.0, 1);
var redMatrix = utils.MakeWorld(0.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 1);
var chuckMatrix = utils.MakeWorld(2.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 1);
var bombMatrix = utils.MakeWorld(4.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 1);
var matildaMatrix = utils.MakeWorld(6.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 1);
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
	pigMatrix,
	pigHelmetmatrix,
	pigMustacheMatrix
];
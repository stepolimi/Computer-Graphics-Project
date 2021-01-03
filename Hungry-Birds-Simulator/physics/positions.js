//world: z:-8 --> z: +8
var envMatrix = utils.MakeWorld(0.0, -5.0 , 0.0, 0.0, 0.0, 0.0, 4.5);
var slingMatrix = utils.MakeWorld(0, -0.45 , -5.0, 0.0, 0.0, 0.0, 0.15);
var redMatrix = utils.MakeWorld(0.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 1);

var worldPositions = [
	envMatrix,
	slingMatrix,
	redMatrix
];
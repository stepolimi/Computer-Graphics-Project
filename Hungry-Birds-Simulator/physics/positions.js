//world: z:-8 --> z: +8
//world: x:-4 --> x: +4
var envMatrix = utils.MakeWorld(0.0, -5.0 , 0.0, 0.0, 0.0, 0.0, 4.5);
var slingMatrix = utils.MakeWorld(0, -0.45 , -7.0, 0.0, 0.0, 0.0, 0.15);
var bird1 = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
var bird2 = utils.MakeWorld(-0.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);
var bird3 = utils.MakeWorld(-1.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);	
var bird4 = utils.MakeWorld(-2.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);	
var bird5 = utils.MakeWorld(-3.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);	
var pig1 = utils.MakeWorld(0.0, 0.0 , 2.0, 0.0, 0.0, 0.0, 1);
var	pig2 = utils.MakeWorld(0.0, 0.0 , 4.0, 0.0, 0.0, 0.0, 1);
var pig3 = utils.MakeWorld(0.0, 1.4 , 3.0, 0.0, 0.0, 0.0, 1);
var tower11 = utils.MakeWorld(0.0, 0.0 , 1.0, 0.0, 0.0, 0.0, 0.2);
var tower12 = utils.MakeWorld(0.0, 0.7 , 1.0, 0.0, 0.0, 0.0, 0.2);
var tower13 = utils.MakeWorld(0.0, 1.4 , 1.0, 0.0, 0.0, 0.0, 0.2);
var tower14 = utils.MakeWorld(0.0, 2.1 , 1.0, 0.0, 0.0, 0.0, 0.2);
var tower21 = utils.MakeWorld(0.0, 0.0 , 3.0, 0.0, 0.0, 0.0, 0.2);
var tower22 = utils.MakeWorld(0.0, 0.7 , 3.0, 0.0, 0.0, 0.0, 0.2);
var tower31 = utils.MakeWorld(0.0, 0.0 , 5.0, 0.0, 0.0, 0.0, 0.2);
var tower32 = utils.MakeWorld(0.0, 0.7 , 5.0, 0.0, 0.0, 0.0, 0.2);


var worldPositions = [
	envMatrix,
	slingMatrix,
	bird1,
	bird2,
	bird3,
	bird4,
	bird5,
	pig1,
	pig2,
	pig3,
	tower11,
	tower12,
	tower13,
	tower14,
	tower21,
	tower22,
	tower31,
	tower32
];
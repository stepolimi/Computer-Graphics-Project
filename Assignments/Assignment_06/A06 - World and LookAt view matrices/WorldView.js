function worldViewProjection(carx, cary, carz, cardir, camx, camy, camz) {
// Computes the world, view and projection matrices for the game.

// carx, cary and carz encodes the position of the car.
// Since the game is basically in 2D, camdir contains the rotation about the y-axis to orient the car

// The camera is placed at position camx, camy and camz. The view matrix should be computed using the
// LookAt camera matrix procedure, with the correct up-vector.

	
	// View matrix

	var car = [carx, cary, carz];
	var cam = [camx, camy, camz];
	var uy = [0,1,0];

	var cc = [cam[0]-car[0], cam[1]-car[1], cam[2]- car[2]];
	var vz = utils.normalizeVector3(cc);
	var vxx = utils.crossVector(uy, vz);
	var vx = utils.normalizeVector3(vxx);
	var vy = utils.crossVector(vz, vx);
	
	var view  =    [vx[0],  vx[1],  vx[2],  -vx[0]*cam[0]-vx[1]*cam[1]-vx[2]*cam[2], 
			vy[0],  vy[1],  vy[2],  -vy[0]*cam[0]-vy[1]*cam[1]-vy[2]*cam[2], 
			vz[0],  vz[1],  vz[2],  -vz[0]*cam[0]-vz[1]*cam[1]-vz[2]*cam[2], 
			0,  	0,  	0,  	1];


	//World matrix

	var rot = utils.MakeRotateYMatrix(cardir);
	var transl = utils.MakeTranslateMatrix(carx,cary,carz);
	
	var world = utils.multiplyMatrices(transl,rot);


	return [world, view];
}


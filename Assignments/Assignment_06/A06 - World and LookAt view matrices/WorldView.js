function worldViewProjection(carx, cary, carz, cardir, camx, camy, camz) {
// Computes the world, view and projection matrices for the game.

// carx, cary and carz encodes the position of the car.
// Since the game is basically in 2D, camdir contains the rotation about the y-axis to orient the car

// The camera is placed at position camx, camy and camz. The view matrix should be computed using the
// LookAt camera matrix procedure, with the correct up-vector.

	var world = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
	var view  = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

	return [world, view];
}



function view(cx, cy, cz, alpha, beta, rho) {

	// Create a view matrix for a camera in position cx, cy and cz, looking in the direction specified by
	// alpha, beta and rho, as outlined in the course slides.

	/*To solve this assignment part we used the following formula:
		out = Rz(−ρ)⋅ Rx(−β)⋅ Ry(−α)⋅ T(−cx,−cy,−cz)
		where
		1) Rz(−ρ) is the rotation around z-axis
		2) Rx(−β) is the rotation around x-axis
		3) Ry(−α) is the rotation around y-axis
		4) T(−cx,−cy,−cz)  is the translate matrix 
	*/
	
	var out =  [1.0,	0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,	    1.0,
			   0.0,		0.0,		0.0,		1.0];

	var translate = utils.MakeTranslateMatrix(-cx,-cy,-cz);
	var rotAlpha = utils.MakeRotateYMatrix(-alpha);
	var rotBeta = utils.MakeRotateXMatrix(-beta);
	var rotRho = utils.MakeRotateZMatrix(-rho);
	var trA = utils.multiplyMatrices(rotAlpha,translate);
	var trArB = utils.multiplyMatrices(rotBeta,trA);
	var trArBrR = utils.multiplyMatrices(rotRho,trArB);


	return utils.multiplyMatrices(trArBrR, out);


}


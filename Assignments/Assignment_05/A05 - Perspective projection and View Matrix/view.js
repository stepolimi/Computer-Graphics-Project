
function view(cx, cy, cz, alpha, beta, rho) {

	// Create a view matrix for a camera in position cx, cy and cz, looking in the direction specified by
	// alpha, beta and rho, as outlined in the course slides.
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


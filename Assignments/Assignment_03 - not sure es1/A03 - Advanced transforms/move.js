function move() {
	// Rotate 45 degrees around an arbitrary axis passing through (1,0,-1). The x-axis can be aligned to the arbitrary axis after a rotation of 30 degrees around the z-axis, and then -60 degrees around the y-axis.
	var R1 =[1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var transl = utils.MakeTranslateMatrix(1,0,-1);
	var z30deg = utils.MakeRotateZMatrix(30);
	var y60deg = utils.MakeRotateYMatrix(-60);
	var x45deg = utils.MakeRotateXMatrix(45);
	var invy60deg = utils.invertMatrix(y60deg);
	var invz30deg = utils.invertMatrix(z30deg);
	var invTransl = utils.invertMatrix(transl);

	var iTiZ = utils.multiplyMatrices(invz30deg, invTransl);
	var iTiZiY = utils.multiplyMatrices(invy60deg, iTiZ);
	var iTiZiYX = utils.multiplyMatrices(x45deg, iTiZiY);
	var iTiZiYXY = utils.multiplyMatrices(y60deg, iTiZiYX);
	var iTiZiYXYZ = utils.multiplyMatrices(z30deg, iTiZiYXY);
	var iTiZiYXYZT = utils.multiplyMatrices(transl, iTiZiYXYZ);

	var R1 = iTiZiYXYZT ;
	

//	var invyz = utils.multiplyMatrices(invy60deg,invz30deg);
//	var invyzx = utils.multiplyMatrices(x45deg,invyz);
//	var invyzxy = utils.multiplyMatrices(y60deg, invyzx);
//	var invyzxyz = utils.multiplyMatrices(z30deg, invyzxy);

//	R1 = invyzxyz;

//	var tz = utils.multiplyMatrices(transl, z30deg);
//	var tzy = utils.multiplyMatrices(tz,y60deg);
//	var tzyx = utils.multiplyMatrices(tzy, x45deg);
//	var tzyxiY = utils.multiplyMatrices(tzyx, invy60deg);
//	var tzyxiYiZ = utils.multiplyMatrices(tzyxiY, invz30deg);
//	var tzyxiYiZiT = utils.multiplyMatrices(tzyxiYiZ, invTransl);

//	R1 = tzyxiYiZiT;

//	var iTiZ = utils.multiplyMatrices(invTransl,invz30deg);
//	var iTiZiY = utils.multiplyMatrices(iTiZ,invy60deg);
//	var iTiZiYx = utils.multiplyMatrices(iTiZiY, x45deg);
//	var iTiZiYxy = utils.multiplyMatrices(iTiZiYx, y60deg);
//	var iTiZiYxyz = utils.multiplyMatrices(iTiZiYxy, z30deg);
//	var iTiZiYxyzt = utils.multiplyMatrices(iTiZiYxyz, transl);
//
//	R1 = iTiZiYxyzt;



					   
	// Half the size of an object, using as fixed point (5,0,-2)
	var S1 = [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var transl2 = utils.MakeTranslateMatrix(5,0,-2);
	var scal = utils.MakeScaleMatrix(0.5);
	var invTransl2 = utils.invertMatrix(transl2);

	var iTs = utils.multiplyMatrices(scal,invTransl2);
	var iTst = utils.multiplyMatrices(transl2,iTs);

	S1 = iTst;

	
	
			   
	// Mirror the starship along a plane passing through (1,1,1), and obtained rotating 15 degree around the x axis the xz plane
	var S2 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var transl3 = utils.MakeTranslateMatrix(1,1,1);
	var x15deg = utils.MakeRotateXMatrix(15);
	var scal1 = utils.MakeScaleNuMatrix(1, -1, 1);
	var invx15deg = utils.invertMatrix(x15deg);
	var invTransl3 = utils.invertMatrix(transl3);

	var iTiX = utils.multiplyMatrices(invx15deg,invTransl3);
	var iTiXs = utils.multiplyMatrices(scal1,iTiX);
	var iTiXsx = utils.multiplyMatrices(x15deg,iTiXs);
	var iTiXsxt = utils.multiplyMatrices(transl3,iTiXsx);

	S2 = iTiXsxt;

			   
	// Apply the inverse of the following sequence of transforms: Translation of (0, 0, 5) then rotation of 30 degree around the Y axis, and finally a uniform scaling of a factor of 3.
	var I1 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var transl4 = utils.MakeTranslateMatrix(0,0,5);
	var y30deg = utils.MakeRotateYMatrix(30);
	var scal2 = utils.MakeScaleMatrix(3);
	var invTransl4 = utils.invertMatrix(transl4);
	var invy30deg = utils.invertMatrix(y30deg);
	var invScal2 = utils.invertMatrix(scal2);

	var iTiY = utils.multiplyMatrices(invTransl4,invy30deg);
	var iTiYiS = utils.multiplyMatrices(iTiY,invScal2);

	I1 = iTiYiS;

	return [R1, S1, S2, I1];
}


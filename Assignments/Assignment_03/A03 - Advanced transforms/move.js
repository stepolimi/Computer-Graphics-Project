function move() {
	// Rotate 45 degrees around an arbitrary axis passing through (1,0,-1). The x-axis can be aligned to the arbitrary axis after a rotation of 30 degrees around the z-axis, and then -60 degrees around the y-axis.
	
	/*To solve this assignment we used the following composite transformation formula:
		p' = T(px, py, pz)⋅ Ry(β)⋅ Rz(γ)⋅ Rx(α)⋅ Rz(γ)^−1 ⋅ Ry(β)^−1 ⋅T(px, py, pz)^−1
		where
		1) T(px, py, pz) is the translate matrix in (1,0,-1)
		2) Ry(β) represents the rotation of -60° around y-axis
		3) Rz(γ) represents the rotation of 30° around z-axis
		4) Rx(α) represents the rotation of 45° around x-axis
		All the others are the previous matrices but inverted
	*/
	
	var transl = utils.MakeTranslateMatrix(1.0,0.0,-1.0);
	var y60deg = utils.MakeRotateYMatrix(-60);
	var z30deg = utils.MakeRotateZMatrix(30);
	var x45deg = utils.MakeRotateXMatrix(45);
	var invy60deg = utils.invertMatrix(y60deg);
	var invz30deg = utils.invertMatrix(z30deg);
	var invTransl = utils.invertMatrix(transl);

	var TY = utils.multiplyMatrices(transl, y60deg);
	var TYZ = utils.multiplyMatrices(TY, z30deg);
	var TYZX = utils.multiplyMatrices(TYZ, x45deg);
	var TYZXiZ = utils.multiplyMatrices(TYZX, invz30deg);
	var TYZXiZiY = utils.multiplyMatrices(TYZXiZ, invy60deg);
	var TYZXiZiYiT = utils.multiplyMatrices(TYZXiZiY, invTransl);

	var R1 = TYZXiZiYiT;


					   
	// Half the size of an object, using as fixed point (5,0,-2)
	/*To solve this exercise we used the following composite transformation formula:
		p' = T(px, py, pz)⋅ S(s)⋅ T(px, py, pz)^−1 
		where
		1) T(px, py, pz) is the translate matrix in (5,0,-2)
		2) S(s) is the scaled matrix with all s = 0.5
	*/

	var transl2 = utils.MakeTranslateMatrix(5,0,-2);
	var scal = utils.MakeScaleMatrix(0.5);
	var invTransl2 = utils.invertMatrix(transl2);

	var iTs = utils.multiplyMatrices(scal,invTransl2);
	var iTst = utils.multiplyMatrices(transl2,iTs);

	S1 = iTst;
	
	
			   
	// Mirror the starship along a plane passing through (1,1,1), and obtained rotating 15 degree around the x axis the xz plane
	/*To solve this exercise we used the following composite transformation formula:
		p' = T(px, py, pz)⋅ Rx(α)⋅ S(sx, sy, sz)⋅ Rx(α)^−1⋅ T(px, py, pz)^−1
		where
		1) T(px, py, pz) is the translate matrix in (1,1,1)
		2) Rx(α) represents the rotation of 15° around x-axis
		3) S(sx, sy, sz) is the non uniform scale matrix with values (1, -1, 1)
		All the others are the previous matrices but inverted.
	*/

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
	/*To solve this exercise we used the following composite transformation formula:
		p' = T(px, py, pz)^-1⋅ Ry(α)^-1⋅ S(s)^-1
		where
		1) T(px, py, pz)^-1 is the inverse of translate matrix in (0,0,5)
		2) Ry(α)^-1 represents the inverse of the rotation of 30° around y-axis
		3) S(s) is the inverse of scale matrix with values all equal to 3
	*/

	var invTransl4 = utils.invertMatrix(utils.MakeTranslateMatrix(0,0,5));
	var invy30deg = utils.invertMatrix(utils.MakeRotateYMatrix(30));
	var invScal2 = utils.invertMatrix(utils.MakeScaleMatrix(3));

	var iTiY = utils.multiplyMatrices(invTransl4,invy30deg);
	var iTiYiS = utils.multiplyMatrices(iTiY,invScal2);

	I1 = iTiYiS;

	return [R1, S1, S2, I1];
}


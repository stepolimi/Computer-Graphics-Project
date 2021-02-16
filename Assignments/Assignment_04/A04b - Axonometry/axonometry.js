var projection = {
	/*To solve the first 3 exercises we used the following formula:
		p' = Port(w, a, n, f)⋅ Ry(β)⋅ Rx(α)
		where
		1) Port(w, a, n, f) is the ortogonal matrix in (50, 16/9, 1, 101)
		2) Ry(β) represents the rotation around y-axis
		3) Rx(α) represents the rotation around x-axis

	  It can be used for all axonomtry, what changes are just the angles values.

	  For Isometric projections: rotation around y = +-45°, rotation around x = +-35.26°
	  For Dimetric projections: rotation around y = +-45°, rotation around x = arbitrary
	  For Trimetric projections: rotation around y = arbitrary, rotation around x = arbitrary
	*/
	
	axonometry: function(x, y){
		var a = 16/9;
		var w = 50;
		var f = 101;
		var n = 1;
		var orto = utils.MakeParallel(w, a, n, f);

		var ydeg = utils.MakeRotateYMatrix(y);
		var xdeg = utils.MakeRotateXMatrix(x);
		   
		var OrtX = utils.multiplyMatrices(orto, xdeg);
		var OrtXY = utils.multiplyMatrices(OrtX, ydeg);

		return OrtXY;
		   
	},


	/*To solve the last 2 exercises we used the following formula:
		p' = Port(w, a, n, f)⋅ Hz(hx,hy)
		where
		1) Port(w, a, n, f) is the ortogonal matrix in (50, 16/9, 1, 101)
		2) Hz(hx,hy) is the shear matrix with hx = -pcos(a) and hz= -psin(a)

	  It can be used for both cavalier and cabinet projections , what changes are just the angle and p.

	  For Cavalier projections: rotation around z = arbitrary, reduction factor p = 1
	  For Cabinet projections: rotation around z = arbitrary, reduction factor p = 0.5
	*/
	oblique: function(z, p){
		var a = 16/9;
		var w = 50;
		var f = 101;
		var n = 1;
		var angle = utils.degToRad(z)

		var orto = utils.MakeParallel(w, a, n, f);
		var shear =utils.MakeShearZMatrix(-p*Math.cos(angle), -p*Math.sin(angle));


		return utils.multiplyMatrices(orto, shear);
	}
}

function axonometry() {
	
	// Make an isometric view, w = 50, a = 16/9, n = 1, f = 101.

	var A1 = projection.axonometry(35.26, 45);
	

	// Make a dimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated 20 around the x-axis
	var A2 = projection.axonometry(20, 45);
			   
	// Make a trimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated -30 around the x-axis and 30 around the y-axis
	var A3 = projection.axonometry(-30, 30);
	   
			   
	// Make an cavalier projection view, w = 50, a = 16/9, n = 1, f = 101, at 45 degrees
	var O1 =  projection.oblique(45, 1);

	// Make a cabinet projection view, w = 50, a = 16/9, n = 1, f = 101, at 60 degrees
	var O2 =  projection.oblique(60, 0.5);

	return [A1, A2, A3, O1, O2];
}
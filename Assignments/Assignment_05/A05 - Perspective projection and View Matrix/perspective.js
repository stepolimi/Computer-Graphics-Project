function perspective(w, h, fov) {
	var a = w/h;
	var oneOne = 1/(a * Math.tan(utils.degToRad(fov/2)));
	var twoTwo = 1/(Math.tan(utils.degToRad(fov/2)));
	var threeThree = (100+0.1)/(0.1-100);
	var threeFour = (2*100*0.1)/(0.1-100);


	// Build a perspective projection matrix, for a viewport whose size is determined by parameters w (width) and h (height), and whose fov-y is passed in parameter fov. Near plane is n=0.1, and far plane f=100.
	var out = 	 [oneOne,	0.0,		0.0,		0.0,
			   0.0,		twoTwo,		0.0,		0.0,
			   0.0,		0.0,		threeThree,	threeFour,
			   0.0,		0.0,		-1.0,		0.0];

	return out;

}


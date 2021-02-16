function anim() {
	/*
		The animation is defined as a set of animation segment. Each segment is defined by 5 parameters:
			• The duration in seconds: time required to travel the path.
			• The starting point
			• The control point for the start
			• The control point for the end
			• The ending point
		Each point is defined by two information:
			• A three component vector representing the position of the starship
			• A quaternion representing its orientation
	*/
	return [
			[2, [0,0,0],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(-20)),
				[3,0,1],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(0)),
				[4,0,2], 	  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90)),
				[5,0,3],	 Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90)),],
				
			[2, [5,0,2],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90)),
				[6,0,-4],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(120)),
				[7,0,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(150)),
				[8,0.5,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(50)),],
				
			[2, [8,0.5,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(150)),
				[8,1,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180)),
				[8,3,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180)),
				[8,6,-8],  Quaternion.fromAxisAngle([1,0,0],utils.degToRad(180)),],
					
			[2, [8,6,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180)),
				[7,7,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180)),
				[6,8,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270)),
				[5,8,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180))],
				
			[2, [5,8,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270)),
				[5,8,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(300)),
				[0,8,0],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(0)),
				[0,8,0],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(-90))],
				
			[2, [0,8,0],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(0)),
				[0,8,0],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(0)),
				[0,0,0],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(-10)),
				[0,0,0],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(-180))]
			
	];
}
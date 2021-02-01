function anim() {
	return [
			[2, [0,0,0],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(-20)),
				[2,0,0],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(0)),
				[3,0,0], 	  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(60)),
				[6,0,0],	 Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90)),],
					
			[2, [6,0,0],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(60)),
				[6,0,-2],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(130)),
				[7,0,-6],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(150)),
				[8,0.5,-6],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(50)),],
				
			[2, [8,0.5,-6],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(150)),
				[8,1,-6],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180)),
				[8,3,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180)),
				[8,6,-8],  Quaternion.fromAxisAngle([1,0,0],utils.degToRad(180)),],
					
			[2, [8,6,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180)),
				[6,7,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180)),
				[4,8,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270)),
				[0,8,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180))],
				
			[2, [0,8,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270)),
				[0,8,-8],  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(300)),
				[0,8,0],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(0)),
				[0,8,0],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(-90))],
				
			[2, [0,8,0],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(0)),
				[0,8,0],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(0)),
				[0,0,0],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(-10)),
				[0,0,0],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(-180))
			]

	];
}


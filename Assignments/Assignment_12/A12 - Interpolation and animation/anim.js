function anim() {
	return [
 [2, [0,0,0],   Quaternion.fromAxisAngle([1,0,0],utils.degToRad(0)),
 	 [0,0,0],   Quaternion.fromAxisAngle([1,0,0],utils.degToRad(0)),
 	 [8,0,0],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90)),
 	 [8,0,0],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90))],
 [2, [8,0,0],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90)),
	 [8,0,0],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90)),
 	 [8,0,-8],  Quaternion.fromAxisAngle([0,0,1],utils.degToRad(90)),
 	 [8,0,-8],  Quaternion.fromAxisAngle([0,0,1],utils.degToRad(90))],
 [2, [8,0,-8],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(90)),
	 [8,0,-8],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(90)),
 	 [8,8,-8],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180)),
 	 [8,8,-8],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180))],
 [2, [8,8,-8],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180)),
	 [8,8,-8],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180)),
 	 [0,8,-8],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270)),
 	 [0,8,-8],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270))],
 [2, [0,8,-8],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270)),
	 [0,8,-8],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270)),
 	 [0,0,-8],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(-90)),
 	 [0,0,-8],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(-90))],
 [2, [0,0,-8],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(-90)),
	 [0,0,-8],   Quaternion.fromAxisAngle([0,0,1],utils.degToRad(-90)),
 	 [0,0,0],   Quaternion.fromAxisAngle([1,0,0],utils.degToRad(0)),
 	 [0,0,0],   Quaternion.fromAxisAngle([1,0,0],utils.degToRad(0))]
];
}


// these global variables are used to contain the current angles of the world
// HERE YOU WILL HAVE TO ADD ONE OR MORE GLOBAL VARIABLES TO CONTAIN THE ORIENTATION
// OF THE OBJECT

// this function returns the world matrix with the updated rotations.
// parameters rvx, rvy and rvz contains a value in the -1 .. +1 range that tells the angular velocity of the world.

/*global variable: 
  this variable is used to store the previous quaternion and it uses the Quaternion.js library shared with th assignment.
  Since the constructor doesn't have parameters the 1st value of prevAngle will be equale to 1 + 0i + 0j + 0k
*/
var prevAngle = new Quaternion(); 


function updateWorld(rvx, rvy, rvz) {
	//transform the 3 angle inputs from deg to rad by using the utils function
	var rx = utils.degToRad(rvx);
	var ry = utils.degToRad(rvy);
	var rz = utils.degToRad(rvz);


	/*
	To evaluate the quaternion of given angles I have to use the previous constructor but with 4 parameters obtained by using the formula 
	q = cos(theta/2) + sin(theta/2)(ix + jy + kz). According to the formula, parameters are:
		1. cos(angle/2)  --> the real part of quaternion is given by the cos of half of the angle
		2. if i'm calculating the quaternion of an angle on x axis the second parameter will be sin(angle/2) otherwise it will be equal to 0
		3. if i'm calculating the quaternion of an angle on y axis the third parameter will be sin(angle/2) otherwise it will be equal to 0
		4. if i'm calculating the quaternion of an angle on z axis the fourth parameter will be sin(angle/2) otherwise it will be equal to 0

	*/ 
	var rxQuaternion = new Quaternion(Math.cos(rx/2), Math.sin(rx/2), 0, 0);
	var ryQuaternion = new Quaternion(Math.cos(ry/2), 0, Math.sin(ry/2), 0);
	var rzQuaternion = new Quaternion(Math.cos(rz/2), 0, 0, Math.sin(rz/2));
	
	/*
	The current angle is given by the multiplication of the 3 quternions as expressed in formula 
	R = Rx(rx)Ry(ry)Rz(rz) = (cos(rx/2) + i*sin(rx/2) +0j + 0k)*(cos(ry/2) + 0i + j*sin(ry/2) + 0k)*(cos(rz/2) + 0i + 0j + k*sin(ry/2))
	but in order to make it change with time it is necessary to multiply also the previous angle
	*/
	var currentAngle = rxQuaternion.mul(ryQuaternion).mul(rzQuaternion).mul(prevAngle);
	prevAngle = currentAngle;
	
	return currentAngle.toMatrix4();
}

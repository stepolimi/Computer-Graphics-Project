function buildGeometry() {
	var i;
	
	// Draws a Cone --- Already done, just for inspiration
	///// Creates vertices
	var vert1 = [[0.0, 1.0, 0.0]];
	for(i = 0; i < 36; i++) {
		vert1[i+1] = [Math.sin(i*10.0/180.0*Math.PI), -1.0, Math.cos(i*10.0/180.0*Math.PI)];
	}
	vert1[37] = [0.0, -1.0, 0.0]
	////// Creates indices
	var ind1 = [];
	//////// Upper part
	j = 0;
	for(i = 0; i < 36; i++) {
		ind1[j++] = 0;
		ind1[j++] = i + 1;
		ind1[j++] = (i + 1) % 36 + 1;
	}
	//////// Lower part
	for(i = 0; i < 36; i++) {
		ind1[j++] = 37;
		ind1[j++] = (i + 1) % 36 + 1;
		ind1[j++] = i + 1;
	}
	
	var color1 = [1.0, 0.0, 0.0];
	addMesh(vert1, ind1, color1);






	// Draws a Cylinder -- To do for the assignment.
	var vert2 = [[0.0, 1.0, 0.0]];
	for(i = 0; i < 36; i++) {
		vert2[i+1] = [Math.sin(i*10.0/180.0*Math.PI), 1.0, Math.cos(i*10.0/180.0*Math.PI)];
	}
	
	var offset = 37;
	
	vert2[37] = [0.0, -1.0, 0.0]
	for(i = 0; i < 36; i++) {
		vert2[offset+i+1] = [Math.sin(i*10.0/180.0*Math.PI), -1.0, Math.cos(i*10.0/180.0*Math.PI)];
	}
	
	////// Creates indices
	var ind2 = [];
	
	j = 0;
	//////// Side part
	for(i = 1; i < 36; i++) {
		ind2[j++] = i;
		ind2[j++] = offset + i;
		ind2[j++] = offset + i % 36 + 1;
		
		ind2[j++] = offset + i % 36 + 1;
		ind2[j++] = i + 1;
		ind2[j++] = i;
	}
	ind2[j++] = 36;
	ind2[j++] = offset + 36;
	ind2[j++] = offset + 1;

	ind2[j++] = offset + 1;
	ind2[j++] = 1;
	ind2[j++] = 36;
	
	//////// Upper part
	for(i = 0; i < 36; i++) {
		ind2[j++] = 0;
		ind2[j++] = (i + 1) % 36 + 1;
		ind2[j++] = i + 1;
	}
	
	//////// Lower part
	for(i = offset; i < offset+36; i++) {
		ind2[j++] = 37;
		ind2[j++] = offset + ((i + 1)-offset) % 36 + 1;
		ind2[j++] = i + 1;
	}
	
	var color2 = [0.0, 0.0, 1.0];
	addMesh(vert2, ind2, color2);






	// Draws a Sphere --- Already done, just for inspiration
	var vert3 = [[0.0, 1.0,0.0]];
	///// Creates vertices
	k = 1;
	for(j = 1; j < 18; j++) {
		for(i = 0; i < 36; i++) {
			x = Math.sin(i*10.0/180.0*Math.PI) * Math.sin(j*10.0/180.0*Math.PI);
			y = Math.cos(j*10.0/180.0*Math.PI);
			z = Math.cos(i*10.0/180.0*Math.PI) * Math.sin(j*10.0/180.0*Math.PI);
			vert3[k++] = [x, y, z];
		}
	}
	vert3[k++] = [0.0,-1.0,0.0];
	
	////// Creates indices
	var ind3 = [];
	k = 0;
	///////// Lateral part
	for(i = 0; i < 36; i++) {
		for(j = 1; j < 17; j++) {
			ind3[k++] = i + (j-1) * 36 + 1;
			ind3[k++] = i + j * 36 + 1;
			ind3[k++] = (i + 1) % 36 + (j-1) * 36 + 1;

			ind3[k++] = (i + 1) % 36 + (j-1) * 36 + 1;
			ind3[k++] = i + j * 36 + 1;
			ind3[k++] = (i + 1) % 36 + j * 36 + 1;
		}
	}	
	//////// Upper Cap
	for(i = 0; i < 36; i++) {
		ind3[k++] = 0;
		ind3[k++] = i + 1;
		ind3[k++] = (i + 1) % 36 + 1;
	}
	//////// Lower Cap
	for(i = 0; i < 36; i++) {
		ind3[k++] = 577;
		ind3[k++] = (i + 1) % 36 + 540;
		ind3[k++] = i + 540;
	}
	
	var color3 = [0.0, 1.0, 0.0];
	addMesh(vert3, ind3, color3);
	
	
	
	
	
	// Draws a Torus -- To do for the assignment
	var vert4 = [];
	///// Creates vertices
	k = 0;
	for(j = 0; j < 37; j++) {
		for(i = 0; i < 36; i++) {
			x = (2 + Math.cos(i*10.0/180.0*Math.PI)) * Math.sin(j*10.0/180.0*Math.PI) *0.5;
			y = Math.sin(i*10.0/180.0*Math.PI) *0.5;
			z = (2 + Math.cos(i*10.0/180.0*Math.PI)) * Math.cos(j*10.0/180.0*Math.PI) *0.5;
			
			vert4[k++] = [x, y, z];
		}
	}
	
	////// Creates indices
	var ind4 = [];
	k = 0;
	///////// Lateral part
	for(i = 0; i < 35; i++) {
		for(j = 1; j < 36; j++) {
			ind4[k++] = i + (j-1) * 36 + 1;
			ind4[k++] = i + j * 36 + 1;
			ind4[k++] = (i + 1) % 36 + (j-1) * 36 + 1;

			ind4[k++] = (i + 1) % 36 + (j-1) * 36 + 1;
			ind4[k++] = i + j * 36 + 1;
			ind4[k++] = (i + 1) % 36 + j * 36 + 1;
		}
		ind4[k++] = i + (36-1) * 36 + 1;
		ind4[k++] = i + 0 * 36 + 1;
		ind4[k++] = (i + 1) % 36 + (36-1) * 36 + 1;
	
		ind4[k++] = (i + 1) % 36 + (36-1) * 36 + 1;
		ind4[k++] = i + 0 * 36 + 1;
		ind4[k++] = (i + 1) % 36 + 0 * 36 + 1;
	}	

	//////// Last cyrcle
	for(j = 0; j < 36; j++) {
		ind4[k++] = 35 + (j-1) * 36 + 1;
		ind4[k++] = 35 + j * 36 + 1;
		ind4[k++] = 0 % 36 + j * 36 + 1;
		
		ind4[k++] = 0 % 36 + j * 36 + 1;
		ind4[k++] = 35 + j * 36 + 1;
		ind4[k++] = 0 % 36 + (j+1) * 36 + 1;
	}

	var color4 = [1.0, 1.0, 0.0];
	addMesh(vert4, ind4, color4);
}


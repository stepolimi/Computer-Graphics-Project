function buildGeometry() {
	var i;
	
	/* Draws a cube with the mesh encoding "triangle list". 
		Triangle lists do not exploit any sharing of vertices, and encode each triangle as a set of three different coordinates.
		This technique is tipically used to draw unconnected triangles.
	*/
	var vert1 = [[-1.0,-1.0,-1.0], [1.0,-1.0,-1.0], [-1.0,1.0,-1.0], 	
			[-1.0,1.0,-1.0], [1.0,1.0,-1.0], [1.0,-1.0,-1.0], 

			[-1.0,-1.0,1.0], [1.0,-1.0,1.0], [-1.0,1.0,1.0], 	
			[-1.0,1.0,1.0], [1.0,1.0,1.0], [1.0,-1.0,1.0], 
			
			[-1.0,-1.0,-1.0], [-1.0,-1.0,1.0], [-1.0,1.0,-1.0], 
			[-1.0,1.0,-1.0], [-1.0,1.0,1.0], [-1.0,-1.0,1.0], 

			[1.0,-1.0,-1.0], [1.0,-1.0,1.0], [1.0,1.0,-1.0], 
			[1.0,1.0,-1.0], [1.0,1.0,1.0], [1.0,-1.0,1.0], 

			[-1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [-1.0, 1.0, -1.0],
			[1.0, 1.0, 1.0], [1.0, 1.0, -1.0], [-1.0, 1.0, -1.0],

			[-1.0,-1.0, 1.0], [1.0,-1.0, 1.0], [-1.0, -1.0, -1.0],
			[1.0,-1.0, 1.0], [1.0,-1.0, -1.0], [-1.0, -1.0, -1.0]];

	addMesh(vert1, "L", [1.0, 0.0, 0.0]);


	/* Draws a flat L-shaped pattern with the mesh encoding "triangle strip".
		Triangle strips encode a set of adjacent triangles that define a band-like surface.
		The encoding begins by considering the first two vertices.
		Then each new vertex is connected to the previous two.
	*/
	var vert2 = [[-1.0,2.0,0.0], [0.0,2.0,0.0], [-1.0,0.0,0.0], [0.0,0.0,0.0],  [-1.0,-1.0,0.0], [1.0,-1.0,0.0], [0.0,0.0,0.0], [1.0,0.0,0.0]];

	addMesh(vert2, "S", [0.0, 0.0, 1.0]);

	/* Draws a flat hexagon with the mesh encoding "triangle fan".
		Triangle fans encode polygons where all the triangles share a common vertex.
		The first two vertices are specified independently.
		Then each new vertex connects both the previous one and the first of the list.
	*/
	var vert3 = [[0.0, -2.0, 0.0], [1.7,-1.0, 0.0], [1.7,1.0, 0.0], [0.0,2.0, 0.0], [-1.7,1.0, 0.0], [-1.7,-1.0, 0.0], [0.0, -2.0, 0.0]];

	addMesh(vert3, "F", [0.0, 1.0, 0.0]);
	
}


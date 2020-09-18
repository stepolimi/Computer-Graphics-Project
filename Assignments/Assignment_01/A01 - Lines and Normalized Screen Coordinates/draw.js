
function draw() {
	
	//to get the car in draw 8 lines are necessary
	line(0.3, 0.3,-0.2,0.3);
	line(-0.2,0.3,-0.2, 0.1);
	line(0.5,-0.3,-0.5,-0.3);
	line(-0.2,0.1,-0.5,0);
	line(-0.5,0,-0.5,-0.3);
	line(0.5,0,0.5,-0.3);
	line(0.3,0.1,0.5,0);
	line(0.3,0.3,0.3,0.1);
}

function draw2() {
	for(i = 0; i < 128; i++) {


		/*General structure: 
			coordinates of the limit points of the i-th side of a regular polygon with 128 sides are obtained by doing the sin and cos of the angle, which
			is given by 90° - the subangle of 90° covered by the i^th poligon side.
		*/
		curr_x = Math.cos(Math.PI / 2 - (i * Math.PI) / 128);
		curr_y = Math.sin(Math.PI / 2 - (i * Math.PI) / 128);		
		succ_x = Math.cos(Math.PI / 2 - ((i+1) * Math.PI) / 128);
		succ_y = Math.sin(Math.PI / 2 - ((i+1) * Math.PI) / 128);
		
		
		
		/* BASIC EXERCISE
			radius: 1
			circle center: (0,0)
		*/
		line(succ_x, succ_y, curr_x, curr_y);
		line(- succ_x, succ_y, - curr_x, curr_y);
		
		
		
		/* YIN_YANG EXERCISE
			external circle radius: 0.8
			external circle center: (0,0)
		*/
		line(succ_x * 0.8, succ_y * 0.8, curr_x * 0.8, curr_y * 0.8);
		line(- succ_x * 0.8, succ_y * 0.8, - curr_x * 0.8, curr_y * 0.8);


		// circle centered in 0,0.4 with ray = 0.1
		line(succ_x * 0.1, succ_y * 0.1 + 0.4, curr_x * 0.1, curr_y * 0.1 + 0.4);
		line(- succ_x * 0.1, succ_y * 0.1 + 0.4, - curr_x * 0.1, curr_y * 0.1 + 0.4);


		// circle centered in 0,-0,4 with ray = 0.1
		line(succ_x * 0.1, succ_y * 0.1 - 0.4, curr_x * 0.1, curr_y * 0.1 - 0.4);
		line(- succ_x * 0.1, succ_y * 0.1 - 0.4, - curr_x * 0.1, curr_y * 0.1 - 0.4);


		// half circle with positive xes centered in 0,0.4 with ray = 0.4
		line(succ_x * 0.4, succ_y * 0.4 + 0.4, curr_x * 0.4, curr_y * 0.4 + 0.4);


		// half circle with positive xes centered in 0,-0.4 with ray = 0.4
		line(- succ_x * 0.4, succ_y * 0.4 - 0.4, - curr_x * 0.4, curr_y * 0.4 - 0.4);
	}
}

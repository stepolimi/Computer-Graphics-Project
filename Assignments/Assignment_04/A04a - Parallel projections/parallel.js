function parallel() {
	// Build a parallel projection matrix, for a 16/9 viewport, with halfwidt w=40, near plane n=1, and far plane f=101.
	/*To solve this exercise we used the ortogonal martix. Given:
		f = 101
		n = 1
		w = 40
		a = 16/9

		Ww got:
		out[0] = 1.0 / w
		out[5] = a / w
		out[10] = -2.0 / (f-n)
		out[11] = -[(f+n) / (f-n)]
	*/
	var out = 	  [0.025,		0.0,		0.0,		0.0,
			   0.0,		0.044,		0.0,		0.0,
			   0.0,		0.0,		-0.02,		-1.02,
			   0.0,		0.0,		0.0,		1.0];



	return out;
}


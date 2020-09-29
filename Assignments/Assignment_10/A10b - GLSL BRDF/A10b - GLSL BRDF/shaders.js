function shaders() {
// The shader can find the required informations in the following variables:

//vec3 fs_pos;		// Position of the point in 3D space
//
//float SpecShine;		// specular coefficient for both Blinn and Phong
//float DToonTh;		// Threshold for diffuse in a toon shader
//float SToonTh;		// Threshold for specular in a toon shader
//
//vec4 diffColor;		// diffuse color
//vec4 ambColor;		// material ambient color
//vec4 specularColor;		// specular color
//vec4 emit;			// emitted color
//	
//vec3 normalVec;		// direction of the normal vecotr to the surface
//vec3 eyedirVec;		// looking direction
//
//
// Lighr directions can be found into:
//vec3 lightDirA;
//vec3 lightDirB;
//vec3 lightDirC;
//
//and intensity is returned into:
//
//vec4 lightColorA;
//vec4 lightColorB;
//vec4 lightColorC;
//
// Ambient light contribution can be found intop
//
// vec4 ambientLight;

// Lambert diffuse and Ambient material
var S1 = `
	vec4 LAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
	vec4 LBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
	vec4 LCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
	out_color = clamp(diffColor * (LAcontr + LBcontr + LCcontr) + ambientLight * ambColor, 0.0, 1.0);
`;

// Lambert diffuse and Blinn specular
var S2 = `
	vec4 dLAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
	vec4 dLBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
	vec4 dLCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
	vec4 diffuse = diffColor * (dLAcontr + dLBcontr + dLCcontr);

	vec4 sLAcontr = pow(clamp(dot(normalize(eyedirVec+lightDirA), normalVec),0.0,1.0), SpecShine) * lightColorA;
	vec4 sLBcontr = pow(clamp(dot(normalize(eyedirVec+lightDirB), normalVec),0.0,1.0), SpecShine) * lightColorB;
	vec4 sLCcontr = pow(clamp(dot(normalize(eyedirVec+lightDirC), normalVec),0.0,1.0), SpecShine) * lightColorC;
	vec4 specular = specularColor * (sLAcontr + sLBcontr + sLCcontr);
	out_color = clamp(diffuse + specular, 0.0, 1.0);
`;

// No diffuse, ambient and Blinn specular
var S3 = `
	vec4 sLAcontr = pow(clamp(dot(normalVec, normalize(lightDirA + eyedirVec)), 0.0, 1.0), SpecShine) * lightColorA;
	vec4 sLBcontr = pow(clamp(dot(normalVec, normalize(lightDirB + eyedirVec)), 0.0, 1.0), SpecShine) * lightColorB;
	vec4 sLCcontr = pow(clamp(dot(normalVec, normalize(lightDirC + eyedirVec)), 0.0, 1.0), SpecShine) * lightColorC;

	out_color = clamp(specularColor * (sLAcontr + sLBcontr + sLCcontr) + ambientLight * ambColor, 0.0, 1.0);
`;

// Diffuse and Phong specular
var S4 = `
	vec4 dLAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
	vec4 dLBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
	vec4 dLCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
	vec4 diffuse = diffColor * (dLAcontr + dLBcontr + dLCcontr);

	vec4 sLAcontr = pow(clamp(dot(eyedirVec, -reflect(lightDirA, normalVec)),0.0,1.0), SpecShine) * lightColorA;
	vec4 sLBcontr = pow(clamp(dot(eyedirVec, -reflect(lightDirB, normalVec)),0.0,1.0), SpecShine) * lightColorB;
	vec4 sLCcontr = pow(clamp(dot(eyedirVec, -reflect(lightDirC, normalVec)),0.0,1.0), SpecShine) * lightColorC;
	vec4 specular = specularColor * (sLAcontr + sLBcontr + sLCcontr);
	out_color = clamp(diffuse + specular, 0.0, 1.0);

`;

// Diffuse, ambient, emission and Phong specular
var S5 = `
	vec4 dLAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
	vec4 dLBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
	vec4 dLCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
	vec4 diffuse = diffColor * (dLAcontr + dLBcontr + dLCcontr);

	vec4 sLAcontr = pow(clamp(dot(eyedirVec, -reflect(lightDirA, normalVec)),0.0,1.0), SpecShine) * lightColorA;
	vec4 sLBcontr = pow(clamp(dot(eyedirVec, -reflect(lightDirB, normalVec)),0.0,1.0), SpecShine) * lightColorB;
	vec4 sLCcontr = pow(clamp(dot(eyedirVec, -reflect(lightDirC, normalVec)),0.0,1.0), SpecShine) * lightColorC;
	vec4 specular = specularColor * (sLAcontr + sLBcontr + sLCcontr);
	out_color = clamp(diffuse + specular + ambientLight * ambColor + emit, 0.0, 1.0);

`;

// Ambient + Oren-Nayar with roughness sigma=0.5 (consider only Light A)
var S6 = `	
	vec4 ambient = ambientLight * ambColor;

	float theta_i = radians(acos(dot(lightDirA, normalVec)));
	float theta_r = radians(acos(dot(eyedirVec, normalVec)));
	float alpha = max(theta_i, theta_r);
	float beta = min(theta_i, theta_r);

	float A = 1.0 - 0.5*((0.5*0.5)/(0.5*0.5+0.33));
	float B = 0.45*((0.5*0.5)/(0.5*0.5+0.09));

	vec3 v_i = normalize(lightDirA - dot(lightDirA,normalVec)*normalVec);
	vec3 v_r = normalize(eyedirVec - dot(eyedirVec,normalVec)*normalVec);
	float G = max(0.0, dot(v_i,v_r));
	
	vec4 L = diffColor * clamp(dot(lightDirA,normalVec), 0.0, 1.0);
	vec4 diffuse = L*(A+B*G*sin(alpha)*tan(beta));

	out_color = clamp(diffuse + ambient, 0.0, 1.0);
`;

	return [S1, S2, S3, S4, S5, S6];
}


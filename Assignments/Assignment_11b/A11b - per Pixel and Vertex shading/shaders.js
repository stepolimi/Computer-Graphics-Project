function shaders() {
// The shader can find the required informations in the following variables:

//uniform vec3 eyePos;				// viewer position
//uniform vec3 LAPos;				// light position
//uniform vec4 LAlightColor;		// light color
//uniform vec4 ambientLightColor;	// ambient light color
//uniform vec4 diffuseColor;		// diffuse light color
//uniform vec4 specularColor;		// specular color
//uniform float SpecShine;			// specular shine
//uniform vec4 ambientMatColor;		// ambient mat colro
//uniform vec4 emitColor;			// emit color



// Per vertex - vertex shader -- already done, for reference
var V1 = `#version 300 es
#define POSITION_LOCATION 0
#define NORMAL_LOCATION 1

layout(location = POSITION_LOCATION) in vec3 in_pos;
layout(location = NORMAL_LOCATION) in vec3 in_norm;

// uniforms
uniform vec3 eyePos;
uniform vec3 LAPos;
uniform vec4 LAlightColor;
uniform vec4 ambientLightColor;
uniform vec4 diffuseColor;
uniform vec4 specularColor;
uniform float SpecShine;
uniform vec4 ambientMatColor;
uniform vec4 emitColor;
uniform mat4 pMatrix;

out vec4 finalColor;

void main() {
	// light
	vec3 Ldir = normalize(LAPos - in_pos);
	// diffuse
	vec4 diffuse = diffuseColor * max(dot(normalize(in_norm), Ldir), 0.0);
	// specular
	vec3 eyeDir = normalize(eyePos - in_pos);
	vec3 halfVec = normalize(eyeDir + Ldir);
	vec4 specular = specularColor * pow(max(dot(halfVec, in_norm),0.0),SpecShine);
	// ambient
	vec4 ambient = ambientLightColor * ambientMatColor;
	// final
	finalColor = clamp((diffuse + specular) * LAlightColor + ambient + emitColor, 0.0, 1.0);

	gl_Position = pMatrix * vec4(in_pos, 1.0);
}
`;

// Per vertex - fragment shader -- already done, for reference
var F1 = `#version 300 es
precision highp float;

// from the fragment shader
in vec4 finalColor;

out vec4 color;

void main() {
	color = vec4(finalColor.rgb, 1.0);
}
`;











// Per pixel - vertex shader -- already done, for reference
var V2 = `#version 300 es
#define POSITION_LOCATION 0
#define NORMAL_LOCATION 1

layout(location = POSITION_LOCATION) in vec3 in_pos;
layout(location = NORMAL_LOCATION) in vec3 in_norm;

uniform mat4 pMatrix;

out vec3 fs_pos;
out vec3 fs_norm;

void main() {
	fs_pos = in_pos;
	fs_norm = in_norm;
	
	gl_Position = pMatrix * vec4(in_pos, 1.0);
}
`;

// Per pixel - fragment shader -- already done, for reference
var F2 = `#version 300 es
precision highp float;

// from the fragment shader
in vec3 fs_pos;
in vec3 fs_norm;

// uniforms
uniform vec3 eyePos;
uniform vec3 LAPos;
uniform vec4 LAlightColor;
uniform vec4 ambientLightColor;
uniform vec4 diffuseColor;
uniform vec4 specularColor;
uniform float SpecShine;
uniform vec4 ambientMatColor;
uniform vec4 emitColor;

out vec4 color;

void main() {
	vec3 norm = normalize(fs_norm);
	// light
	vec3 Ldir = normalize(LAPos - fs_pos);
	// diffuse
	vec4 diffuse = diffuseColor * max(dot(normalize(norm), Ldir), 0.0);
	// specular
	vec3 eyeDir = normalize(eyePos - fs_pos);
	vec3 halfVec = normalize(eyeDir + Ldir);
	vec4 specular = specularColor * pow(max(dot(halfVec, norm),0.0),SpecShine);
	// ambient
	vec4 ambient = ambientLightColor * ambientMatColor;
	// final
	vec4 finalColor = clamp((diffuse + specular) * LAlightColor + ambient + emitColor, 0.0, 1.0);
	
	color = vec4(finalColor.rgb, 1.0);
}
`;










// Light per vertex, diffuse and specular per pixel - vertex shader -- to do
var V3 = `#version 300 es
#define POSITION_LOCATION 0
#define NORMAL_LOCATION 1

layout(location = POSITION_LOCATION) in vec3 in_pos;
layout(location = NORMAL_LOCATION) in vec3 in_norm;

// uniforms
uniform vec3 LAPos;
uniform vec4 diffuseColor;
uniform mat4 pMatrix;

out vec3 fs_norm;
out vec3 fs_Ldir;
out vec3 fs_pos;

void main() {
	fs_norm = in_norm;
	fs_pos = in_pos;

	// light
	vec3 Ldir = normalize(LAPos - in_pos);
	fs_Ldir = Ldir;

	gl_Position = pMatrix * vec4(in_pos, 1.0);
}
`;

// Light per vertex, diffuse and specular per pixel - fragment shader -- to do
var F3 = `#version 300 es
precision highp float;

in vec3 fs_norm;
in vec3 fs_Ldir;
in vec3 fs_pos;

// uniforms
uniform vec3 eyePos;
uniform vec4 LAlightColor;
uniform vec4 ambientLightColor;
uniform vec4 diffuseColor;
uniform vec4 specularColor;
uniform float SpecShine;
uniform vec4 ambientMatColor;
uniform vec4 emitColor;

out vec4 color;

void main() {	

	// diffuse
	vec4 diffuse = diffuseColor * max(dot(normalize(fs_norm), fs_Ldir), 0.0);
	// specular
	vec3 eyeDir = normalize(eyePos - fs_pos);
	vec3 halfVec = normalize(eyeDir + fs_Ldir);
	vec4 specular = specularColor * pow(max(dot(halfVec, fs_norm),0.0),SpecShine);

	// ambient
	vec4 ambient = ambientLightColor * ambientMatColor;
	// final
	vec4 finalColor = clamp((diffuse + specular) * LAlightColor + ambient + emitColor, 0.0, 1.0);

	color = vec4(finalColor.rgb, 1.0);
}
`;	// note: kept ambient and emit color in fragment shader










// Light and diffuse per vertex, specular per pixel - vertex shader -- to do
var V4 = `#version 300 es
#define POSITION_LOCATION 0
#define NORMAL_LOCATION 1

layout(location = POSITION_LOCATION) in vec3 in_pos;
layout(location = NORMAL_LOCATION) in vec3 in_norm;

// uniforms
uniform vec3 LAPos;
uniform vec4 diffuseColor;
uniform mat4 pMatrix;

out vec3 fs_norm;
out vec3 fs_Ldir;
out vec3 fs_pos;
out vec4 fs_diffuse;

void main() {
	fs_norm = in_norm;
	fs_pos = in_pos;

	// light
	vec3 Ldir = normalize(LAPos - in_pos);
	fs_Ldir = Ldir;
	// diffuse
	vec4 diffuse = diffuseColor * max(dot(normalize(in_norm), Ldir), 0.0);
	fs_diffuse = diffuse;

	gl_Position = pMatrix * vec4(in_pos, 1.0);
}
`;

// Light and diffuse per vertex, specular per pixel - fragment shader -- to do
var F4 = `#version 300 es
precision highp float;

// uniforms
uniform vec3 eyePos;
uniform vec4 LAlightColor;
uniform vec4 ambientLightColor;
uniform vec4 specularColor;
uniform float SpecShine;
uniform vec4 ambientMatColor;
uniform vec4 emitColor;

in vec3 fs_norm;
in vec3 fs_Ldir;
in vec3 fs_pos;
in vec4 fs_diffuse;

out vec4 color;

void main() {	

	// specular
	vec3 eyeDir = normalize(eyePos - fs_pos);
	vec3 halfVec = normalize(eyeDir + fs_Ldir);
	vec4 specular = specularColor * pow(max(dot(halfVec, fs_norm),0.0),SpecShine);

	// ambient
	vec4 ambient = ambientLightColor * ambientMatColor;
	// final
	vec4 finalColor = clamp((fs_diffuse + specular) * LAlightColor + ambient + emitColor, 0.0, 1.0);

	color = vec4(finalColor.rgb, 1.0);
}
`;	// note: kept ambient and emit color in fragment shader



	return [V1, F1,  V2, F2,  V3, F3,  V4, F4];
}


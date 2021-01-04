"use strict";

var vertexShaderSource = `#version 300 es

precision mediump float;

in vec3 inPosition;
in vec3 inNormal;
in vec2 in_uv;

out vec2 fsUV;
out vec3 fsNormal;
out vec4 fs_pos;

uniform mat4 matrix;      //worldViewPrijection matrix to draw objects
uniform mat4 worldViewMatrix;  //worldView matrix to transform coordinates into Camera Space
uniform mat4 nMatrix;     //matrix to transform normals

void main() {
  fsUV = in_uv;
  fs_pos = worldViewMatrix * vec4(inPosition,1.0); //coordinates in Camera Space
  fsNormal = mat3(nMatrix) * inNormal; 

  gl_Position = matrix * vec4(inPosition, 1.0);
}
`;

var fragmentShaderSource = `#version 300 es
precision mediump float;

//ambient
uniform vec3 ambientLightCol;

//texture
uniform sampler2D in_texture;

in vec2 fsUV;
in vec3 fsNormal;
in vec4 fs_pos;

out vec4 outColor;

void main() {
  //computing ambient color
  vec3 ambient = ambientLightCol;

  outColor = vec4(clamp(ambient,0.0,1.0).rgb, 1.0) *  texture(in_texture, fsUV);
}
`;


var gl;
var canvas;
var program;
var vertexShader;
var fragmentShader;
var vaos;

//Meshes variables
var allMeshes;
var birdRed;
var birdChuck;
var birdBomb;
var birdMatilda;
var pig;
var pigHelmet;
var pigMustache;
var sling;
var environment;
var tnt;
var texture;

//shaders variables
var positionAttributeLocation;
var normalAttributeLocation;
var uvAttributeLocation;
var textLocation;

var matrixLocation;
var normalMatrixPositionHandle;
var worldViewMatrixPositionHandle;

var ambientLightColorHandle;

//movement variables
var perspectiveMatrix;
var viewMatrix;
var worldViewMatrix;
var projectionMatrix;
var normalTransformationMatrix;

//lights variables
var ambientLight = [1.0, 1.0, 1.0];

//camera variables
var cx = -11.2;
var cy = 2.6;
var cz = 0.3;
var elev = 0;
var ang = 270;
var vx = 0;
var vy = 0;
var vz = 0;
var rvx = 0;
var rvy = 0;

window.addEventListener("keydown", keyFunctionDown);
window.addEventListener("keyup", keyFunctionUp);

//listener to keys pression
function keyFunctionDown(e) {
  switch (e.key) {
    case "a":
      vx = CAMERA_COORDS_SPEED;
      break;

    case "d":
      vx = - CAMERA_COORDS_SPEED;
      break;

    case "ArrowUp":
      vy = CAMERA_COORDS_SPEED;
      break;

    case "ArrowDown":
      vy = - CAMERA_COORDS_SPEED;
      break;

    case "w":
      vz = CAMERA_COORDS_SPEED;
      break;

    case "s":
      vz = - CAMERA_COORDS_SPEED;
      break;

    case "q":
      rvx = CAMERA_ANGLE_SPEED;
      break;

    case "e":
      rvx = - CAMERA_ANGLE_SPEED;
      break;

    case "ArrowRight":
      rvy = CAMERA_ANGLE_SPEED;
      break;

    case "ArrowLeft":
      rvy = - CAMERA_ANGLE_SPEED;
      break;

    default:
      break;
  }
}

//listener to keys release
function keyFunctionUp(e) {
  switch (e.key) {
    case "a":
    case "d":
      vx = 0;
      break;

    case "ArrowDown":
    case "ArrowUp":
      vy = 0;
      break;

    case "s":
    case "w":
      vz = 0;
      break;

    case "q":
    case "e":
      rvx = 0;
      break;

    case "ArrowLeft":
    case "ArrowRight":
      rvy = 0;
      break;

    default:
      break;
  }
}









function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {    
    return shader;
  }else{
    console.log(gl.getShaderInfoLog(shader));  // eslint-disable-line
    gl.deleteShader(shader);
    throw "could not compile shader:" + gl.getShaderInfoLog(shader);
  }

}

function createProgram(gl, vertexShader, fragmentShader) {
  program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }else{
     throw ("program filed to link:" + gl.getProgramInfoLog (program));
    console.log(gl.getProgramInfoLog(program));  // eslint-disable-line
    gl.deleteProgram(program);
    return undefined;
  }
}

function autoResizeCanvas(canvas) {
    const expandFullScreen = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    expandFullScreen();
    // Resize screen when the browser has triggered the resize event
    window.addEventListener('resize', expandFullScreen);
}

async function main() {
  // Get a WebGL context
  canvas = document.getElementById("canvas");
  gl = canvas.getContext("webgl2");
  if (!gl) {
    alert("GL context not opened");
    return;
  }
  autoResizeCanvas(canvas);
  
  // create GLSL shaders, upload the GLSL source, compile the shaders
  vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  // Link the two shaders into a program
  program = createProgram(gl, vertexShader, fragmentShader);
    
  //use this aspect ratio to keep proportions
  var aspect_ratio = gl.canvas.width*1.0/gl.canvas.height;


  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST); 

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);
  await loadMeshes();
  setUpScene();
  drawScene();
}



async function loadMeshes(){
    environment = await utils.loadMesh("/assets/Others/environment.obj");
    sling = await utils.loadMesh("/assets/Others/sling.obj");
    tnt = await utils.loadMesh("/assets/Others/tnt.obj");
    birdRed = await utils.loadMesh("/assets/Birds/red.obj");
    birdChuck = await utils.loadMesh("/assets/Birds/chuck.obj");
    birdBomb = await utils.loadMesh("/assets/Birds/bomb.obj");
    birdMatilda = await utils.loadMesh("/assets/Birds/matilda.obj"); 
    pig = await utils.loadMesh("/assets/Pigs/pig.obj"); 
    pigHelmet = await utils.loadMesh("/assets/Pigs/pighelment.obj"); 
    pigMustache = await utils.loadMesh("/assets/Pigs/pigstache.obj"); 


    allMeshes = [
        environment,
        sling,
        tnt,
        birdRed,
        birdChuck,
        birdBomb,
        birdMatilda,
        birdMatilda,
        pig,
        pigHelmet,
        pigMustache
    ];
}
  

function setUpScene(){

    //define shader stuff
    positionAttributeLocation = gl.getAttribLocation(program, "inPosition");
    normalAttributeLocation = gl.getAttribLocation(program, "inNormal");
    uvAttributeLocation = gl.getAttribLocation(program, "in_uv");
    matrixLocation = gl.getUniformLocation(program, "matrix");
    textLocation = gl.getUniformLocation(program, "in_texture");
    normalMatrixPositionHandle = gl.getUniformLocation(program, 'nMatrix');
    worldViewMatrixPositionHandle = gl.getUniformLocation(program, 'worldViewMatrix');
    ambientLightColorHandle = gl.getUniformLocation(program, "ambientLightCol");
    perspectiveMatrix = utils.MakePerspective(90, gl.canvas.width / gl.canvas.height, 0.1, 100.0);

    //add textures
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    var image = new Image();
    image.src =  "/textures/hungryTexture.png";
    image.onload = function () {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.generateMipmap(gl.TEXTURE_2D);
    };

    //add meshes to the scene
    vaos = new Array(allMeshes.length);
    for (let i in allMeshes)
        addMeshToScene(i);

}

function setupLights(){
  //ambient lights
  gl.uniform3fv(ambientLightColorHandle, ambientLight);

}


function addMeshToScene(i) {
    let mesh = allMeshes[i];
    let vao = gl.createVertexArray();
    vaos[i] = vao;
    gl.bindVertexArray(vao);
    
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
    
    var uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.textures), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(uvAttributeLocation);
    gl.vertexAttribPointer(uvAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertexNormals), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(normalAttributeLocation);
    gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);
    
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.indices), gl.STATIC_DRAW);
 }

 function drawScene(){
    autoResizeCanvas(canvas);
    //clear scene
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 

    //move camera and calculate view matrix
    cx += vx;
    cy += vy;
    cz += vz;
    elev += rvx;
    ang += rvy;

    /*console.log("x: ")
    console.log(cx);

    console.log("y: ")
    console.log(cy);
*/
    console.log("z: ")
    console.log(cz);
/*
    console.log("elev: ")
    console.log(elev);

    console.log("ang: ")
    console.log(ang);*/

    setupLights();

    //base view matrix
    viewMatrix = utils.MakeView(cx, cy, cz, elev, ang);
    for (var i = 0; i < allMeshes.length; i++) {
       worldViewMatrix = utils.multiplyMatrices(viewMatrix, worldPositions[i]);
       projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);  

       // matrix to transform normals, used by the Vertex Shader
       normalTransformationMatrix = utils.invertMatrix(utils.transposeMatrix(worldViewMatrix));

       gl.uniformMatrix4fv(matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));
       gl.uniformMatrix4fv(normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(normalTransformationMatrix));
      
       gl.uniformMatrix4fv(worldViewMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(worldViewMatrix));
       
       //activate textures
       gl.activeTexture(gl.TEXTURE0);
       gl.bindTexture(gl.TEXTURE_2D, texture);
       gl.uniform1i(textLocation, 0);

       gl.bindVertexArray(vaos[i]);
       gl.drawElements(gl.TRIANGLES, allMeshes[i].indices.length, gl.UNSIGNED_SHORT, 0);
     }
     window.requestAnimationFrame(drawScene);
 }

window.onload = main;



"use strict";

var vertexShaderSource = `#version 300 es
void main() {

}
`;

var fragmentShaderSource = `#version 300 es

void main() {

}
`;

//Meshes variables
var allMeshes;
var birdRed;



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
  var program = gl.createProgram();
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
  var canvas = document.getElementById("canvas");
  var gl = canvas.getContext("webgl2");
  if (!gl) {
    alert("GL context not opened");
    return;
  }
  autoResizeCanvas(canvas);
  
  
  // create GLSL shaders, upload the GLSL source, compile the shaders
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  // Link the two shaders into a program
  var program = createProgram(gl, vertexShader, fragmentShader);
    
  //use this aspect ratio to keep proportions
  var aspect_ratio = gl.canvas.width*1.0/gl.canvas.height;


  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);
  await loadMeshes();
  setUpScene();
}



async function loadMeshes(){
    birdRed = await utils.loadMesh("/assets/Birds/red.obj");

    allMeshes = [
        birdRed
    ];
}
  

function setUpScene(){

    //define shader stuff
    var positionAttributeLocation = gl.getAttribLocation(program, "inPosition");
    var normalAttributeLocation = gl.getAttribLocation(program, "inNormal");
    var uvAttributeLocation = gl.getAttribLocation(program, "in_uv");


    //add meshes to the scene
    var vaos = new Array(allMeshes.length);
    for (let i in allMeshes)
        addMeshToScene(i);
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

window.onload = main;



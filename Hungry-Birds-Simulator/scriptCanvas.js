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
var elastic;
var environment;
var tnt;
var texture;
var egg;
var plumeExplosion;
var woodBox;
var glassBox;
var stoneBox;  
var woodPyramid;
var glassPyramid;
var stonePyramid;    
var glassVerticalPlane;
var woodVerticalPlane;
var glassHorizontalPlane;
var woodHorizontalPlane;
var stoneSquare;
var rock1;
var rock2;


// variables for objects movements
var birdY = 0;
var elasticScalingZ = 0;
var elasticScalingY = 0;
var elasticRotationY = 0;
var activateBirdPower = false;

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
var cx = -9.8;
var cy = 2.6;
var cz = 0.3;
var elev = 0;
var ang = 270;
var vx = 0;
var vy = 0;
var vz = 0;
var rvx = 0;
var rvy = 0;

//birds launch main management variables
var isPressed = false;
var isReleased = false;
var counter = 0;
var isRotating = false;
var mouseX = 0.0;
var mouseY = 0.0;




/*function called at the touchpad or mouse press, it works iff the previous bird ended the flight 
*/
function scaleSlingElastic(e){ 
    if(!busy){
	    var sound = document.getElementById("pullSlingSound");
        sound.play();
        isPressed = true;
        birdCollides = false;
    }
}


/*function called at the touchpad or mouse release, it brings all variables related to birds launch back to the origin status
  NB. worldPositions[10] is the original sling elastic position 
*/
function throwBird(e){
    isReleased = true;
    if(!busy){
        var sound = document.getElementById("releaseSlingSound");
        sound.play();
        busy = true;
        isPressed = false;
        isRotating = false;
        isReleased = false;
        firstTimeSound = true;
        elasticScalingZ = 0;
        elasticRotationY = 0;
        mouseX = 0.0;
        mouseY = 0.0;
        worldPositions[7] = utils.MakeWorld(0, 1.0 , -7.0, 0.0, 0.0, 0.0, 0.1);
        counter ++;
    }
}


window.addEventListener("keydown", keyFunctionDown);
window.addEventListener("keyup", keyFunctionUp);


//listener to keys pression
function keyFunctionDown(e) {
    switch (e.key) {
        case " ":
            activateBirdPower = true;
            break;
            
        case "w":
            vx = CAMERA_COORDS_SPEED;
            break;
            
        case "s":
            vx = - CAMERA_COORDS_SPEED;
            break;
            
        case "ArrowUp":
            vy = CAMERA_COORDS_SPEED;
            break;
            
        case "ArrowDown":
            vy = - CAMERA_COORDS_SPEED;
            break;
        
        case "d":
            vz = CAMERA_COORDS_SPEED;
            break;
        
        case "a":
            vz = - CAMERA_COORDS_SPEED;
            break;
        
        case "q":
            rvx = CAMERA_ANGLE_SPEED;
            break;
        
        case "e":
            rvx = - CAMERA_ANGLE_SPEED;
            break;
        
        case "ArrowLeft":
            rvy = CAMERA_ANGLE_SPEED;
            break;
        
        case "ArrowRight":
            rvy = - CAMERA_ANGLE_SPEED;
            break;
        
        default:
            break;
    }
}

//listener to keys release
function keyFunctionUp(e) {
    switch (e.key) {
        case "w":
        case "s":
            vx = 0;
            break;
        
        case "ArrowDown":
        case "ArrowUp":
            vy = 0;
            break;
        
        case "d":
        case "a":
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
    
    canvas.addEventListener("mousedown", scaleSlingElastic);
    canvas.addEventListener("mouseup", throwBird);
    canvas.addEventListener("mousemove", isSlingElasticRotating)
    
    
    function isSlingElasticRotating(e){
        isRotating = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    
    
    if(mouseY < 0)
      mouseY = 0.0;
    if(mouseY > canvas.height)
      mouseY = canvas.height;
    
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
    elastic = await utils.loadMesh("/assets/Others/slingElastic.obj");
    tnt = await utils.loadMesh("/assets/Others/tnt.obj");
    birdRed = await utils.loadMesh("/assets/Birds/red.obj");
    birdChuck = await utils.loadMesh("/assets/Birds/chuck.obj");
    birdBomb = await utils.loadMesh("/assets/Birds/bomb.obj");
    birdMatilda = await utils.loadMesh("/assets/Birds/matilda.obj"); 
    pig = await utils.loadMesh("/assets/Pigs/pig.obj"); 
    pigHelmet = await utils.loadMesh("/assets/Pigs/pighelment.obj"); 
    pigMustache = await utils.loadMesh("/assets/Pigs/pigstache.obj"); 
    egg = await utils.loadMesh("/assets/Others/egg.obj");
    plumeExplosion = await utils.loadMesh("/assets/Others/plume.obj");
    woodBox = await utils.loadMesh("/assets/Others/woodBox.obj");
    glassBox = await utils.loadMesh("/assets/Others/glassBox.obj");
    stoneBox = await utils.loadMesh("/assets/Others/stoneBox.obj");
    woodPyramid = await utils.loadMesh("/assets/Others/woodPyramid.obj");
    glassPyramid = await utils.loadMesh("/assets/Others/glassPyramid.obj");
    stonePyramid = await utils.loadMesh("/assets/Others/stonePyramid.obj");
    glassVerticalPlane = await utils.loadMesh("/assets/Others/glassVerticalPlane.obj");
    woodVerticalPlane = await utils.loadMesh("/assets/Others/woodVerticalPlane.obj");
    glassHorizontalPlane = await utils.loadMesh("/assets/Others/glassHorizontalPlane.obj");
    woodHorizontalPlane = await utils.loadMesh("/assets/Others/woodHorizontalPlane.obj");
    stoneSquare = await utils.loadMesh("/assets/Others/stoneSquare.obj");
    rock1 = await utils.loadMesh("/assets/Others/rock1.obj");
    rock2 = await utils.loadMesh("/assets/Others/rock2.obj");
    
    //randomize birds
    randomizeBirds(birdChuck, birdRed, birdBomb, birdMatilda);

    //randomize pigs
    randomizePigs(pig, pigHelmet, pigMustache);
    
    //pseudo randomize blocks
    defineStructureObjs(tnt, glassBox, woodBox, stoneBox, stoneSquare, woodPyramid, glassPyramid, stonePyramid, glassVerticalPlane, woodVerticalPlane, glassHorizontalPlane, woodHorizontalPlane);


    allMeshes = [
        environment,            //0
        sling,                  //1
        bird1,                  //2
        bird2,                  //3
        bird3,                  //4
        bird4,                  //5
        bird5,                  //6
        elastic,                //7
        egg,                    //8
        plumeExplosion,         //9
        pig11,                  //10
        pig12,                  //11
        pig13,                  //12
        tower11,                //13
        tower12,                //14
        tower13,                //15
        tower14,                //16
        tower15,                //17
        tower16,                //18
        tower17,                //19
        tower18,                //20
        tower19,                //21
        tower110,               //22
        tower111,               //23
        tower112,               //24
        tower113,               //25
        tower114,               //26
        tower115,               //27
        tower116,               //28
        tower117,               //29
        tower118,               //30
        tower119,               //31
        tower120,               //32
        rock1,                  //33
        pig21,                  //34
        pig22,                  //35
        pig23,                  //36
        pig24,                  //37
        pig25,                  //38
        tower21,                //39
        tower22,                //40
        tower23,                //41
        tower24,                //42
        tower25,                //43
        tower26,                //44
        tower27,                //45
        tower28,                //46
        tower29,                //47
        tower210,               //48
        tower211,               //49
        tower212,               //50
        tower213,               //51
        tower214,               //52
        tower215,               //53
        tower216,               //54
        tower217,               //55
        tower218,               //56
        tower219,               //57
        tower220,               //58
        rock2,                  //59
        pig31,				    //60
        tower31,				//61
        tower32,				//62
        tower33,				//63
        tower34,				//64
        tower35,				//65
        tower36,				//66
        tower37				    //67
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
    //clear scene
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 

    //logicHandler();  

    //move camera and calculate view matrix
    cx += vx;
    cy += vy;
    cz += vz;
    elev += rvx;
    ang += rvy;

    setupLights();

    waitingBirdsAnimation();
    if(isPressed)
        scaleSlingElasticZ();

    //todo: to be moved somewhere else
    //applies gravity to objects
    checkStability();
    objectFall();

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


//applies gravity to objects
function checkStability(){
    let tollerance = 0.01;

    structureObjs.forEach(function(objTocheck) {
        let objY = objTocheck.ty - objTocheck.rady;
        let objZ = objTocheck.tz;
        let objZStart = objTocheck.tz - objTocheck.radz;
        let objZEnd = objTocheck.tz + objTocheck.radz;
        let stable = false;
        let precStable = false;
        let sucStable = false;
        let ground = -0.4;

        if(objZ >= 4.2 && objZ <= 6.15)
            ground = 0.4;
        else if(objZ >= 7 && objZ <= 9)
            ground = 1.1;
        else
            ground = -0.4;

        if( !((ground > objY - tollerance) && (ground < objY + tollerance))){
            structureObjs.forEach(function(obj) {
                if((obj.ty + obj.rady > objY - tollerance) && (obj.ty + obj.rady < objY + tollerance)){
                    if((obj.tz + obj.radz >= objZ -0.1 && obj.tz - obj.radz <= objZStart) || (obj.tz - obj.radz <= objZ + 0.1 && obj.tz + obj.radz >= objZStart))
                        stable = true;
                    else if(obj.tz + obj.radz > objZStart && obj.tz - obj.radz <= objZEnd){
                        precStable = true;
                        objTocheck.supLeftPieces.push(obj);
                    }
                    else if(obj.tz - obj.radz < objZEnd && obj.tz + obj.radz >= objZStart){
                        sucStable = true;
                        objTocheck.supRightPieces.push(obj);
                    }
                }
            });
            if(!stable && !(precStable && sucStable))
                objTocheck.isStable = false;
            else
                objTocheck.isStable = true;
        }
        else
            objTocheck.isStable = true;
    });
}

function objectFall(){
    structureObjs.forEach(function(obj) {
       if(!obj.isStable){
        if(obj.supLeftPieces.length != 0){
            let maxZ = -100;
            obj.supLeftPieces.forEach(function(supObj) {
                if(supObj.tz + supObj.radz > maxZ)
                    maxZ = supObj.tz + supObj.radz;
            });
            obj.ry -= 0.5 / obj.radz * (obj.radz - maxZ);
            obj.vy = obj.vy - (g*TICK*TICK /2);
            obj.ty = obj.ty + obj.vy * TICK;
            obj.vz = 0.1;
            obj.tz = obj.tz + obj.vz * TICK
        }
        else if(obj.supRightPieces.length != 0){
            let minZ = 100;
            obj.supRightPieces.forEach(function(supObj) {
                if(supObj.tz - supObj.radz < minZ)
                    minZ = supObj.tz - supObj.radz;
            });
            obj.ry += 0.5 / obj.radz * (obj.radz - minZ);
            obj.vy = obj.vy - (g*TICK*TICK /2);
            obj.ty = obj.ty + obj.vy * TICK;
            obj.vz = 0.1;
            obj.tz = obj.tz + obj.vz * TICK
        }
        else{
            obj.vy = obj.vy - (g*TICK*TICK /2);
            obj.ty = obj.ty + obj.vy * TICK;
        }

        worldPositions[obj.index] = utils.MakeWorld(obj.tx , obj.ty, obj.tz, obj.rx, obj.ry, obj.rz, obj.scale);
     }
    });
}
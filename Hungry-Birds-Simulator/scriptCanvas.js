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

  //to transform coordinates in Camera Space
  fs_pos = worldViewMatrix * vec4(inPosition,1.0); 
  fsNormal = mat3(nMatrix) * inNormal; 

  gl_Position = matrix * vec4(inPosition, 1.0);
}
`;

var fragmentShaderSource = `#version 300 es
precision mediump float;

//ambient
uniform vec3 ambientLightCol;

//directional
uniform vec3 lightDirectionA; 
uniform vec3 lightColorA;

//diffuse light
uniform vec3 lightDiffusePosition;      //this is the position of a light
uniform vec3 lightDiffuseColor;

//reflection
uniform float shininess;

//texture
uniform sampler2D in_texture;

//Uv, normal and position of a vertex
in vec2 fsUV;
in vec3 fsNormal;
in vec4 fs_pos;

out vec4 outColor;

void main() {
  //normalize fsNormal, it could be not normalized coming out of vs
  vec3 nNormal = normalize(fsNormal);

  //computing ambient color
  vec3 ambient = ambientLightCol;

  //computing Lambert diffuse
  vec3 nLightDirectionA = normalize(lightDirectionA);
  vec3 diffA = lightColorA * clamp(dot(nNormal, nLightDirectionA), 0.0, 1.0);

  //diffuse light
  vec3 to_light;    //vector between light poition and fragment position
  vec3 diffLight;
  float cos_angle;
  to_light = lightDiffusePosition - vec3(fs_pos);
  to_light = normalize( to_light );

  // Calculate the cosine of the angle between the vertex's normal vector and the vector going to the light.
  //cos_angle = dot(fsNormal, to_light);
  //cos_angle = clamp(cos_angle, 0.0, 1.0);
  //diffLight = lightDiffuseColor * cos_angle;

  // Calculate the reflection vector
  //vec3 reflection = 2.0 * dot(nNormal,to_light) * nNormal - to_light;
  //reflection = normalize( reflection );
  // Calculate a vector from the fragment location to the camera.


  // The camera is at the origin, so negating the vertex location gives the vector
  vec3 to_camera = -1.0 * vec3(fs_pos);
  to_camera = normalize( to_camera );

  // Calculate the cosine of the angle between the reflection vector and the vector going to the camera.
  vec3 specularA = pow(clamp(dot(normalize(to_camera + to_light), nNormal)), 0.0, 1.0), shininess) * lightDiffuseColor;
  
  
  
  // If this fragment gets a specular reflection, use the light's color, otherwise use the objects's color

  //vec3 object_color = vec3(texture(in_texture, fsUV)) * (1.0 - cos_angle);
  //vec3 color = specular_color + object_color;
  
  
  outColor = vec4(clamp(ambient + specularA,0.0,1.0).rgb, 1.0) *  texture(in_texture, fsUV);
   //outColor = vec4(clamp(color,0.0,1.0).rgb, 1.0);
  //outColor = vec4(fsUV, 0.0, 1.0);
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
var sling;
var elastic;
var environment;
var tnt;
var texture;
var egg;
var plumeExplosion;
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
var lightDirectionAHandle;
var lightColorAHandle;
var lightDiffusePositionHandler;
var lightDiffuseColorHandler;
var shininessHandler;
var posZdirLightA = -0.5;
var posYdirLightA = 0.5;

//movement variables
var perspectiveMatrix;
var viewMatrix;
var worldViewMatrix;
var projectionMatrix;
var normalTransformationMatrix;

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

//create shaders
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

//attach program and shaders
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

//resize canvas to be full screen
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
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST); 
    
    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);
    await loadMeshes();
    setUpScene();
    drawScene();
}

//loads meashes from objs
async function loadMeshes(){
    
    environment = await utils.loadMesh("/assets/Others/environment.obj");
    sling = await utils.loadMesh("/assets/Others/sling.obj");
    elastic = await utils.loadMesh("/assets/Others/slingElastic.obj");
    birdRed = await utils.loadMesh("/assets/Birds/red.obj");
    birdChuck = await utils.loadMesh("/assets/Birds/chuck.obj");
    birdBomb = await utils.loadMesh("/assets/Birds/bomb.obj");
    birdMatilda = await utils.loadMesh("/assets/Birds/matilda.obj"); 
    egg = await utils.loadMesh("/assets/Others/egg.obj");
    plumeExplosion = await utils.loadMesh("/assets/Others/plume.obj");
    rock1 = await utils.loadMesh("/assets/Others/rock1.obj");
    rock2 = await utils.loadMesh("/assets/Others/rock2.obj");

    structureObjs.push(new structureObjects(0.0, -5.0 , 0.0, 0.0, 0.0, 0.0,  "egg", 8, 10 ));
    structureObjs.push(new structureObjects(0.0, 0.0 , 5.0, 0.0, 0.0, 0.0,  "rock1", 33, 99999 ));
    structureObjs.push(new structureObjects(0.0, 0.35 , 8.2, 0.0, 0.0, 0.0,  "rock2", 59, 99999 ));
    
    //randomize birds
    randomizeBirds(birdChuck, birdRed, birdBomb, birdMatilda);

    //randomize pigs
    randomizePigs();
    
    //pseudo randomize blocks
    await defineStructureObjs();

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
    lightDirectionAHandle = gl.getUniformLocation(program, "lightDirectionA");
    lightColorAHandle = gl.getUniformLocation(program, "lightColorA");
    lightDiffuseColorHandler = gl.getUniformLocation(program, "lightDiffuseColor");
    lightDiffusePositionHandler = gl.getUniformLocation(program, "lightDiffusePosition");
    shininessHandler = gl.getUniformLocation(program, "shininess");
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

var sunAngle = 0;

//sets light colors and positions
function setupLights(){
    //ambient light
    var ambientLight = [0.4, 0.4, 0.4];

    //directional light
    var xDirLightA;
    if(sunAngle < 2* Math.PI)
        sunAngle += Math.PI/1000;
    else
        sunAngle = 0;
    if(sunAngle >= 0 && sunAngle < Math.PI) 
        xDirLightA = -0.2;
    else
        xDirLightA = 0;
    
    //x to be -0.2 on day, -0 on night
    var directionaLightAPos = [xDirLightA, 0.1 * Math.sin(sunAngle), 0.1 * Math.cos(sunAngle)];
    var directionalLightAColor = [0.87, 0.67, 0.44];
    //var directionalLightAColor = fromHexToRGBVec(document.getElementById("LAlightColor").value);//#4d4d4d

    var lightDirectionalMatrix = utils.sub3x3from4x4(utils.invertMatrix(utils.transposeMatrix(viewMatrix)));
    var directionalLightATransform = utils.normalizeVector3(utils.multiplyMatrix3Vector3(lightDirectionalMatrix, directionaLightAPos));

    //diffuse light
    var dirLightAlphaA = document.getElementById("dirLightAlphaA").value;//20
    var dirLightBetaA = document.getElementById("dirLightBetaA").value;//32
    var dirLightGammaA = document.getElementById("dirLightGammaA").value;//32
    var diffuseLightPosition = [dirLightAlphaA, dirLightBetaA, dirLightGammaA];
    var diffuseLightColor = [0.8, 0.8, 0.8];
    //Transform the diffuse light's Position into Camera Space
    //var diffuseLightPosTransfMatrix = utils.sub3x3from4x4(utils.invertMatrix(utils.transposeMatrix(viewMatrix)));
    //var diffuseLightPosTransform = utils.normalizeVector3(utils.multiplyMatrix3Vector3(diffuseLightPosTransfMatrix,diffuseLightPosition));
    var diffuseLightPosTransform = utils.multiplyMatrixVector(viewMatrix,diffuseLightPosition);

    //reflection light
    var shininess = 30;

    //ambient lights
    gl.uniform3fv(ambientLightColorHandle, ambientLight);

    //directional light
    gl.uniform3fv(lightDirectionAHandle, directionalLightATransform);
    gl.uniform3fv(lightColorAHandle, directionalLightAColor);

    //diffuse light
    gl.uniform3fv(lightDiffusePositionHandler, diffuseLightPosTransform);
    gl.uniform3fv(lightDiffuseColorHandler, diffuseLightColor);

    //reflection light
    gl.uniform1f(shininessHandler, shininess);
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
    console.log(mesh.textures);
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
    //move camera and calculate view matrix
    cx += vx;
    cy += vy;
    cz += vz;
    elev += rvx;
    ang += rvy;



    waitingBirdsAnimation();
    if(isPressed)
        scaleSlingElasticZ();

    //todo: to be moved somewhere else
    //applies gravity to objects
    checkStability();
    objectFall();

    structureObjs.forEach(function(obj) {
        moveObject(obj);
    });

    //base view matrix
    viewMatrix = utils.MakeView(cx, cy, cz, elev, ang);

    setupLights();

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

function fromHexToRGBVec(hex) {
    var col = hex.substring(1,7);
    var  R = parseInt(col.substring(0,2) ,16) / 255;
    var  G = parseInt(col.substring(2,4) ,16) / 255;
    var  B = parseInt(col.substring(4,6) ,16) / 255;
    return [R,G,B]
  }
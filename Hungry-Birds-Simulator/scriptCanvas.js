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
uniform vec3 diffColor;


//Blinn reflection
uniform float shininess;
uniform vec3 specColor;


//Phong reflection
uniform float phongShininess;

//SpotLight general parameters
uniform float spotDecay;
uniform vec4 spotDir;


//Spotlight A
uniform vec4 lightDiffusePosition;      
uniform vec3 lightDiffuseColor;
uniform float spotATarget;
uniform float spotAConeOut;
uniform float spotAConeIn;


//Spotlight B
uniform vec4 spotBPosition;      
uniform vec3 spotBColor;
uniform float spotBTarget;
uniform float spotBConeOut;
uniform float spotBConeIn;


//Spotlight C
uniform vec4 spotCPosition;      
uniform vec3 spotCColor;
uniform float spotCTarget;
uniform float spotCConeOut;
uniform float spotCConeIn;

//Spotlight D
uniform vec4 spotDPosition;      
uniform vec3 spotDColor;
uniform float spotDTarget;
uniform float spotDConeOut;
uniform float spotDConeIn;


//PointLight
uniform vec4 pointPosition;
uniform vec3 pointColor;
uniform float pointTarget;
uniform float pointDecay;


//texture
uniform sampler2D in_texture;

//Uv, normal and position of a vertex
in vec2 fsUV;
in vec3 fsNormal;
in vec4 fs_pos;

out vec4 outColor;


//----BLINN--------------------------------------------------------------------------------------------
vec4 compSpecular(vec4 lightDir, vec4 lightCol, vec4 normalVec, vec4 eyedirVec) {
	// Specular
	// --> Blinn
	vec4 halfVec = normalize(lightDir + eyedirVec);
	vec4 specularBlinn = lightCol * pow(max(dot(normalVec, halfVec), 0.0), shininess) * vec4(specColor, 1.0);

	// ----> Select final component
	return specularBlinn;
    }
//-----------------------------------------------------------------------------------------------------

void main() {
    //normalize fsNormal, it could be not normalized coming out of vs
    vec3 nNormal = normalize(fsNormal);
    vec4 n4Normal = normalize(vec4(fsNormal, 1.0));
    
    //-------Ambient color-------------------
    vec3 ambient = ambientLightCol;
    

    //--------Eye position in camera space------------
    //vec3 posReflection = normalize(vec3(lightDiffusePosition));
    vec4 eyePos = -1.0 * fs_pos;
    

    //----Directional A + Phong + Lambert-----------------------------------------
    vec3 nLightDirectionA = normalize(lightDirectionA);
    vec3 diffA = lightColorA * clamp(dot(nNormal, nLightDirectionA), 0.0, 1.0);
    diffA = diffColor * diffA;

    vec4 dirAPhong =  pow(clamp(dot(eyePos, -reflect(vec4(nLightDirectionA, 1.0), n4Normal)),0.0,1.0), phongShininess) * vec4(lightColorA, 1.0) * vec4(specColor, 1.0);

    //----SPOTLIGHT A + Blinn + Lambert--------------------------------------------
    vec4 spotAPos = lightDiffusePosition - fs_pos;
    vec4 spotCol = vec4(lightDiffuseColor, 1.0) *  dot(pow(spotATarget/length(spotAPos), spotDecay), 
          clamp((dot(normalize(spotAPos), spotDir) - cos(radians(spotAConeOut)/2.0)) / (cos(radians(spotAConeIn)/2.0) - cos(radians(spotAConeOut)/2.0)), 0.0, 1.0));
    vec4 specularToSpotA = compSpecular(spotAPos, spotCol, n4Normal,eyePos);
    
    vec4 lambertSpotA = vec4(diffColor, 1.0) * spotCol * clamp(dot(n4Normal, normalize(spotAPos)), 0.0, 1.0);

    //----SPOTLIGHT B + Blinn + Lambert--------------------------------------------
    vec4 spotBPos = spotBPosition - fs_pos;
    vec4 spotBCol = vec4(spotBColor, 1.0) *  dot(pow(spotBTarget/length(spotBPos), spotDecay), 
          clamp((dot(normalize(spotBPos), spotDir) - cos(radians(spotBConeOut)/2.0)) / (cos(radians(spotBConeIn)/2.0) - cos(radians(spotBConeOut)/2.0)), 0.0, 1.0));    
    vec4 specularToSpotB = compSpecular(spotBPos,vec4(spotBColor, 1.0), n4Normal,eyePos);

    vec4 lambertSpotB = spotBCol * clamp(dot(n4Normal, normalize(spotBPos)), 0.0, 1.0);

    //----SPOTLIGHT C + Blinn + Lambert--------------------------------------------
    vec4 spotCPos = spotCPosition - fs_pos;
    vec4 spotCCol = vec4(spotCColor, 1.0) *  dot(pow(spotCTarget/length(spotCPos), spotDecay), 
          clamp((dot(normalize(spotCPos), spotDir) - cos(radians(spotCConeOut)/2.0)) / (cos(radians(spotCConeIn)/2.0) - cos(radians(spotCConeOut)/2.0)), 0.0, 1.0));
    vec4 specularToSpotC = compSpecular(spotCPos, spotCCol, n4Normal,eyePos);  
    
    vec4 lambertSpotC = spotCCol * clamp(dot(n4Normal, normalize(spotCPos)), 0.0, 1.0);

    //----SPOTLIGHT D + Blinn + Lambert--------------------------------------------
    vec4 spotDPos = spotDPosition - fs_pos;
    vec4 spotDCol = vec4(spotDColor, 1.0) *  dot(pow(spotDTarget/length(spotDPos), spotDecay), 
          clamp((dot(normalize(spotDPos), spotDir) - cos(radians(spotDConeOut)/2.0)) / (cos(radians(spotDConeIn)/2.0) - cos(radians(spotDConeOut)/2.0)), 0.0, 1.0));
    vec4 specularToSpotD = compSpecular(spotDPos, spotDCol, n4Normal,eyePos);

    vec4 lambertSpotD =  spotDCol * clamp(dot(n4Normal, normalize(spotDPos)), 0.0, 1.0);

    //----POINTLIGHT-----------------------------------------------------
    vec4 pointDir   = pointPosition - fs_pos;
    vec4 pointCol = vec4(pointColor, 1.0) * pow((pointTarget/length(pointDir)), pointDecay);

    //----Blinn total effect----------------------------------------------
    vec4 blinnTot = (specularToSpotA + specularToSpotB + specularToSpotC + specularToSpotD);


    outColor = vec4(clamp(vec3(spotCol + spotBCol + spotCCol + spotDCol + blinnTot + dirAPhong + pointCol + lambertSpotA + lambertSpotB + lambertSpotC + lambertSpotD ) + ambient + diffA,0.0,1.0).rgb, 1.0) *  texture(in_texture, fsUV);
}
`;


var gl;
var canvas;
var program;
var vertexShader;
var fragmentShader;
var vaos;
var darkModeToggle;

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
var specColorHandler;
var posZdirLightA = -0.5;
var posYdirLightA = 0.5;
var phongShininessHandler;
var diffColorHandler;

//SpotLight
var spotATargetHandle;
var spotDecayHandle;
var spotAConeOutHandle;
var spotAConeInHandle;
var spotDirHandle;
var spotConeOut = 0.0;
var spotConeIn = 0.0;


//SpotLight B
var spotBPositionHandle;      
var spotBColorHandle;
var spotBTargetHandle;
var spotBConeOutHandle;
var spotBConeInHandle;

//SpotLight C
var spotCPositionHandle;      
var spotCColorHandle;
var spotCTargetHandle;
var spotCConeOutHandle;
var spotCConeInHandle;

//SpotLight D
var spotDPositionHandle;      
var spotDColorHandle;
var spotDTargetHandle;
var spotDConeOutHandle;
var spotDConeInHandle;

//PointLight
var pointPositionHandler;
var pointColorHandler;
var pointTargetHandler;
var pointDecayHandler;


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





function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/*function called at the touchpad or mouse press, it works iff the previous bird ended the flight 
*/
function scaleSlingElastic(e){ 

    spotConeOut = 0.0;
    spotConeIn = 0.0;
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

        blinkSpotLight();
    }
}

async function blinkSpotLight(){
        spotConeOut = 15.0;
        spotConeIn = 7.5;
        await sleep(200);
        spotConeOut = 0.0;
        spotConeIn = 0.0;
        await sleep(200);
        spotConeOut = 15.0;
        spotConeIn = 7.5;
        await sleep(200);
        spotConeOut = 0.0;
        spotConeIn = 0.0;
        await sleep(200);
        spotConeOut = 15.0;
        spotConeIn = 7.5;
        await sleep(200);
        spotConeOut = 0.0;
        spotConeIn = 0.0;
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
    spotATargetHandle = gl.getUniformLocation(program, "spotATarget");
    spotDecayHandle = gl.getUniformLocation(program, "spotDecay");
    spotAConeOutHandle = gl.getUniformLocation(program, "spotAConeOut");
    spotAConeInHandle = gl.getUniformLocation(program, "spotAConeIn");
    spotDirHandle = gl.getUniformLocation(program, "spotDir");
    spotBPositionHandle  = gl.getUniformLocation(program, "spotBPosition");      
    spotBColorHandle = gl.getUniformLocation(program, "spotBColor");
    spotBTargetHandle = gl.getUniformLocation(program, "spotBTarget");
    spotBConeOutHandle = gl.getUniformLocation(program, "spotBConeOut");
    spotBConeInHandle = gl.getUniformLocation(program, "spotBConeIn");
    spotCPositionHandle  = gl.getUniformLocation(program, "spotCPosition");      
    spotCColorHandle = gl.getUniformLocation(program, "spotCColor");
    spotCTargetHandle = gl.getUniformLocation(program, "spotCTarget");
    spotCConeOutHandle = gl.getUniformLocation(program, "spotCConeOut");
    spotCConeInHandle = gl.getUniformLocation(program, "spotCConeIn");
    spotDPositionHandle  = gl.getUniformLocation(program, "spotDPosition");      
    spotDColorHandle = gl.getUniformLocation(program, "spotDColor");
    spotDTargetHandle = gl.getUniformLocation(program, "spotDTarget");
    spotDConeOutHandle = gl.getUniformLocation(program, "spotDConeOut");
    spotDConeInHandle = gl.getUniformLocation(program, "spotDConeIn");
    specColorHandler = gl.getUniformLocation(program, "specColor");
    phongShininessHandler = gl.getUniformLocation(program, "phongShininess");
    diffColorHandler = gl.getUniformLocation(program, "diffColor");
    pointPositionHandler = gl.getUniformLocation(program, "pointPosition");
    pointColorHandler = gl.getUniformLocation(program, "pointColor");
    pointTargetHandler = gl.getUniformLocation(program, "pointTarget");
    pointDecayHandler = gl.getUniformLocation(program, "pointDecay");


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

//sets light colors and positions
function setupLights(){
    //----Ambient Light------------------------------------------------------------------------
    var ambientLight = [0.4, 0.4, 0.4];
    gl.uniform3fv(ambientLightColorHandle, ambientLight);
    //-----------------------------------------------------------------------------------------

    
    
    //----Dark mode changes + directional------------------------------------------------------
    var directionaLightAPos = [-1.2, 1.0 , 0.0];
    var diffCol = [1.0, 1.0, 1.0];
    var directionalLightAColor = [0.87, 0.67, 0.44];
    darkModeToggle = document.getElementById("darkModeToggle");
    var sun = document.getElementById("toggleSunImg");
    var moon = document.getElementById("toggleMoonImg");

    var scoreText = document.getElementById("score");
    var menuText = document.getElementById("menu-text");
    var exitText = document.getElementById("exit-text");

    if(darkModeToggle.checked == true){
        directionalLightAColor = [0.87, 0.67, 0.44];
        canvas.style.backgroundImage = "url(resources/in-game-background.png)";
        sun.style.visibility = "hidden";
        moon.style.visibility = "visible";
        scoreText.style.color = "#000000";
        menuText.style.color = "#000000";
        exitText.style.color = "#000000";
    }
    else{
        directionalLightAColor = [0.0, 0.0, 0.0];
        canvas.style.backgroundImage = "url(resources/dark-mode-background.png)";
        moon.style.visibility = "hidden";
        sun.style.visibility = "visible";
        scoreText.style.color = "#FFFFFF";
        menuText.style.color = "#FFFFFF";
        exitText.style.color = "#FFFFFF";
    }

    var lightDirectionalMatrix = utils.sub3x3from4x4(utils.invertMatrix(utils.transposeMatrix(viewMatrix)));
    var directionalLightATransform = utils.normalizeVector3(utils.multiplyMatrix3Vector3(lightDirectionalMatrix, directionaLightAPos));


    //directional light
    gl.uniform3fv(lightDirectionAHandle, directionalLightATransform);
    gl.uniform3fv(lightColorAHandle, directionalLightAColor);
    gl.uniform3fv(diffColorHandler, diffCol);
    //-----------------------------------------------------------------------------------------

    
    //reflection light
    var shininess = 5;
    var phongS = 200; 


    //--------------SpotLight general parameters-----------------------------------------------
    var spotTarget = 10.0;
    var spotGenDecay = 2.0;
    
    var t = utils.degToRad(0);
	var p = utils.degToRad(45);
    var spotGenDir = [ Math.sin(t) * Math.sin(p), Math.cos(t), Math.sin(t) * Math.cos(p), 1.0];
    
    var spotGenDirTransform = utils.multiplyMatrixVector(utils.invertMatrix(utils.transposeMatrix(viewMatrix)), spotGenDir);

    gl.uniform1f(spotATargetHandle, spotTarget);
    gl.uniform1f(spotDecayHandle, spotGenDecay);
    gl.uniform4fv(spotDirHandle, spotGenDirTransform);
    //-----------------------------------------------------------------------------------------


    //---------------SpotLight A---------------------------------------------------------------
    
    if(darkModeToggle.checked == false){
        spotConeOut = 15.0;
        spotConeIn = 7.5;
    }

    gl.uniform1f(spotAConeOutHandle, spotConeOut);
    gl.uniform1f(spotAConeInHandle, spotConeIn);


    var diffuseLightPosition = [0, 10, -7, 1.0];
    var diffuseLightColor = [0.32, 0.62, 0.64];
   
    //Transform the diffuse light's Position into Camera Spaces.
    var diffuseLightPosTransform = utils.multiplyMatrixVector(viewMatrix, diffuseLightPosition);

    gl.uniform4fv(lightDiffusePositionHandler, diffuseLightPosTransform);
    gl.uniform3fv(lightDiffuseColorHandler, diffuseLightColor);
    //-----------------------------------------------------------------------------------------


    //---------------SpotLight B---------------------------------------------------------------
    var BSpotPosition = [0, 10, 0.65, 1.0];
    var BSpotColor = [0.0, 0.0, 1.0];

    var BTarget = 10.0;
    var BConeOut = 22.0;
    var BConeIn = 15.0;

    if(darkModeToggle.checked == true){
        BSpotColor = [0.0, 0.0, 0.0];
    }

    
    gl.uniform1f(spotBConeOutHandle, BConeOut);
    gl.uniform1f(spotBConeInHandle, BConeIn);
    gl.uniform1f(spotBTargetHandle, BTarget);
   
    //Transform the diffuse light's Position into Camera Spaces.
    var BSpotPositionTransform = utils.multiplyMatrixVector(viewMatrix, BSpotPosition);

    gl.uniform4fv(spotBPositionHandle, BSpotPositionTransform);
    gl.uniform3fv(spotBColorHandle, BSpotColor);
    //-----------------------------------------------------------------------------------------


    //---------------SpotLight C---------------------------------------------------------------
    var CSpotPosition = [0, 15, 5.0, 1.0];
    var CSpotColor = [0.0, 1.0, 0.0];

    var CTarget = 15.0;
    var CConeOut = 15.0;
    var CConeIn = 13.0;

    if(darkModeToggle.checked == true){
        CSpotColor = [0.0, 0.0, 0.0];
    }

    
    gl.uniform1f(spotCConeOutHandle, CConeOut);
    gl.uniform1f(spotCConeInHandle, CConeIn);
    gl.uniform1f(spotCTargetHandle, CTarget);
   
    //Transform the diffuse light's Position into Camera Spaces.
    var CSpotPositionTransform = utils.multiplyMatrixVector(viewMatrix, CSpotPosition);

    gl.uniform4fv(spotCPositionHandle, CSpotPositionTransform);
    gl.uniform3fv(spotCColorHandle, CSpotColor);
    //-----------------------------------------------------------------------------------------


     //---------------SpotLight D---------------------------------------------------------------
    var DSpotPosition = [0, 10, 8.0, 1.0];
    var DSpotColor = [1.0, 0.0, 0.0];

    var DTarget = 10.0;
    var DConeOut = 22.0;
    var DConeIn = 15.0;

    if(darkModeToggle.checked == true){
        DSpotColor = [0.0, 0.0, 0.0];
    }
    
    gl.uniform1f(spotDConeOutHandle, DConeOut);
    gl.uniform1f(spotDConeInHandle, DConeIn);
    gl.uniform1f(spotDTargetHandle, DTarget);
   
    //Transform the diffuse light's Position into Camera Spaces.
    var DSpotPositionTransform = utils.multiplyMatrixVector(viewMatrix, DSpotPosition);

    gl.uniform4fv(spotDPositionHandle, DSpotPositionTransform);
    gl.uniform3fv(spotDColorHandle, DSpotColor);
    //-----------------------------------------------------------------------------------------


    //reflection light
    var specularColor = [1.0, 1.0, 1.0];
    gl.uniform3fv(specColorHandler, specularColor);
    gl.uniform1f(shininessHandler, shininess);
    gl.uniform1f(phongShininessHandler, phongS);

    //----PointLight---------------------------------------------------------------------------
   
    var pTarget = 0.3;
    var pDecay = 10;
    var pColor = [1.0, 1.0, 1.0];
    var pPos = [0.0, bird.ty, bird.tz, 1.0];
    
    var pPosTransform = utils.multiplyMatrixVector(viewMatrix, pPos);

    gl.uniform1f(pointTargetHandler, pTarget);
    gl.uniform1f(pointDecayHandler, pDecay);
    gl.uniform3fv(pointColorHandler, pColor);
    gl.uniform4fv(pointPositionHandler, pPosTransform);
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
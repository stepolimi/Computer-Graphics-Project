//world: z:-8 --> z: +8
//world: x:-4 --> x: +4
var elasticForce;
var birdStartingY;
var birdStartingZ;
var angleY;


var envMatrix = utils.MakeWorld(0.0, -5.0 , 0.0, 0.0, 0.0, 0.0, 4.5);
var slingMatrix = utils.MakeWorld(0, -0.45 , -7.0, 0.0, 0.0, 0.0, 0.15);
var bird1Matrix = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
var bird2Matrix = utils.MakeWorld(-0.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);
var bird3Matrix = utils.MakeWorld(-1.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);	
var bird4Matrix = utils.MakeWorld(-2.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);	
var bird5Matrix = utils.MakeWorld(-3.5, 0.0 , -7.5, 0.0, 0.0, 0.0, 0.5);	
var slingElasticMatrix = utils.MakeWorld(0, 1.0 , -7.0, 0.0, 0.0, 0.0, 0.1);
var eggMatrix = utils.MakeWorld(0.0, -5.0 , 0.0, 0.0, 0.0, 0.0, 0.5);
var plumeExplosionMatrix = utils.MakeWorld(0.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0);


//Tower 1 pigs
var pig11Matrix = utils.MakeWorld(0.0, 0.0 , -3.0, 270.0, 0.0, 0.0, 0.7);		//pig1 of tower 1 z=1.8
var	pig12Matrix = utils.MakeWorld(0.0, 1.6 , 0.2, 270.0, 0.0, 0.0, 0.7);		//pig2 of tower 1
var pig13Matrix = utils.MakeWorld(0.0, 3.6 , 0.2, 270.0, 0.0, 0.0, 0.4);		//pig3 of tower 1

//Tower 1 pieces  
var tower11Matrix = utils.MakeWorld(0.0, 0.0 , -1.0, 0.0, 0.0, 0.0, 0.2);		//pyramid
var tower12Matrix = utils.MakeWorld(0.0, 0.0 , -0.2, 0.0, 0.0, 0.0, 0.2);		//cube
var tower13Matrix = utils.MakeWorld(0.0, 0.0 ,  0.6, 0.0, 0.0, 0.0, 0.2);		//cube
var tower14Matrix = utils.MakeWorld(0.0, 0.0 , 1.05, 0.0, 0.0, 0.0, 0.2);		//vertical plane
var tower15Matrix = utils.MakeWorld(0.0, 0.0 , 0.0, 0.0, 0.0, 0.0, 0.2);		//vertical plane z=2.55
var tower16Matrix = utils.MakeWorld(0.0, 0.5 ,  1.8, 0.0, 0.0, 0.0, 0.2);		//horizontal plane
var tower17Matrix = utils.MakeWorld(0.0, 1.0 ,  1.8, 0.0, 0.0, 0.0, 0.2);		//cube
var tower18Matrix = utils.MakeWorld(0.0, 1.8 ,  1.8, 0.0, 0.0, 0.0, 0.2);		//cube
var tower19Matrix = utils.MakeWorld(0.0, 2.6 ,  1.8, 0.0, 0.0, 0.0, 0.2);		//pyramid
var tower110Matrix = utils.MakeWorld(0.0, 0.8,-0.55, 0.0, 0.0, 0.0, 0.2);		//vertical plane
var tower111Matrix = utils.MakeWorld(0.0, 0.8 ,0.95, 0.0, 0.0, 0.0, 0.2);		//vertical plane
var tower112Matrix = utils.MakeWorld(0.0, 0.75,0.2, 0.4, 0.0, 0.0, 0.18);		//tnt
var tower113Matrix = utils.MakeWorld(0.0, 1.3 , 0.2, 0.0, 0.0, 0.0, 0.2);		//horizontal plane
var tower114Matrix = utils.MakeWorld(0.0, 1.8,-0.55, 0.0, 0.0, 0.0, 0.2);		//vertical plane
var tower115Matrix = utils.MakeWorld(0.0, 1.8 ,0.95, 0.0, 0.0, 0.0, 0.2);		//vertical plane
var tower116Matrix = utils.MakeWorld(0.0, 2.3 , 0.2, 0.0, 0.0, 0.0, 0.2);		//horizontal plane
var tower117Matrix = utils.MakeWorld(0.0, 2.8 , 0.2, 0.0, 0.0, 0.0, 0.2);		//cube
var tower118Matrix = utils.MakeWorld(0.0, 3.3 , 0.2, 0.0, 0.0, 0.0, 0.2);		//horizontal plane
var tower119Matrix = utils.MakeWorld(0.0, 3.8 , 0.2, 0.0, 0.0, 0.0, 0.2);		//cube
var tower120Matrix = utils.MakeWorld(0.0, 4.6 , 0.2, 0.0, 0.0, 0.0, 0.2);		//pyramid

var rockMatrix = utils.MakeWorld(0.0, 0.0 , 5.0, 0.0, 0.0, 0.0, 0.2);

//Tower 2     4.2 < z < 6.15 
var pig21Matrix = utils.MakeWorld(0.0, 0.6 , 5.0, 270.0, 0.0, 0.0, 0.75);		//pig1 of tower 2
var	pig22Matrix = utils.MakeWorld(0.0, 1.35 , 5.8, 270.0, 0.0, 0.0, 0.4);		//pig2 of tower 2
var pig23Matrix = utils.MakeWorld(0.0, 2.15 , 4.8, 270.0, 0.0, 0.0, 0.4);		//pig3 of tower 2
var pig24Matrix = utils.MakeWorld(0.0, 4.0 , 5.0, 270.0, 0.0, 0.0, 0.6);		//pig1 of tower 2
var pig25Matrix = utils.MakeWorld(0.0, 6.8 , 5.0, 270.0, 0.0, 0.0, 1.0);		//pig3 of tower 2

var tower21Matrix = utils.MakeWorld(0.0, 0.8 , 4.2, 0.0, 0.0, 0.0, 0.2);		//cube
var tower22Matrix = utils.MakeWorld(0.0, 0.8 , 5.8, 0.0, 0.0, 0.0, 0.2);		//cube
var tower23Matrix = utils.MakeWorld(0.0, 1.6 , 4.6, 0.0, 0.0, 0.0, 0.2);		//cube
var tower24Matrix = utils.MakeWorld(0.0, 1.6 , 5.45, 0.0, 0.0, 0.0, 0.2);		//vertical plane
var tower25Matrix = utils.MakeWorld(0.0, 1.6 , 6.15, 0.0, 0.0, 0.0, 0.2);		//vertical plane
var tower26Matrix = utils.MakeWorld(0.0, 2.4 , 5.45, 0.0, 0.0, 0.0, 0.2);		//vertical plane
var tower27Matrix = utils.MakeWorld(0.0, 2.4 , 6.15, 0.0, 0.0, 0.0, 0.2);		//vertical plane
var tower28Matrix = utils.MakeWorld(0.0, 2.4 ,  4.2, 0.0, 0.0, 0.0, 0.2);		//cube
var tower29Matrix = utils.MakeWorld(0.0, 3.2 ,  4.2, 0.0, 0.0, 0.0, 0.2);		//cube
var tower210Matrix = utils.MakeWorld(0.0, 3.2, 5.0 , 0.4, 0.0, 0.0, 0.2);		//tnt
var tower211Matrix = utils.MakeWorld(0.0, 3.2 , 5.8, 0.0, 0.0, 0.0, 0.2);		//cube
var tower212Matrix = utils.MakeWorld(0.0, 3.7 , 5.0, 0.0, 0.0, 0.0, 0.2);		//horizontal plane
var tower213Matrix = utils.MakeWorld(0.0, 4.2 , 5.8, 0.0, 0.0, 0.0, 0.2);		//cube
var tower214Matrix = utils.MakeWorld(0.0, 5.0 , 5.8, 0.0, 0.0, 0.0, 0.2);		//cube
var tower215Matrix = utils.MakeWorld(0.0, 5.8 , 5.8, 0.0, 0.0, 0.0, 0.2);		//pyramid
var tower216Matrix = utils.MakeWorld(0.0, 5.8 , 5.0, 0.0, 0.0, 0.0, 0.2);		//cube
var tower217Matrix = utils.MakeWorld(0.0, 5.8 , 4.2, 0.0, 0.0, 0.0, 0.2);		//pyramid
var tower218Matrix = utils.MakeWorld(0.0, 5.0 , 4.2, 0.0, 0.0, 0.0, 0.2);		//cube
var tower219Matrix = utils.MakeWorld(0.0, 4.2 , 4.2, 0.0, 0.0, 0.0, 0.2);		//cube
var tower220Matrix = utils.MakeWorld(0.0, 6.3 , 5.0, 0.0, 0.0, 0.0, 0.2);		//horizontal plane


var rock2Matrix = utils.MakeWorld(0.0, 0.0 , 8.2, 0.0, 0.0, 0.0, 0.2);

//Tower 3    7 < z < 9
var pig31Matrix = utils.MakeWorld(0.0, 2.1 , 7.8, 270.0, 0.0, 0.0, 0.6);		//pig1 of tower 3


var tower31Matrix = utils.MakeWorld(0.0, 1.5 , 7.0, 0.0, 0.0, 0.0, 0.2);		//tnt
var tower32Matrix = utils.MakeWorld(0.0, 1.5 , 7.8, 0.0, 0.0, 0.0, 0.2);		//tnt
var tower33Matrix = utils.MakeWorld(0.0, 1.5 , 8.6, 0.0, 0.0, 0.0, 0.2);		//tnt
var tower34Matrix = utils.MakeWorld(0.0, 2.3 , 7.0, 0.0, 0.0, 0.0, 0.2);		//pyramid
var tower35Matrix = utils.MakeWorld(0.0, 2.3 , 8.6, 0.0, 0.0, 0.0, 0.2);		//pyramid
var tower36Matrix = utils.MakeWorld(0.0, 2.8 , 7.8, 0.0, 0.0, 0.0, 0.2);		//horizontal plane
var tower37Matrix = utils.MakeWorld(0.0, 3.3 , 7.8, 0.0, 0.0, 0.0, 0.2);		//pyramid

//birds rotation
var lastUpdateTime = (new Date).getTime();


var worldPositions = [
	envMatrix,					//0
	slingMatrix,				//1
	bird1Matrix,				//2
	bird2Matrix,				//3
	bird3Matrix,				//4
	bird4Matrix,				//5
	bird5Matrix,				//6
	slingElasticMatrix,			//7
	eggMatrix,					//8
	plumeExplosionMatrix,		//9
	pig11Matrix,				//10
	pig12Matrix,				//11
	pig13Matrix,				//12
	tower11Matrix,				//13
	tower12Matrix,				//14
	tower13Matrix,				//15
	tower14Matrix,				//16
	tower15Matrix,				//17
	tower16Matrix,				//18
	tower17Matrix,				//19
	tower18Matrix,				//20
	tower19Matrix,				//21
	tower110Matrix,				//22
	tower111Matrix,				//23
	tower112Matrix,				//24
	tower113Matrix,				//25
	tower114Matrix,				//26
	tower115Matrix,				//27
	tower116Matrix,				//28
	tower117Matrix,				//29
	tower118Matrix,				//30
	tower119Matrix,				//31
	tower120Matrix,				//32
	rockMatrix,					//33
	pig21Matrix,				//34
	pig22Matrix,				//35
	pig23Matrix,				//36
	pig24Matrix,				//37
	pig25Matrix,				//38
	tower21Matrix,				//39
	tower22Matrix,				//40
	tower23Matrix,				//41
	tower24Matrix,				//42
	tower25Matrix,				//43
	tower26Matrix,				//44
	tower27Matrix,				//45
	tower28Matrix,				//46
	tower29Matrix,				//47
	tower210Matrix,				//48
	tower211Matrix,				//49
	tower212Matrix,				//50
	tower213Matrix,				//51
	tower214Matrix,				//52
	tower215Matrix,				//53
	tower216Matrix,				//54
	tower217Matrix,				//55
	tower218Matrix,				//56
	tower219Matrix,				//57
	tower220Matrix,				//58
	rock2Matrix,				//59
	pig31Matrix,				//60
	tower31Matrix,				//61
	tower32Matrix,				//62
	tower33Matrix,				//63
	tower34Matrix,				//64
	tower35Matrix,				//65
	tower36Matrix,				//66
	tower37Matrix				//67
];

var roundY1 = 0;
var roundY2 = 0;
var roundY3 = 0;
var roundY4 = 0;
var count1 = 0;
var count2 = 0;
var count3 = 0;
var count4 = 0;

function waitingBirdsAnimation(){
	birdY += BIRD_Y; 
	var currentTime = (new Date).getTime();
	var roundZ = 0.0;
    if(lastUpdateTime - currentTime >= 1700 &&  lastUpdateTime - currentTime <= 2100)
		roundZ = 75.0;
	else
		roundZ = 0.0;
	birdFlip();

	switch(counter){
		case 0:
			worldPositions[3] = utils.MakeWorld(-0.5,  0.1 + Math.sin(birdY*8.0)/10 , -7.5, 0.0, roundY1, roundZ, 0.5); 
			worldPositions[4] = utils.MakeWorld(-1.5,  0.1 + Math.sin(birdY*4.0)/10 , -7.5, 0.0, roundY2, roundZ, 0.5); 
			worldPositions[5] = utils.MakeWorld(-2.5,  0.1 + Math.sin(birdY*3.5)/10 , -7.5, 0.0, roundY3, roundZ, 0.5);  
			worldPositions[6] = utils.MakeWorld(-3.5,  0.1 + Math.sin(birdY*5.0)/10 , -7.5, 0.0, roundY4, roundZ, 0.5);  
			break;
		case 1:
			birdTrajectory(2);
			setTimeout(function(){},1000);
		    worldPositions[3] = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[4] = utils.MakeWorld(-0.5, 0.1 + Math.sin(birdY*8.0)/10 , -7.5, 0.0, roundY1, 0.0, 0.5);
		    worldPositions[5] = utils.MakeWorld(-1.5, 0.1 + Math.sin(birdY*4.0)/10  , -7.5, 0.0, roundY2, 0.0, 0.5);	
		    worldPositions[6] = utils.MakeWorld(-2.5, 0.1 + Math.sin(birdY*3.5)/10  , -7.5, 0.0, roundY3, 0.0, 0.5);	
			break;
		case 2:
			birdTrajectory(3);
			setTimeout(function(){},1000);
		    worldPositions[4] = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[5] = utils.MakeWorld(-0.5, 0.1 + Math.sin(birdY*8.0)/10 , -7.5, 0.0, roundY1, 0.0, 0.5);
		    worldPositions[6] = utils.MakeWorld(-1.5, 0.1 + Math.sin(birdY*4.0)/10  , -7.5, 0.0, roundY2, 0.0, 0.5);	
			break;
		case 3:
			birdTrajectory(4);
			setTimeout(function(){},1000);
		    worldPositions[5] = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
		    worldPositions[6] = utils.MakeWorld(-0.5, 0.1 + Math.sin(birdY*8.0)/10 , -7.5, 0.0, roundY1, 0.0, 0.5);
			break;
		case 4:
			birdTrajectory(5);
			setTimeout(function(){},1000);
		    worldPositions[6] = utils.MakeWorld(0.0, 1.1 , -7.2, 0.0, 0.0, 0.0, 0.5);
			break;
		case 5:
			birdTrajectory(6);
			break;
		default:
		    break;
	}
}

function birdFlip(){
	if(roundY1 == 360){
		let min = Math.ceil(1);
		let max = Math.floor(20);
		choiche = Math.floor(Math.random() * (max - min + 1)) + min;
		count1 += choiche;
		if(count1 >= 2000 ){
			count1 = 0;
			roundY1 = 0;
		}
	} else
		roundY1 += 10;

	if(roundY2 == 360){
		let min = Math.ceil(1);
		let max = Math.floor(20);
		choiche = Math.floor(Math.random() * (max - min + 1)) + min;
		count2 += choiche;
		if(count2 >= 2000 ){
			count2 = 0;
			roundY2 = 0;
		}
	} else
		roundY2 += 10;
	
	if(roundY3 == 360){
		let min = Math.ceil(1);
		let max = Math.floor(20);
		choiche = Math.floor(Math.random() * (max - min + 1)) + min;
		count3 += choiche;
		if(count3 >= 2000 ){
			count3 = 0;
			roundY3 = 0;
		}
	} else
		roundY3 += 10;

	if(roundY4 == 360){
		let min = Math.ceil(1);
		let max = Math.floor(20);
		choiche = Math.floor(Math.random() * (max - min + 1)) + min;
		count4 += choiche;
		if(count4 >= 2000 ){
			count4 = 0;
			roundY4 = 0;
		}
	} else
		roundY4 += 10;
}


function scaleSlingElasticZ(){

	var normlizedY;
	angleY = 0.0;
	var midValue = canvas.height / 2;
	
	elasticForce = elasticScalingZ*5.5;
	console.log("elasticForce " + elasticForce);
	if(elasticForce < 0.7 && !isReleased)     
		elasticScalingZ += SLING_ELASTIC_Z_SCALING_SPEED;	

	if(isRotating){
		if(mouseY <= midValue){
			normalizedY = mouseY / midValue;
			angleY = 90.0 - (normalizedY*90.0);
		}
		else{
			normalizedY = (mouseY - midValue) / (canvas.height - midValue);
			angleY = -(normalizedY*90.0);
		}
		worldPositions[7] = utils.MakeWorldScaled(0.0, 1.0 , -7.0 , 0.0, angleY , 0.0, 0.1, 0.1, 0.1+ elasticScalingZ);
	}
	else
		worldPositions[7] = utils.MakeWorldScaled(0.0, 1.0 , -7.0, 0.0, 0.0, 0.0, 0.1, 0.1, 0.1+ elasticScalingZ);

	if (counter < 5)
		moveBirdWithSling();
	
}

function moveBirdWithSling(){
	var variation = 7.2 + elasticForce;

	var cos = Math.cos(utils.degToRad(angleY));
	var sin = Math.sin(utils.degToRad(angleY));
	birdStartingY = (1.95 - 1.1)*sin + 1.1;
	birdStartingZ = (variation - 7.0)*cos + 7.0;
	worldPositions[2 + counter] = utils.MakeWorld(0.0 , birdStartingY, -birdStartingZ , 0.0,  angleY, 0.0, 0.5);

}
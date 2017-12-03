var player1;
var player2;
var ball;
var keys = [];
var points = [0,0];//player points, respectively

function setup() {
	createCanvas(1000,600);
	background(0);
	frameRate(60);
	reset();
}

function draw() {
	background(0);
  player1.update(keys);
  player2.update(keys);
  ball.update();
  //draw text
  textSize(32);
  text(points[0],20,30);
  fill(255);
  text(points[1],width-50,30);

}
function reset(){
	ball = new Ball();
	player1 = new Player();
	player1.setPlayer(1);
	player2 = new Player();
	player2.setPlayer(2);
}
function score(no){
	switch(no){
		case 1:
			points[0]++;
			break;
		case 2:
			points[1]++;
			break;
		default:
			console.log("Invalid Player!");
			break;
	}
	reset();
}
//Event listeners for key presses
document.addEventListener('keydown',function(e){keys[e.keyCode] = true;},false);
document.addEventListener('keyup',function(e){keys[e.keyCode] = false},false);
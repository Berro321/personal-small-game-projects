/*
MINESWEEPER CLONE
by Matchburn321~
*/
const grid = 32;//Size of each cell
var board = [];
const sizeGrid = 15; //sizeGrid x sizeGrid playing field
var noCol;//number of columns
var noRow;//number of rows
const maxBombs = 30;//Max amount of bombs
var gameOver;

function setup() { 
	//sets up the Canvas and playing field
	gameOver =false;
  createCanvas(grid*sizeGrid+1,grid*sizeGrid+1);
	noCol = floor(height/grid);
	noRow = floor(width/grid);
	frameRate(60);
	createGrid();
} 

function draw() { 
  background(220);
  var counter = 0; //track how many cells are shown (calculate win)
	for(var x = 0; x< board.length; x++){
		board[x].show();
		if(board[x].clickedOn && !board[x].returnBomb())
			counter++;
	}
	if(counter == sizeGrid*sizeGrid - maxBombs){ //If only bombs are left => win game
		gameOver=true;
		showBombs(false);
	}
	else if(gameOver)
		showBombs(true);
}

var createGrid = function(){
	//Creates the cells and plants bombs randomly
	for(var c = 0; c < noCol;c++){
		for(var r = 0; r < noRow;r++){
			board[c*(noCol) + r] = new Cell(c,r);
			
		}
	}
	var bombList = addBombs();
	for(var b1 = 0; b1 < bombList.length;b1++){
		board[bombList[b1][0]*noCol + bombList[b1][1]].switchBomb();
	}
	
}
var addBombs = function(){
	//Plants bombs in field without having duplicates
	var randList = [];
	var randomXNo, randomYNo;
	for(var a = 0; a < maxBombs; a++){
			randomXNo = floor(random(0,noCol));
			randomYNo = floor(random(0,noRow));
		if(checkArray(randList,[randomXNo,randomYNo]) == false){
			//Only plants if there is no bomb existing there			
			randList.push([randomXNo,randomYNo]);
		}else{
			a--;
		}
	}
	return randList;
}
//Checks for an array(ar2) in ar1
function checkArray(ar1,ar2){
	for(var a1 = 0; a1 <ar1.length; ar1++){
		if(ar1[a1][0] == ar2[0] && ar1[a1][1] == ar2[1]){
			return true;
		}
	}
	return false;
}

function findCell(col,row){
	col = constrain(col,0,noCol-1);
	row = constrain(row,0,noRow-1);
	for(var z = 0; z<board.length;z++){
		if(board[z].col == col && board[z].row == row){
			return board[z];
		}
	}
}

function showBombs(gOver){
	//Shows all bombs on board
	for(var z =0; z<board.length;z++){
		if(board[z].bomb)
			board[z].clickedOn = true;
	}
	if(gOver)
		gameOverFunc();
	else
		winGame();
}

function gameOverFunc(){
	textSize(grid*(sizeGrid*.08));
	textAlign(CENTER);
	rect(0,sizeGrid*grid/2-(sizeGrid*5),sizeGrid*grid,sizeGrid*10); //use arbitrary values to adapt game over screen to different sized fields
	text("You hit a bomb, you lost!\nPress Space to continue.", sizeGrid*grid/2,sizeGrid*grid/2);

}

function winGame(){
	textSize(grid*(sizeGrid*.06));
	textAlign(CENTER);
	rect(0,sizeGrid*grid/2-(sizeGrid*5),sizeGrid*grid,sizeGrid*10); //use arbitrary values to adapt game over screen to different sized fields
	text("You avoided all the bombs and Won!\nPress Space to continue.", sizeGrid*grid/2,sizeGrid*grid/2);
}

function Cell(col,row){
	this.col = col;
	this.row = row;
	this.clickedOn = false; //Controls when cell is shown (false = hidden)
	this.bomb = false;
	
	this.switchBomb = function(){
		//Makes current cell a bomb
		this.bomb = true;
	}
	
	this.returnBomb = function(){
		return this.bomb;
	}
	this.checkBomb = function(){
		//Checks for bombs in the sorrounding cells
		var pos_exp = this.col*(noCol) + this.row;
		var noBombs = 0;
		for(var z1 = -1; z1 < 2; z1++){
			for(var z2 = -1; z2 < 2;z2++){
				var temp_col = constrain(this.col+z1, 0,noCol-1);
				var temp_row = constrain(this.row+z2,0,noRow-1);
				if(board[temp_col*noCol + temp_row].returnBomb()){
					noBombs++;
				}
			}
		}
		return noBombs;
	}
	
	this.show = function(){
		//Displays cell depending on state
		if(!this.clickedOn){
			//Displays white rectangle when unclicked
			rect(grid*this.col,grid*this.row,grid,grid);
		}
		else if(this.bomb){
			//Displays a bomb if clicked on and is a bomb
			ellipseMode(CORNER);
			ellipse(grid*this.col+8,grid*this.row+8,16,16);
		}
		else{
			//Displays number of neighboring bombs if it is a regular cell
			if(this.clickedOn){
				textSize(32);
				textAlign(LEFT);
				text(this.checkBomb(),grid*this.col+6,grid*(this.row+1)-4);
			}
		}
	}
	this.clicked = function(){
		if(this.bomb)
			gameOver = true;
		if(!this.clickedOn){
			this.clickedOn = true;
			this.floodFillinit();
			console.log("Clicked!");
		}
	}
	this.floodFillinit = function(){
		//Never show if it is a bomb
		if (this.bomb)
			return;
		
		this.clickedOn = true;
		if(this.checkBomb() !=0)
			return;
		
		//Run method on squares sorrounding this one
		for(var q1 = -1; q1 < 2; q1++){
			for(var q2 = -1; q2 < 2;q2++){
				var temp_col = constrain(this.col+q1, 0,noCol-1);
				var temp_row = constrain(this.row+q2,0,noRow-1);
				if(!board[temp_col*noCol+temp_row].clickedOn){
				board[temp_col*noCol + temp_row].floodFillinit();
			}
			}
		}
	}
	
}
function keyPressed(){
	if(keyCode == 32 && gameOver)
		setup();
}

function mousePressed(){
	if(gameOver)
		return;
	var mX = constrain(mouseX,0,width);
	var mY = constrain(mouseY,0,height);
	mX = floor(map(mX,0,width,0,noCol));
	mY = floor(map(mY,0,height,0,noRow));
	var current_cell = findCell(mX,mY);
	current_cell.clicked();
}
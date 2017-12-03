function Player(){
	this.speed = createVector(0,5);
	this.playerNo; //What is their player number
	this.pos; //Position of player
	this.controlScheme; //Controls for the respective player
	this.size = [10,60];//width, height; respective sizes for the player
	this.setPlayer = function(noP){
		switch(noP){//Sets settings based on if they are player 1 or 2
			case 1:
				this.playerNo = 1;
				this.pos = createVector(20,height/2-(this.size[1]/2));//creates player 1 on the left hand of the screen 20 pixels from the left
				this.controlScheme = [38,40]; //up, down; respective keycodes(up arrow, down arrow)
				console.log("Player 1 Created!");
				break;
			case 2:
				this.playerNo = 2;
				this.pos = createVector(width-(20+this.size[0]),height/2-(this.size[1]/2));//create player 2 on the right hand of the screen 20 pixels from the right
				this.controlScheme = [87,83];//up, down; respective keycodes(a,w)
				console.log("Player 2 Created!");
				break;
			default:
				return 0;
		}
	}
	this.move = function(keys){
		if(keys[this.controlScheme[0]] && (this.pos.y - this.speed.y > 0)){//if pressed up, goes up at a speed of 3 as long as it does not go beyond the top of the screen
			this.pos.sub(this.speed);
		}
		if(keys[this.controlScheme[1]] && (this.pos.y + this.speed.y + this.size[1] < height)){//if pressed down, goes down at a speed of 3 as long as it does not go beyond the bottom of the screen
			this.pos.add(this.speed);
		}
	}
	this.show = function(){//draws the rectangle
		noStroke();
		rectMode(CORNER);
		rect(this.pos.x,this.pos.y,this.size[0],this.size[1]);
	}
	this.update = function(k){//k is the list of keys currently pressed, used for movement;
		this.move(k);
		this.show();
	}

}
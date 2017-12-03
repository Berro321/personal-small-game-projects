function Ball(){
	this.pos = createVector(width/2,height/2);
	this.size = 16;
	this.tempSpeed = ceil(random(2,3));
	this.vel = createVector(
		(random()<=0.5 ? (-1) : 1)*this.tempSpeed,
		(random()<=0.5 ? (-1) : 1)*this.tempSpeed);
	this.show = function(){
		noStroke();
		ellipse(this.pos.x,this.pos.y,this.size,this.size);
	}
	this.collisionCheck = function(){
		//first check for out of bounds (height and width)
		if(this.pos.y + this.vel.y > height || this.pos.y + this.vel.y < 0){
			var tempY = this.vel.y;
			var tempX = this.vel.x;
			this.vel = createVector(tempX,(-1)*tempY);
		}
		//Check for collision with paddles
		var c1 = this.circleCollision(player1);
		var c2 = this.circleCollision(player2);
		if(c1 || c2){
			//If collision with player, changes x value (soon to be changed based on surface hit)
			var tempY = this.vel.y;
			var tempX = this.vel.x;
			this.vel = createVector((-1)*tempX,tempY);
			this.vel.mult(1.1);
		}
		//Check sides for player score
		if(this.pos.x < 0){
			score(2);
		}
		if(this.pos.x > width){
			score(1);
		}
	}
	//Takes care of the rectangle circle collision
	this.circleCollision = function(p){
		var pPos = createVector(this.pos.x,this.pos.y);//Saves player position
		var distX = Math.abs(pPos.x -p.pos.x -(p.size[0]/2));
		var distY = Math.abs(pPos.y - p.pos.y - (p.size[1]/2));

		if(distX > this.size/2 + p.size[0]){return false;}
		if(distY > this.size/2 + p.size[1]){return false;}
		if(distX <= p.size[0]/2){return true;}
		if(distY <= p.size[1]/2){return true;}

		var dx = distX - p.size[0]/2;
		var dy = distY - p.size[1]/2;
		return (dx*dx + dy*dy <= (1/4)*this.size*this.size);
	}
	this.update = function(){
		this.collisionCheck();
		this.pos.add(this.vel);
		this.show();
	}
}
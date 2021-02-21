// Simple class example

function Flight(fp, posX, posY, image, canvasWidth, canvasHeight) {
	this.fp = fp;
	this.x = posX;
	this.y = posY;
	this.velX = 0;
	this.velY = 0;
	this.accelX = 0;
	this.accelY = 0;
	this.color = "#FF0000";
	this.radius = 10;
	this.image = image;

	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.speed = fp * 4;

	this.goingUp = false;
	this.goingDown = false;
	this.goingLeft = false;
	this.goingRight = false;
}

Flight.prototype.update = function() {
	if (this.goingUp) {
		this.y -= this.speed;
		if (this.y < 0) {this.y = 0;}
	}
	if (this.goingDown) {
		this.y += this.speed;
		if (this.y > this.canvasHeight) {this.y = this.canvasHeight;}
	}
	if (this.goingLeft) {
		this.x -= this.speed;
		if (this.x < 0) {this.x = 0;}
	}
	if (this.goingRight) {
		this.x += this.speed;
		if (this.x > this.canvasWidth) {this.x = this.canvasWidth;}
	}

}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
Flight.prototype.hitTest = function(hitX,hitY) {
	return((hitX > this.x - this.radius)&&(hitX < this.x + this.radius)&&(hitY > this.y - this.radius)&&(hitY < this.y + this.radius));
}

//A function for drawing the particle.
Flight.prototype.drawToContext = function(theContext) {
	theContext.save();
	theContext.translate(this.x * this.fp, this.y * this.fp);
  	theContext.drawImage(this.image, 
  						-this.image.width/2, 
  						-this.image.height/2);
  	theContext.restore();
}

Flight.prototype.shouldDestroy = function(theContext) {
	return false;
}
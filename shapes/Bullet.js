// Simple class example

function Bullet(fp, posX, posY, des) {
	this.fp = fp;
	this.x = posX;
	this.y = posY;
	this.velX = 0;
	this.velY = 0;
	this.accelX = 0;
	this.accelY = 0;
	this.color = "#FF0000";
	this.mainBallStrokeStyle = "#000000";
	this.radius = 4;

	this.speed = des.speed;
	this.direction = des.dir;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
Bullet.prototype.update = function() {
	this.x += Math.cos(this.direction) * this.speed;
	this.y -= Math.sin(this.direction) * this.speed;

}

//A function for drawing the particle.
Bullet.prototype.drawToContext = function(theContext) {
	theContext.beginPath();
	theContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	theContext.fillStyle = this.color;
	theContext.fill();
	theContext.strokeStyle = this.mainBallStrokeStyle;
	theContext.lineWidth = 1 * this.fp;
	theContext.stroke();
}

Bullet.prototype.shouldDestroy = function(theContext) {
	return this.x < -100 || this.x > 1000 || this.y < -100 || this.y > 2000;
}
function GameStartScene(fp, canvasWidth, canvasHeight) {
	this.fp = fp;
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.readyToStart = true;
}
GameStartScene.prototype.update = function() {
}

//A function for drawing the particle.
GameStartScene.prototype.drawToContext = function(theContext) {
	if (this.readyToStart) {
		theContext.font = 50+this.fp+"px Comic Sans MS";
		theContext.fillStyle = "#000000";
		theContext.textAlign = "center";
		theContext.fillText("Game Start", this.canvasWidth/2, this.canvasHeight*2/3);
	}
}

GameStartScene.prototype.shouldDestroy = function(theContext) {
	return false;
}
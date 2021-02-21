function Game(){}

Game.prototype.init = function(fp, canvasWidth, canvasHeight, imageManager, soundManager){
	this.fp = fp;
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.imageManager = imageManager;
	this.soundManager = soundManager;

	this.bgm;
	this.initGame();
}

Game.prototype.initGame = function() {
	this.drawables = [];
	this.particles = [];
	this.drawables.push(this.particles);

	// 0=starter, 1=playing, 2=dead.
	this.gameState = 0;
	this.gameStartScene = new GameStartScene(this.fp, this.canvasWidth, this.canvasHeight);
	this.gameStartSceneHolder = [this.gameStartScene];

	

	this.drawables.push(this.gameStartSceneHolder);
}

Game.prototype.startGame = function() {
	// playing.
	this.gameState = 1;

	this.bgm = this.soundManager.play("v3-piano", 2.1);
	this.gameStartScene.readyToStart = false;

	this.bulletsHolder = [];


	this.flight = new Flight(this.fp, this.canvasWidth/2, this.canvasHeight*7/8,
			 imageManager.get("flightImage"), this.canvasWidth, this.canvasHeight);
	this.flightHolder = [this.flight];

	this.boss = new Boss(this.fp, this.canvasWidth/2, this.canvasHeight*1/4, this.bulletsHolder);
	this.bossHolder = [this.boss];
	this.boss.timer = this.bgm.currentTime*1000 - 2100;

	this.drawables.push(this.bulletsHolder);
	this.drawables.push(this.flightHolder);
	this.drawables.push(this.bossHolder);

}

Game.prototype.update = function(dt) {
	if (this.gameState == 1) {
		this.boss.update(dt);
		this.flight.update();
		for (var i = this.bulletsHolder.length - 1; i >= 0; i--) {
			this.bulletsHolder[i].update();
		}
	}
}

Game.prototype.inputDownListener = function(touchX, touchY) {
	if (this.gameState == 0) {
		this.startGame();
	} else if (this.gameState == 1) {
		// this.bulletsHolder.push(new Bullet(this.fp, touchX, touchY, {speed: 3*this.fp, dir: Math.Pi*3/2}));
	} else if (this.gameState == 2) {

	}
}

Game.prototype.keyDownListener = function(keyCode) {
	if (this.gameState != 1) return;
	if (keyCode == 87 /* W */) {
		this.flight.goingUp = true;
	}
	if (keyCode == 83 /* S */) {		
		this.flight.goingDown = true;
	}
	if (keyCode == 65 /* A */) {
		this.flight.goingLeft = true;
	}
	if (keyCode == 68 /* D */) {
		this.flight.goingRight = true;
	}
}

Game.prototype.keyUpListener = function(keyCode) {
	if (this.gameState != 1) return;
	if (keyCode == 87 /* W */) {
		this.flight.goingUp = false;
	}
	if (keyCode == 83 /* S */) {		
		this.flight.goingDown = false;
	}
	if (keyCode == 65 /* A */) {
		this.flight.goingLeft = false;
	}
	if (keyCode == 68 /* D */) {
		this.flight.goingRight = false;
	}
};

Game.prototype.inputMoveListener = function(touchX, touchY) {
}

Game.prototype.inputUpListener = function(touchX, touchY) {
	// this.bgm.pause();
}

Game.prototype.getDrawables = function() {
	return this.drawables;
}
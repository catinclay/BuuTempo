// Simple class example

function Boss(fp, posX, posY, bulletsHolder) {
	this.fp = fp;
	this.x = posX;
	this.y = posY;
	this.velX = 0;
	this.velY = 0;
	this.accelX = 0;
	this.accelY = 0;
	this.color = "#FF0000";
	this.radius = 30;

	this.timer = 0;
	this.bulletsHolder = bulletsHolder;

	this.eventQueue = [];
	this.context = {bullets: this.bulletsHolder};
	this.initBehavior();
	this.eventIndex = 0;
}

// Init behavior
Boss.prototype.initBehavior = function() {
	var boss = this;
	var currTime = 0;
	let incCurrTime = function(dur) {
		return currTime+=dur;
	}
	let pushBullet = function(incTime, bs) {
		boss.eventQueue.push(new TimingEvent(incCurrTime(incTime), boss.context, function(context){
			for (var i = bs.length - 1; i >= 0; i--) {
				let b = bs[i];
				context.bullets.push(new Bullet(boss.fp, b.x, b.y, {speed: b.s, dir:b.d}));
			}
		}));
	}
	let bulletsFlower = function(bn, dtheta = 3/2*Math.PI) {
		let r = [];
		for (let a = 0; a < bn; ++a){
			r.push({x:boss.x, y:boss.y, s:3*boss.fp, d:(2*Math.PI*a/bn) + dtheta});	
		}
		return r;
	}
	pushBullet(2750, bulletsFlower(36));
	pushBullet(1350, bulletsFlower(9));
	pushBullet(200, bulletsFlower(9));
	pushBullet(1250, bulletsFlower(9, 1/4*Math.PI));
	pushBullet(200, bulletsFlower(9, 1/4*Math.PI));

	pushBullet(1150, bulletsFlower(2, 0));
	for (let i = 0; i < 9; ++i) {
		pushBullet(200, bulletsFlower(2, (-1-i) * Math.PI/9))
	}

	pushBullet(350, bulletsFlower(8));
	pushBullet(350, bulletsFlower(4));
	pushBullet(350, bulletsFlower(4));
	pushBullet(350, bulletsFlower(4));
	pushBullet(350, bulletsFlower(8));

	pushBullet(350, bulletsFlower(4));
	pushBullet(350, bulletsFlower(4));
	pushBullet(350, bulletsFlower(4));
	pushBullet(350, bulletsFlower(8));

	pushBullet(350, bulletsFlower(4));
	pushBullet(350, bulletsFlower(4));
	pushBullet(350, bulletsFlower(4));
	pushBullet(350, bulletsFlower(8));

	pushBullet(350, bulletsFlower(4));
	pushBullet(150, bulletsFlower(4));
	pushBullet(150, bulletsFlower(4));

	pushBullet(350, bulletsFlower(4));
	pushBullet(150, bulletsFlower(4));
	pushBullet(150, bulletsFlower(4));


	
}

Boss.prototype.update = function(dt) {
	this.timer += dt;
	while (this.eventIndex < this.eventQueue.length && 
		this.eventQueue[this.eventIndex].shouldOccur(this.timer)) {
		this.eventQueue[this.eventIndex].occur();
		this.eventIndex++;
	} 
}

//A function for drawing the particle.
Boss.prototype.drawToContext = function(theContext) {
	theContext.beginPath();
	theContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	theContext.fillStyle = this.color;
	theContext.fill();
	theContext.strokeStyle = this.mainBallStrokeStyle;
	theContext.lineWidth = 3 * this.fp;
	theContext.stroke();
}

Boss.prototype.shouldDestroy = function(theContext) {
	return false;
}
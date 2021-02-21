var game = new Game();
var gameEngine = new GameEngine();
var imageManager = new ImageManager();
var soundManager = new SoundManager();
gameEngine.init(game, imageManager, soundManager, 60);

soundManager.registerSound({name:'failedSound', src:'sounds/failedSound.mp3'}, /*vol=*/1, /*dup=*/1);
soundManager.registerSound({name:'v3-piano', src:'sounds/V3-Piano.mp3'}, /*vol=*/1, /*dup=*/1);

var loadPromises = [
	imageManager.registerImage({name:'flightImage', path: 'image/', src:'flightIcon.png'}),
];

Promise.all(loadPromises).then(gameEngine.start());


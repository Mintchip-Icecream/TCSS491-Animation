const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./IdleRun-Sheet.png")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	canvas.style.backgroundImage = "url(./Forest-and-Trees-Free-Pixel-Backgrounds2.png)"
	canvas.style.backgroundPosition = "center"

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	gameEngine.addEntity(new Player(gameEngine));
	gameEngine.init(ctx);

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.start();
});

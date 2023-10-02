import MainScene from "./MainScene.js";

const config = {
	type: Phaser.AUTO,
	width: 600,
	height: 600,
	parent: "phaser-example",
	physics: {
		default: "arcade",
		arcade: {
			debug: false,
			gravity: { y: 0 },
		},
	},
	scene: MainScene,
};

const game = new Phaser.Game(config);

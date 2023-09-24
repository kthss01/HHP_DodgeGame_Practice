import MainScene from "./scenes/MainScene.js";

const config = {
	width: 512,
	height: 512,
	type: Phaser.AUTO,
	scene: [MainScene],
};

new Phaser.Game(config);

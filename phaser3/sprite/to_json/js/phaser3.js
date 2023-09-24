import Example from "./Example.js";

const config = {
	width: 512,
	height: 512,
	backgroundColor: "#2d2d2d",
	type: Phaser.AUTO,
	parent: "phaser-example",
	scene: [Example],
};

new Phaser.Game(config);

import Example from "./Example.js";

// const config = {
// 	width: 512,
// 	height: 512,
// 	backgroundColor: "#2d2d2d",
// 	type: Phaser.AUTO,
// 	parent: "phaser-example",
// 	scene: [Example],
// 	physics: {
// 		default: "matter",
// 		arcade: {
// 			debug: true,
// 		},
// 	},
// };

// new Phaser.Game(config);

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: "#1b1464",
	parent: "phaser-example",
	physics: {
		default: "matter",
		matter: {
			debug: true,
		},
	},
	scene: Example,
};

const game = new Phaser.Game(config);

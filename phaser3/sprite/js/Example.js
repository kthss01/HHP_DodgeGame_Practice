export default class Example extends Phaser.Scene {
	preload() {
		this.load.image("bunny", "assets/sprites/bunny.png");
	}

	create() {
		this.add
			.sprite(100, 100, "bunny") //
			.setOrigin(0); // origin 잡아줘야함
	}
}

// const config = {
// 	type: Phaser.AUTO,
// 	backgroundColor: "#2d2d2d",
// 	parent: "phaser-example",
// 	scene: Example,
// };

// const game = new Phaser.Game(config);

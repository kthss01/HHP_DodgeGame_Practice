export default class Example extends Phaser.Scene {
	preload() {
		this.load.image("bunny", "./assets/sprites/bunny.png");
	}

	create() {
		const bunny = this.add.sprite(400, 300, "bunny");

		//  Set a few properties:

		bunny.angle = 25;

		bunny.setScale(0.5);

		bunny.alpha = 0.5;

		bunny.flipY = true;

		console.log(bunny.toJSON());

		console.log(JSON.stringify(bunny));
	}
}

// const config = {
// 	type: Phaser.AUTO,
// 	backgroundColor: "#2d2d2d",
// 	parent: "phaser-example",
// 	scene: Example,
// };

// const game = new Phaser.Game(config);

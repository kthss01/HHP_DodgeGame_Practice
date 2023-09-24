class Example extends Phaser.Scene {
	preload() {
		this.load.image("block", "assets/sprites/block.png");
	}

	create() {
		this.cursors = this.input.keyboard.createCursorKeys();

		this.blockA = this.physics.add.image(100, 300, "block");
		this.blockB = this.physics.add
			.image(600, 300, "block")
			.setImmovable(true);

		this.blockA.body.onCollide = true;

		this.physics.add.collider(this.blockA, this.blockB);

		this.physics.world.on(
			"collide",
			(gameObject1, gameObject2, body1, body2) => {
				gameObject1.setAlpha(0.5);
				gameObject2.setAlpha(0.5);
			}
		);

		this.velocity = 500;
	}

	update() {
		this.blockA.setVelocity(0);

		if (this.cursors.left.isDown) {
			this.blockA.setVelocityX(-this.velocity);
		} else if (this.cursors.right.isDown) {
			this.blockA.setVelocityX(this.velocity);
		}

		if (this.cursors.up.isDown) {
			this.blockA.setVelocityY(-this.velocity);
		} else if (this.cursors.down.isDown) {
			this.blockA.setVelocityY(this.velocity);
		}
	}
}

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: "#1b1464",
	parent: "phaser-example",
	physics: {
		default: "arcade",
		matter: {
			gravity: {
				x: 0,
				y: 0,
			},
		},
	},
	scene: Example,
};

const game = new Phaser.Game(config);

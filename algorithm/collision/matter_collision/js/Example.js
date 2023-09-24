class Example extends Phaser.Scene {
	preload() {
		this.load.image("block", "assets/sprites/block.png");
	}

	create() {
		this.cursors = this.input.keyboard.createCursorKeys();

		this.blockA = this.matter.add.image(100, 300, "block");
		this.blockB = this.matter.add.image(600, 300, "block").setStatic(true);

		this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
			bodyA.gameObject.setTint(0xff0000);
			bodyB.gameObject.setTint(0x00ff00);
		});

		this.matter.world.on("collisionend", (event, bodyA, bodyB) => {
			bodyA.gameObject.setTint(0xffffff);
			bodyB.gameObject.setTint(0xffffff);
		});

		this.velocity = 5;
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
		default: "matter",
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

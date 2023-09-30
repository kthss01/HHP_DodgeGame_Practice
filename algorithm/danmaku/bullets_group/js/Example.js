class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "bullet");
	}

	fire(x, y) {
		this.body.reset(x, y);

		this.setActive(true);
		this.setVisible(true);

		this.setVelocityY(-300);
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);

		if (this.y <= -32) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
}

class Bullets extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 5000,
			key: "bullet",
			active: false,
			visible: false,
			classType: Bullet,
		});
	}

	fireBullet(x, y) {
		const bullet = this.getFirstDead(false);

		if (bullet) {
			bullet.fire(x, y);
		}
	}
}

class Example extends Phaser.Scene {
	constructor() {
		super();

		this.bullets;
		this.ship;
	}

	preload() {
		this.load.image("bullet", "assets/sprites/bullet7.png");
		this.load.image("ship", "assets/sprites/bsquadron1.png");
	}

	create() {
		this.bullets = new Bullets(this);

		this.ship = this.physics.add.image(400, 500, "ship");

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		this.ship.setVelocity(0);

		if (this.cursors.left.isDown) {
			this.ship.setVelocityX(-300);
		} else if (this.cursors.right.isDown) {
			this.ship.setVelocityX(300);
		}

		if (this.cursors.up.isDown) {
			this.bullets.fireBullet(this.ship.x, this.ship.y);
		}

		// if (this.cursors.up.isDown) {
		// 	this.ship.setVelocityY(-300);
		// } else if (this.cursors.down.isDown) {
		// 	this.ship.setVelocityY(300);
		// }
	}
}

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	parent: "phaser-example",
	physics: {
		default: "arcade",
		arcade: {
			debug: false,
			gravity: { y: 0 },
		},
	},
	scene: Example,
};

const game = new Phaser.Game(config);

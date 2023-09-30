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

	// fire(angle) {
	// 	this.body.reset();

	// 	this.setActive(true);
	// 	this.setVisible(true);

	// 	this.physics.velocityFromAngle(angle, 300, this.body.velocity);
	// }

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

	// fireBullet(angle) {
	// 	const bullet = this.getFirstDead(false);

	// 	if (bullet) {
	// 		bullet.fire(angle);
	// 	}
	// }
}

class Example extends Phaser.Scene {
	constructor() {
		super();

		this.bullets;
		this.ship;

		this.lastFired = 0;
	}

	preload() {
		this.load.image("bullet", "assets/sprites/bullet7.png");
		this.load.image("ship", "assets/sprites/bsquadron1.png");
	}

	create() {
		this.bullets = new Bullets(this);

		this.ship = this.physics.add.image(300, 500, "ship");

		this.cursors = this.input.keyboard.createCursorKeys();

		this.bulletFire();
	}

	update(time, delta) {
		this.ship.setVelocity(0);

		if (this.cursors.left.isDown) {
			this.ship.setVelocityX(-300);
		} else if (this.cursors.right.isDown) {
			this.ship.setVelocityX(300);
		}

		if (this.cursors.up.isDown && time > this.lastFired) {
			this.bullets.fireBullet(this.ship.x, this.ship.y);

			this.lastFired = time + 50;
		}

		// if (this.cursors.up.isDown) {
		// 	this.ship.setVelocityY(-300);
		// } else if (this.cursors.down.isDown) {
		// 	this.ship.setVelocityY(300);
		// }
	}

	bulletFire = () => {
		// 시간에 따른 발사
		this.time.addEvent({
			delay: 100,
			startAt: 100,
			repeat: this.bullets.getLength() - 1,
			callback: () => {
				// const ball = balls.getFirstDead();

				// ball.setActive(true);

				// this.physics.velocityFromAngle(cannon.angle, 300, ball.body.velocity);

				this.bullets.fireBullet(this.ship.x, this.ship.y);
				console.log("test");
			},
		});
	};
}

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
	scene: Example,
};

const game = new Phaser.Game(config);

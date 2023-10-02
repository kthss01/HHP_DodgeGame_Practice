class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "bullet");

		this.scene = scene;
	}

	fire(x, y, angle) {
		this.body.reset(x, y);

		this.setActive(true);
		this.setVisible(true);

		this.scene.physics.velocityFromAngle(
			Phaser.Math.RAD_TO_DEG * angle,
			300,
			this.body.velocity
		);
		// this.scene.physics.velocityFromRotation(angle, 300, this.body.velocity);
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

	fireBullet(x, y, angle) {
		const bullet = this.getFirstDead(false);

		if (bullet) {
			bullet.fire(x, y, angle);
		}
	}
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

		// this.bulletFire();

		this.graphics = this.add.graphics({
			lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 },
		});
		this.line = new Phaser.Geom.Line();

		this.angle = -3.14 / 2;
		Phaser.Geom.Line.SetToAngle(
			this.line,
			this.ship.x,
			this.ship.y - 10,
			this.angle,
			64
		);
	}

	update(time, delta) {
		this.ship.setVelocity(0);

		if (this.cursors.left.isDown) {
			// this.ship.setVelocityX(-300);
			this.angle -= 0.01;
			Phaser.Geom.Line.SetToAngle(
				this.line,
				this.ship.x,
				this.ship.y - 10,
				this.angle,
				64
			);
		} else if (this.cursors.right.isDown) {
			// this.ship.setVelocityX(300);
			this.angle += 0.01;
			Phaser.Geom.Line.SetToAngle(
				this.line,
				this.ship.x,
				this.ship.y - 10,
				this.angle,
				64
			);
		}

		if (this.cursors.left.isUp || this.cursors.right.isUp) {
			this.graphics.clear().strokeLineShape(this.line);
		}

		if (this.cursors.up.isDown && time > this.lastFired) {
			this.bullets.fireBullet(this.ship.x, this.ship.y, this.angle);

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

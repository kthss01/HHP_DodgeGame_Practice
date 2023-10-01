import Bullets from "./Bullets.js";

export default class MainScene extends Phaser.Scene {
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
		this.bullets.danmakuFire();

		// this.graphics = this.add.graphics({
		// 	lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 },
		// });
		// this.line = new Phaser.Geom.Line();

		// this.angle = -90;
		// Phaser.Geom.Line.SetToAngle(
		// 	this.line,
		// 	this.ship.x,
		// 	this.ship.y - 10,
		// 	Phaser.Math.DEG_TO_RAD * this.angle,
		// 	64
		// );

		this.ship.body.onOverlap = true;
		this.physics.add.overlap(this.ship, this.bullets);
		this.physics.world.on(
			"overlap",
			(gameObject1, gameObject2, body1, body2) => {
				gameObject1.setAlpha(0.5);
				gameObject2.setAlpha(0.5);

				// this.pause();
			}
		);

		this.score = this.add.text(
			0,
			0,
			`Left Bullet : ${this.bullets.getLength()}`,
			{
				fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
			}
		);
	}

	update(time, delta) {
		this.ship.setVelocity(0);

		if (this.cursors.left.isDown) {
			this.ship.setVelocityX(-300);

			// this.angle -= 1;
			// Phaser.Geom.Line.SetToAngle(
			// 	this.line,
			// 	this.ship.x,
			// 	this.ship.y - 10,
			// 	Phaser.Math.DEG_TO_RAD * this.angle,
			// 	64
			// );
		} else if (this.cursors.right.isDown) {
			this.ship.setVelocityX(300);

			// this.angle += 1;
			// Phaser.Geom.Line.SetToAngle(
			// 	this.line,
			// 	this.ship.x,
			// 	this.ship.y - 10,
			// 	Phaser.Math.DEG_TO_RAD * this.angle,
			// 	64
			// );
		}

		// if (this.cursors.left.isUp || this.cursors.right.isUp) {
		// 	this.graphics.clear().strokeLineShape(this.line);
		// }

		// if (this.cursors.up.isDown && time > this.lastFired) {
		// 	this.bullets.fireBullet(this.ship.x, this.ship.y, this.angle);

		// 	this.lastFired = time + 50;
		// }

		// if (this.cursors.up.isDown) {
		// 	this.ship.setVelocityY(-300);
		// } else if (this.cursors.down.isDown) {
		// 	this.ship.setVelocityY(300);
		// }

		this.score.setText(`Left Bullet : ${this.bullets.countActive(false)}`);
		if (this.bullets.countActive(false) == 0) {
			this.pause();
		}
	}

	// bulletFire = () => {
	// 	// 시간에 따른 발사
	// 	this.time.addEvent({
	// 		delay: 100,
	// 		startAt: 100,
	// 		repeat: this.bullets.getLength() - 1,
	// 		callback: () => {
	// 			// const ball = balls.getFirstDead();

	// 			// ball.setActive(true);

	// 			// this.physics.velocityFromAngle(cannon.angle, 300, ball.body.velocity);

	// 			this.bullets.fireBullet(this.ship.x, this.ship.y, this.angle);
	// 		},
	// 	});
	// };
}

const MAX_BULLET_COUNT = 5000;

class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);

		this.scene = scene;
	}

	fire(x, y, angle, speed = 300) {
		this.body.reset(x, y);

		this.setActive(true);
		this.setVisible(true);

		this.scene.physics.velocityFromAngle(angle, speed, this.body.velocity);
		// this.scene.physics.velocityFromRotation(angle, speed, this.body.velocity); // radian으로 회전
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);

		if (this.y <= -32) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
}

export default class Bullets extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			quantity: MAX_BULLET_COUNT,
			key: "bullet",
			frame: 0,
			// randomFrame: true,
			active: false,
			visible: false,
			classType: Bullet,
		});

		// console.log(this.getLength());
	}

	fireBullet(x, y, angle, speed) {
		const bullet = this.getFirstDead(false);

		if (bullet) {
			bullet.fire(x, y, angle, speed);
		}
	}

	danmakuFire = (isClockDir) => {
		this.angle = 90;
		this.angleSpeed = 25;
		this.speed = 100;
		this.delay = 200; // 발사 딜레이

		this.oneShootCnt = 4; // 한번에 발사 수
		this.shootCnt = 0;

		// 시간에 따른 발사
		this.scene.time.addEvent({
			delay: this.delay,
			startAt: 0,
			repeat: this.getLength() / 2 / this.oneShootCnt - 1,
			callback: () => {
				const x = 300;

				for (let i = 0; i < this.oneShootCnt; i++) {
					this.fireBullet(
						x,
						100,
						this.angle + (i / this.oneShootCnt) * 360,
						this.speed
					);

					this.shootCnt += 1;
				}

				this.angle = isClockDir
					? this.angle + this.angleSpeed
					: this.angle - this.angleSpeed;
			},
		});
	};

	getRandomInt = (max) => {
		return Math.floor(Math.random() * max);
	};
}
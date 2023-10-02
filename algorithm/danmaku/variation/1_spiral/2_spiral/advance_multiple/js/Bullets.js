const MAX_BULLET_COUNT = 5000;

class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "bullet");

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
			frameQuantity: MAX_BULLET_COUNT,
			key: "bullet",
			active: false,
			visible: false,
			classType: Bullet,
		});
	}

	fireBullet(x, y, angle, speed) {
		const bullet = this.getFirstDead(false);

		if (bullet) {
			bullet.fire(x, y, angle, speed);
		}
	}

	danmakuFire = () => {
		this.angle = 80;
		this.angleSpeed = 20;
		this.speed = 75;
		this.delay = 100; // 발사 딜레이

		this.cnt = 4; // 한번에 발사 수

		// 시간에 따른 발사
		this.scene.time.addEvent({
			delay: this.delay,
			startAt: 0,
			repeat: this.getLength() / this.cnt - 1,
			callback: () => {
				const x = 300;

				for (let i = 0; i < this.cnt; i++) {
					this.fireBullet(
						x,
						25,
						this.angle + (i / this.cnt) * 360,
						this.speed
					);
				}

				this.angle = this.angle + this.angleSpeed;
			},
		});
	};

	getRandomInt = (max) => {
		return Math.floor(Math.random() * max);
	};
}

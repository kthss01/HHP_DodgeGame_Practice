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
			frameQuantity: 50,
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

	danmakuFire = () => {
		this.angle = 45;
		this.cnt = 0;

		// 시간에 따른 발사
		this.scene.time.addEvent({
			delay: 100,
			startAt: 100,
			repeat: this.getLength() - 1,
			callback: () => {
				const x = 300;

				this.fireBullet(x, 50, this.angle);
				this.cnt += 1;

				if (this.cnt == this.getLength() / 2) {
					this.angle = 135;
				}
			},
		});
	};

	getRandomInt = (max) => {
		return Math.floor(Math.random() * max);
	};
}

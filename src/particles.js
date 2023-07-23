export default class Particles extends Phaser.Scene {
  preload() {
    // this.load.image("sky", "assets/sky.png");
    // this.load.image("aruru", "assets/aruru.png");

    this.load.image('bg', 'assets/sky.png');
    this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
  }

  create() {
    // this.add.image(400, 300, "sky");

    // const particles = this.add.particles(1, 1, "aruru", {
    //   speed: 100,
    //   scale: { start: 0.1, end: 0.5 },
    //   blendMode: "ADD",
    // });

    // const aruru = this.physics.add.image(200, 100, "aruru");

    // aruru.setVelocity(200, 300);
    // aruru.setBounce(1, 1);
    // aruru.setCollideWorldBounds(true);

    // particles.startFollow(aruru);

    const shape1 = new Phaser.Geom.Circle(0, 0, 160);
    // const shape2 = new Phaser.Geom.Ellipse(0, 0, 500, 150);
    // const shape3 = new Phaser.Geom.Rectangle(-150, -150, 300, 300);
    // const shape4 = new Phaser.Geom.Line(-150, -150, 150, 150);
    // const shape5 = new Phaser.Geom.Triangle.BuildEquilateral(0, -140, 300);

    const emitter = this.add.particles(400, 300, "flares", {
      frame: { frames: ["red"], cycle: true },
      blendMode: "ADD",
      lifespan: 500,
      scale: { start: 1.5, end: 0.1 },
    });

    emitter.addEmitZone({
      type: "edge",
      source: shape1,
      quantity: 32,
      total: 64,
    });
    // emitter.addEmitZone({
    //   type: "edge",
    //   source: shape2,
    //   quantity: 32,
    //   total: 64,
    // });
    // emitter.addEmitZone({
    //   type: "edge",
    //   source: shape3,
    //   quantity: 32,
    //   total: 64,
    // });
    // emitter.addEmitZone({
    //   type: "edge",
    //   source: shape4,
    //   quantity: 32,
    //   total: 64,
    // });
    // emitter.addEmitZone({
    //   type: "edge",
    //   source: shape5,
    //   quantity: 32,
    //   total: 64,
    // });
  }
}

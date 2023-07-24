import Phaser from "phaser";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const content1 = `
  더 이상 윤석열 정부, 국민의힘과 경쟁하지 않겠다.


  과거의 민주당과 경쟁하겠다.



`;

const content2 = `
  국정은 실패나 시행착오가 허용되지 않습니다.


  그들과 다르게 하는 것이 옳은 길이라는 것을


  보여주는 게 가장 최선의 복수입니다.


  기회는 평등할 것입니다.


  과정은 공정할 것입니다.

  
  결과는 정의로울 것입니다.



`;

function textBoxRun({ self, name, content }) {
  return new Promise((resolve, reject) => {
    var textBox = self.rexUI.add
      .textBox({
        x: 400,
        y: 500,
        innerBackground: self.rexUI.add.roundRectangle({
          radius: 20,
          color: COLOR_DARK,
          strokeColor: COLOR_LIGHT,
          strokeWidth: 2,
        }),

        text: self.rexUI.add.BBCodeText(0, 0, "", {
          fixedWidth: 500,
          fixedHeight: 65,

          fontSize: 20,
          wrap: {
            mode: "word",
            width: 500,
          },
        }),

        title: self.rexUI.add.label({
          width: 200,
          background: self.rexUI.add.roundRectangle({
            radius: 10,
            color: COLOR_PRIMARY,
            strokeColor: COLOR_LIGHT,
            strokeWidth: 2,
          }),
          text: self.add.text(0, 0, name, { fontSize: 24 }),
          align: "center",
          space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
            icon: 10,
            text: 10,
          },
        }),

        action: self.add
          .image(0, 0, "nextPage")
          .setTint(COLOR_LIGHT)
          .setVisible(false),

        space: {
          // For innerSizer
          innerLeft: 20,
          innerRight: 20,
          innerTop: 30,
          innerBottom: 20,

          title: -20,
          titleLeft: 30,
          icon: 10,
          text: 10,
        },
      })
      .layout();

    var scene = self;
    textBox
      .setInteractive()
      .on(
        "pointerdown",
        function () {
          var icon = this.getElement("action").setVisible(false);
          this.resetChildVisibleState(icon);
          if (self.isTyping) {
            this.stop(true);
          } else if (!self.isLastPage) {
            this.typeNextPage();
          } else {
            // Next actions
          }
        },
        textBox
      )
      .on(
        "pageend",
        function () {
          if (self.isLastPage) {
            return;
          }

          var icon = this.getElement("action").setVisible(true);
          this.resetChildVisibleState(icon);
          icon.y -= 30;
          var tween = scene.tweens.add({
            targets: icon,
            y: "+=30", // '+=100'
            ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            repeat: 0, // -1: infinity
            yoyo: false,
          });
        },
        textBox
      )
      .on("complete", function () {
        console.log("all pages typing complete");
        resolve();
      });
    //.on('type', function () {
    //})

    textBox.start(content, 10);
  });
}

class Demo extends Phaser.Scene {
  constructor() {
    super({
      key: "examples",
    });
  }

  preload() {
    this.load.scenePlugin({
      key: "rexuiplugin",
      url: "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      sceneKey: "rexUI",
    });

    this.load.image("moon", "assets/moon.jpg");

    this.load.image(
      "nextPage",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png"
    );
  }

  async create() {
    let moon = this.add.image(0, 0, "moon").setOrigin(0);
    moon.displayWidth = 900;
    moon.displayHeight = 500;

    // const b = await textBoxRun({
    //   self: this,
    //   name: "이재명",
    //   content: content1,
    // });
    const c = await textBoxRun({
      self: this,
      name: "문재인",
      content: content2,
    });
    console.log("foo");
  }

  update() {}
}

var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: Demo,
};

var game = new Phaser.Game(config);

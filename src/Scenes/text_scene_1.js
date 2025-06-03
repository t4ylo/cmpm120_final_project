class Text_scene_1 extends Phaser.Scene {
    constructor() {
        super("text_scene_1");
    }


    create() {
        this.add.rectangle(
            0,
            0,
            this.sys.game.config.width,
            this.sys.game.config.height,
            0x301934,
            0.7 
        ).setOrigin(0);

        this.add.text(game.config.width / 2, game.config.height / 2 - 100,
            "Oh hello. It looks like you have travelled further than you should have.", {
                fontFamily: 'Times',
                fontSize: '36px',
                color: '#ffffff',
                wordWrap: { width: 1000 },
                align: 'center'
            }).setOrigin(0.5);

        this.add.text(game.config.width / 2, game.config.height / 2,
            "Unfortunately, this means you will have to escape my dungeon. Good luck >:)", {
                fontFamily: 'Times',
                fontSize: '36px',
                color: '#ffffff',
                wordWrap: { width: 1000 },
                align: 'center'
            }).setOrigin(0.5);

        let continueText = this.add.text(game.config.width / 2, game.config.height / 2 + 150,
            "Press SPACE to continue", {
                fontFamily: 'Times',
                fontSize: '28px',
                color: '#ffffff'
            }).setOrigin(0.5);

        
        this.tweens.add({
            targets: continueText,
            alpha: { from: 1, to: 0 },
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.start("platformerScene");
        });
    }
}


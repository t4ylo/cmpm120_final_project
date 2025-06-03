class Title_screen extends Phaser.Scene {
    constructor() {
        super("title_screen");
    }


    create() {
        
        this.add.rectangle(
            0,
            0,
            this.sys.game.config.width,
            this.sys.game.config.height,
            0x301934,
            0.7 // Alpha value (0 = fully transparent, 1 = fully solid)
        ).setOrigin(0);

        my.sprite.title = this.add.image(game.config.width / 2, game.config.height / 2 - 125,"title_logo");
        my.sprite.title.setScale(0.45)


        this.add.text(game.config.width / 2, game.config.height / 2 + 200,
            "Use the arrow keys to move around.", {
                fontFamily: 'Times',
                fontSize: '36px',
                color: '#ffffff',
                wordWrap: { width: 1000 },
                align: 'center'
            }).setOrigin(0.5);

        this.add.text(game.config.width / 2, game.config.height / 2 + 250,
            "Press R to restart the current level.", {
                fontFamily: 'Times',
                fontSize: '36px',
                color: '#ffffff',
                wordWrap: { width: 1000 },
                align: 'center'
            }).setOrigin(0.5);

        this.add.text(game.config.width / 2, game.config.height / 2 + 300,
            "Have fun!", {
                fontFamily: 'Times',
                fontSize: '36px',
                color: '#ffffff',
                wordWrap: { width: 1000 },
                align: 'center'
            }).setOrigin(0.5);

        let continueText = this.add.text(game.config.width / 2, game.config.height / 2 + 350,
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
            this.scene.start("entryScene");
        });
    }
}
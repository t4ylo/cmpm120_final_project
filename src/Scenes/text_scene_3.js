class Text_scene_3 extends Phaser.Scene {
    constructor() {
        super("text_scene_3");
    }


    create() {

        this.add.text(game.config.width / 2, game.config.height / 2 - 100,
            "WHAT! How did you do that??", {
                fontFamily: 'Times',
                fontSize: '36px',
                color: '#ffffff',
                wordWrap: { width: 1000 },
                align: 'center'
            }).setOrigin(0.5);

        this.add.text(game.config.width / 2, game.config.height / 2,
            "You may have done that but you won't make it passed this. You must collect all coins AND collect a key and unlock the corresponding box before you can continue.", {
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
            this.scene.start("level_3Scene");
        });
    }
}
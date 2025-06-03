class Text_scene_4 extends Phaser.Scene {
    constructor() {
        super("text_scene_4");
    }


    create() {

        this.add.text(game.config.width / 2, game.config.height / 2 - 100,
            "Wow... well done. I suppose I need to make it more difficult for the next challenger.", {
                fontFamily: 'Times',
                fontSize: '36px',
                color: '#ffffff',
                wordWrap: { width: 1000 },
                align: 'center'
            }).setOrigin(0.5);

        this.add.text(game.config.width / 2, game.config.height / 2,
            "Congratulations, you have officially escaped my dungeon.", {
                fontFamily: 'Times',
                fontSize: '36px',
                color: '#ffffff',
                wordWrap: { width: 1000 },
                align: 'center'
            }).setOrigin(0.5);

        let continueText = this.add.text(game.config.width / 2, game.config.height / 2 + 150,
            "Press SPACE to play again.", {
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
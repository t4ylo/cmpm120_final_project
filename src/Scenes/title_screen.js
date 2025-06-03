class Title_screen extends Phaser.Scene {
    constructor() {
        super("title_screen");
    }


    create() {

        this.add.text(game.config.width / 2, game.config.height / 2,
            "Use the arrow keys to move around.", {
                fontFamily: 'Times',
                fontSize: '36px',
                color: '#ffffff',
                wordWrap: { width: 1000 },
                align: 'center'
            }).setOrigin(0.5);

        this.add.text(game.config.width / 2, game.config.height / 2 + 100,
            "Press R to restart the current level.", {
                fontFamily: 'Times',
                fontSize: '36px',
                color: '#ffffff',
                wordWrap: { width: 1000 },
                align: 'center'
            }).setOrigin(0.5);

        this.add.text(game.config.width / 2, game.config.height / 2 + 200,
            "Have fun!", {
                fontFamily: 'Times',
                fontSize: '36px',
                color: '#ffffff',
                wordWrap: { width: 1000 },
                align: 'center'
            }).setOrigin(0.5);

        let continueText = this.add.text(game.config.width / 2, game.config.height / 2 + 300,
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
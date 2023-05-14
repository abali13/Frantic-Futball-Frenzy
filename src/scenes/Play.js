class Play extends Phaser.Scene{
    constructor(){
        super("playScen");
        this.highScore = 0;
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('field', './assets/field.png');
        this.load.image('ball1', './assets/Ball1_24x24.png');
        this.load.image('defender', './assets/Defender.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.atlas('myball', './assets/spritesheet.png', './assets/sprites.json')
      }
    create(){
        this.scene.launch('musicScene'); 
        //this.add.text(20, 20, "Rocket Patrol Play");
        this.field = this.add.tileSprite(0, 0, 640, 480, 'field').setOrigin(0,0);
        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
        this.p1Rocket = new Rocket(this, borderUISize + 12 , game.config.height / 2, 'ball1').setOrigin(0.5, 0);


        /*
        this.sprite = me.game.add.sprite(me.game.world.centerX, 300, 'myball');
        this.sprite.animations.add(
            'moving',
            ['Ball1_24x24', 'Ball2_24x24', 'Ball3_24x24', 'Ball4_24x24'], 
            5,
            true

        );
        this.sprite.animations.play('moving');
        */
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'defender', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*7 , 'defender', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*10 , 'defender', 0, 10).setOrigin(0,0);
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //score initialize
        this.p1Score = 0;
        
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, game.config.height - (borderUISize + borderPadding*4), currScore, scoreConfig);

        this.scoreRight = this.add.text(game.config.height, game.config.height - (borderUISize + borderPadding*4), this.highScore, scoreConfig);    
        
        
        //Game over flag
        this.gameOver = false;
        //Flag for timed speed
        this.speedFlag = false;



        /*
        // 10 minute play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(600000, () => {this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER, youre 2 goated', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
        this.gameOver = true;
        }, null, this);
        */

        /*
        //Timer text config 
        this.timeInSec = (game.settings.gameTimer) / 1000;
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        */
        //this.timerText = this.add.text((game.config.height / 2) + borderPadding, game.config.height - (borderUISize + borderPadding*4), "<-CurrScore|HighScorer->", timerConfig);

      

       
    }


    update(){

        /*
        //Updating fire
        if(this.p1Rocket.isFiring){
            this.fireText.setVisible(false);
        }
        else{
            this.fireText.setVisible(true);
        }
        

        //Updating timer 
        //this.timerText.text = this.clock.getRemainingSeconds();
        
        //console.log(Phaser.Math.FloorTo(this.clock.getElapsedSeconds));
        if(currScore > 0 && currScore % 9 == 0 && !this.speedFlag){
            this.speedFlag = true;
           
            this.ship01.moveSpeed += 0.1;               // update spaceships (x3)
            this.ship02.moveSpeed += 0.1;
            this.ship03.moveSpeed += 0.1;
            //console.log("Speed Increased")
            //game.settings.spaceShipSpeed = 10;
        }
        */
        

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }



        //Movement of the field
        if(!this.gameOver){
            this.field.tilePositionX += 4;
        }
        
        if(!this.gameOver){  
            this.p1Rocket.update();
            this.ship01.update();               // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.scoreLeft.text = currScore;
            if(currScore > this.highScore){
                this.highScore = currScore;
                this.scoreRight.text = this.highScore;
            }
        }
        


        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            console.log(currScore);
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            
            this.gameOver = true;
            currScore = 0;
            //this.sound.play('sfx_finalWhistle');
           
            
            
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.gameOver = true;
           
            //this.clock.delay += 10000;
            
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.gameOver = true;
            currScore = 0;
            //this.sound.play('sfx_finalWhistle');
            //this.clock.delay += 10000;
            
        }


        //Adding text for gameover
        if(this.gameOver){
            let scoreConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'left',
                padding: {
                top: 5,
                bottom: 5,
                },
                fixedWidth: 0
            }
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);

            let creditsConfig = {
                fontFamily: 'Courier',
                fontSize: '10px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'left',
                padding: {
                top: 5,
                bottom: 5,
                },
                fixedWidth: 0
            }
            this.add.text(game.config.width/2, game.config.height/2 + 128, 'Credits:\nBackground Music: https://tunetank.com/track/3107-powerful-workout/ \nWhistle Sfx: https://www.zapsplat.com/?s=referee+whistle+&post_type=music&sound-effect-category-id=\n  ', creditsConfig).setOrigin(0.5);

            
        }


    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true;
        } else {
          return false;
        }
      }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
          
        });
        // score add and repaint
        //this.p1Score += ship.points;
        
        /*
        if(this.p1Score > this.highScore){
            this.highScore = this.p1Score;
            this.scoreRight.text = this.highScore;
        }
        */

        //this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, currScore, scoreConfig);
        
        //this.scoreLeft.setText(currScore);
        this.sound.play('sfx_explosion'); 
        this.sound.play('sfx_finalWhistle');        
      }  
      
}
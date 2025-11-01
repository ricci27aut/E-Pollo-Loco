class Character extends MovableObject {
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_HIT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    offset = {
        top: 110,
        bottom: 0,
        left: 40,
        right: 50
    };
    walking_sound = new Audio('audio/walking.mp3');
    jumping_sound = new Audio('audio/jumping.mp3');
    idle_sound = new Audio('audio/snoring.mp3');
    hurt_sound = new Audio('audio/character-hurt.mp3');
    height = 260;
    width = 160;
    y = 170;
    speed = 5;
    bottleEnergy = 0;
    bottleCollected = 0;
    jumpIntervalId = 0;
    intervalTime = 0;
    idleTime = 0;
    SPACE = false;
    jumping = false;
    longIdle = false;
    world;
    looksRight;
    looksLeft;
    jumpInterval;


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HIT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.animate();
        this.applyGravitiy();
    }


    animate() {
        setInterval(() => {
            this.intervalForMovement();
        }, 1000 / 60)

        setInterval(() => {
            this.intervalForImages();
            if (this.world.keyboard.SPACE && !this.inAir) {
                this.inAir = true;
            }
        }, 130);
    }


    /**
     * Hier werden für die Bilder die animation aufgerufen.
     */
    intervalForImages() {
        if (this.isDead()) {
            this.gameIsOver();
        } else if (this.isHurt()) {
            this.hurtAnimation();
        } else if (this.inAir) {
            this.jumpAnimation();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.walkAnimation();
        } else if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
            this.idleAnimation();
        };
    }


    gameIsOver() {
        setTimeout(() => {
            endGame = true;
        }, 500)
        this.playAnimation(this.IMAGES_DEAD);
        this.idle_sound.pause();
        this.resetLongIdle();
    }


    /**
     * Wenn der Character verletzt wird. (Bilder)
     */
    hurtAnimation() {
        this.playAnimation(this.IMAGES_HIT);
        this.idle_sound.pause();
        this.resetLongIdle();
        if (!muteSounds) {
            this.hurt_sound.currentTime = 0;
            this.hurt_sound.play();
        }
    }


    /**
     * Für das Springen zuständig. (Bilder)
     */
    jumpAnimation() {
        if (this.jumpIntervalId == 0) {
            this.jumpInterval = setInterval(() => {
                this.playAnimationJump(this.IMAGES_JUMPING);
            }, 100)
            this.jumpIntervalId++;
        }
        this.idle_sound.pause()
    }


    /**
     * Geh animation. (Bilder)
     * Hier wird geprüft ob der Character am Boden ist. 
     */
    walkAnimation() {
        if (!this.inAir && this.y > 167) {
            this.idle_sound.pause()
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    /**
     * Falls der character langeweile hat werden hier weider Functionen aufgerufen.
     * Hier wird ein Zietpunkt erstellt ab welcher sekunder der Character langeweile hat.
     */
    idleAnimation() {
        if (this.intervalTime == 0) {
            this.idleTime = new Date().getTime();
        }
        this.intervalTime++;
        this.characterIsIdle();
    }


    /**
     * Hier wird unterschieden ob der Character erst vor kurzem langeweile hat oder schon länger.
     */
    characterIsIdle() {
        if (!this.longIdle) {
            this.playAnimation(this.IMAGES_IDLE);
        }
        if (this.checkIdleTime()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            if (!muteSounds) {
                this.idle_sound.play();
            } else {
                this.idle_sound.pause();
            }
        } else {
            this.idle_sound.pause();
        }
    }


    /**
     * 
     * @returns vergange zeit zwischen zwei Zeiten wenn diese über 5 sek. ist.
     */
    checkIdleTime() {
        let timepassed = new Date().getTime() - this.idleTime;
        timepassed = timepassed / 1000;
        return timepassed > 5
    }


    /**
     * Hier wird alles ausgeführt was der Character tun sollte. (Laufen, Springen)
     */
    intervalForMovement() {
        this.walking_sound.pause();
        this.characterMovesRight();
        this.characterMovesLeft();
        this.characterJumps();
        this.world.camera_x = -this.x + 50;
    }


    /**
     * Character sollte sich nach Rechts bewegen.
     * Hier wird auch eine Variable vergeben wenn der character nach Rechts läuft dann werden durch die Variable die Flaschen auch nach Rechts geworfen.
     */
    characterMovesRight() {
        if (this.world.keyboard.RIGHT && this.x < 2156) {
            if (!this.isAboveGround() && !muteSounds) {
                this.walking_sound.play();
            }
            this.moveRight();
            this.otherDirection = false;
            this.looksLeft = false;
            this.looksRight = true;
            this.resetLongIdle();
        }
    }


    /**
     * Character should move to the left.
     * Here a variable is also assigned, if the character runs to the left, then the variable also throws the bottles to the left.
     */
    characterMovesLeft() {
        if (this.world.keyboard.LEFT && this.x > -1330) {
            if (!this.isAboveGround() && !muteSounds) {
                this.walking_sound.play();
            }
            this.moveLeft();
            this.resetLongIdle();
            this.otherDirection = true;
            this.looksLeft = true;
            this.looksRight = false;
        }
    }


    /**
     * Character should jump.
     * Checked if the character is on the ground.
     */
    characterJumps() {
        if (this.jumping && !this.isAboveGround()) {
            this.jump();
            setTimeout(() => {
                this.jumping = false;
            }, 500)
            this.resetLongIdle();
            if (!muteSounds) {
                this.jumping_sound.currentTime = 0;
                this.jumping_sound.play();
            }
        }
    }


    /**
     * If the character has picked up a bottle.
     */
    collectBottle() {
        this.bottleEnergy += 20;
        this.bottleCollected += 1;
        if (this.bottleEnergy > 100) {
            this.bottleEnergy = 100;
        }
    }


    /**
     * Resets the timer where the character got bored.
     */
    resetLongIdle() {
        this.intervalTime = 0;
        this.longIdle = false;
    }
}
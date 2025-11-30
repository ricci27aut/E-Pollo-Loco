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

    offset = { top: 110, bottom: 0, left: 40, right: 50 };

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
    jumpInterval = null;

    intervalTime = 0;
    idleTime = 0;

    SPACE = false;
    jumping = false;
    longIdle = false;
    inAir = false;
    justStomped = false;

    world;
    looksRight;
    looksLeft;

    /**
     * Initializes the character, loads all animation sprites, and starts gravity + animations.
     */
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

    /**
     * Starts periodic update loops:
     * - 60 FPS for movement and input
     * - 130 ms for image selection (animations)
     */
    animate() {
        setInterval(() => {
            this.intervalForMovement();
        }, 1000 / 60);

        setInterval(() => {
            this.intervalForImages();
            // No SPACE trigger here → avoids double jump
        }, 130);
    }

    /**
     * Chooses which animation to display depending on the current state.
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
        } else {
            this.idleAnimation();
        }
    }

    /**
     * Handles death animation and marks the game as ended.
     */
    gameIsOver() {
        setTimeout(() => { endGame = true; }, 500);
        this.playAnimation(this.IMAGES_DEAD);
        this.idle_sound.pause();
        this.resetLongIdle();
    }

    /**
     * Plays the hurt animation and sound when the character takes damage.
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
     * Starts the jump animation loop once per jump.
     * Plays the first jump frame immediately for a smooth response.
     */
    jumpAnimation() {
        if (this.jumpIntervalId != 0) {
            this.idle_sound.pause();
            return;
        }

        this.currentImageJump = 0;
        this.playAnimationJump(this.IMAGES_JUMPING);

        this.jumpInterval = setInterval(() => {
            this.playAnimationJump(this.IMAGES_JUMPING);
        }, 60);

        this.jumpIntervalId = 1;
        this.idle_sound.pause();
    }

    /**
     * Plays walking animation only if the character is on the ground.
     */
    walkAnimation() {
        if (!this.inAir && this.y > 167) {
            this.idle_sound.pause();
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Starts or continues idle animation depending on how long the player is idle.
     */
    idleAnimation() {
        if (this.intervalTime == 0) {
            this.idleTime = new Date().getTime();
        }
        this.intervalTime++;
        this.characterIsIdle();
    }

    /**
     * Chooses between normal idle and long idle animations (snoring).
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
     * Checks if the character has been idle for more than 5 seconds.
     * @returns {boolean} True if idle time exceeds 5 seconds.
     */
    checkIdleTime() {
        let timepassed = new Date().getTime() - this.idleTime;
        timepassed = timepassed / 1000;
        return timepassed > 5;
    }

    /**
     * Handles all movement logic per frame:
     * - Detects jump trigger
     * - Moves character left/right
     * - Updates camera position
     */
    intervalForMovement() {
        this.walking_sound.pause();
        this.characterMovesRight();
        this.characterMovesLeft();
        this.characterJumps();
        this.world.camera_x = -this.x + 50;
    }

    /**
     * Moves the character to the right if within map boundaries.
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
     * Moves the character to the left if within map boundaries.
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
    * Executes the jump action and delegates post-jump cleanup.
    */
    characterJumps() {
        const pressed = this.world.keyboard.SPACE;
        const onGround = !this.isAboveGround();
        const canJump = pressed && onGround && !this.jumping && !this.inAir;
        if (!canJump) return;

        this.jumping = true;
        this.inAir = true;
        this.jump();
        this.resetLongIdle();

        if (muteSounds) return;
        this.jumping_sound.currentTime = 0;
        this.jumping_sound.play();
    }

    /**
     * Resets all jump-related flags and intervals after the jump ends.
     */
    finishJump() {
        this.jumping = false;
        this.inAir = false;

        if (this.jumpInterval) {
            clearInterval(this.jumpInterval);
            this.jumpInterval = null;
        }

        this.jumpIntervalId = 0;
    }

    /**
     * Updates bottle-related stats when a bottle is collected.
     */
    collectBottle() {
        this.bottleEnergy += 20;
        this.bottleCollected += 1;
        if (this.bottleEnergy > 100) {
            this.bottleEnergy = 100;
        }
    }

    /**
     * Resets idle timers and flags (used whenever the player performs an action).
     */
    resetLongIdle() {
        this.intervalTime = 0;
        this.longIdle = false;
    }
}

class Endboss extends MovableObject {
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    offset = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
    };
    alertSound = new Audio('audio/chicken-boss-alert.mp3')
    height = 350;
    width = 300;
    speed = 4.2;
    y = 100;
    x = 2200
    energy = 100;
    alertImagesCounter = 0;
    deadImagesCounter = 0;
    audioIndex = 0;
    attack = false;
    walking = false;
    hurt = false;


    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.intervalForMovement();
        }, 1000 / 60);

        setInterval(() => {
            this.intervalForImages();
        }, 200);
    }


    /**
     * Here things are carried out what the final boss should do.
     */
    intervalForMovement() {
        if (this.alertImagesCounter == 10) {
            if (world.character.x < this.x) {
                this.endBossWalkLeft();
            } else if (world.character.x > this.x + 200) {
                this.endBossWalkRight();
            }
        }
    }


    endBossWalkLeft() {
        setTimeout(() => {
            this.moveLeft();
            this.otherDirection = false;
            this.walking = true;
        }, 200)
    }


    endBossWalkRight() {
        setTimeout(() => {
            this.moveRight();
            this.otherDirection = true;
            this.walking = true;
        }, 100)
    }


    /**
     * Here it checks where the character is, if this is in a certain zone, a function is called that displays images of the enboss.
     */
    intervalForImages() {
        if (world.character.x > this.x - 600) {
            this.whichImageShouldPlay();
            if (!muteSounds && this.audioIndex == 0) {
                this.alertSound.play();
                this.audioIndex++;
            }
        }
    }


    /**
     * Which images should be displayed. It is checked what the final boss is doing.
     */
    whichImageShouldPlay() {
        if (this.energy == 0) {
            this.gameIsOver();
        } else if (this.hurt) {
            this.endBossGetHurt();
        } else if (this.alertImagesCounter < 10) {
            this.playAnimation(this.IMAGES_ALERT);
            this.alertImagesCounter++;
        } else if (this.attack) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.walking) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    /**
     * Falls der Endboss verletzt wird, werden bestimmte Bilder angezeigt.
     */
    endBossGetHurt() {
        this.playAnimation(this.IMAGES_HURT);
        setTimeout(() => {
            this.hurt = false
        }, 200)
    }


    gameIsOver() {
        setTimeout(() => {
            endGame = true;
        }, 400)
        if (this.deadImagesCounter == 0) {
            this.playAnimation(this.IMAGES_DEAD);
            this.alertImagesCounter += 10;
            setTimeout(() => {
                this.deadImagesCounter++;
            }, 250)
        }
    }
}
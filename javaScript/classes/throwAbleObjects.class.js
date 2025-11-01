class ThrowAbleObjects extends MovableObject {
    IMAGES_THROW_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    offset = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    };
    bottle_sound = new Audio('audio/bottleBreaks.mp3');
    bottleImageCount = 0;
 

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_THROW_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 70;
        this.animate();
        this.applyGravitiy();
    }


    animate() {
        this.speedY = 15;
        this.intervalForMovement();
        setInterval(() => {
            this.intervalForImages();  
        }, 1000 / 15)
    }


    /**
     * If a bottle is created, it should be turned in a certain direction.
     */
    intervalForMovement() {
        if (!this.bottleIsColliding) {
            if (world.character.looksRight) {
                setInterval(() => {
                    this.x += this.speed * 50
                }, 1000 / 60)
            } else if (world.character.looksLeft) {
                setInterval(() => {
                    this.x -= this.speed * 50
                }, 1000 / 60)
            }
        }
    }


    /**
     * For the pictures if a bottle is created.
     */
    intervalForImages() {
        if (this.bottleIsColliding && this.bottleImageCount == 0) {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            setTimeout(() => {
                this.bottleImageCount++;
            }, 200)
        } else {
            this.playAnimation(this.IMAGES_THROW_BOTTLE);
        }
    }
}
class MovableObject extends DrawableObejects {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    coinEnergy = 0;
    bottleIsColliding = false;
    currentImageJump = 0;


    /**
     * For gravitation
     */
    applyGravitiy() {
        setInterval(() => {
            if (this instanceof ThrowAbleObjects) {
                if (!this.bottleIsColliding) {
                    this.speedY -= this.acceleration;
                    this.y -= this.speedY;
                }
            } else if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    /**
    * checks if the object is above ground
    */
    isAboveGround() {
        return this.y < 170;
    }

    /**
    * Moves the object to the left.
    */
    moveLeft() {
        this.x -= this.speed
    }

    /**
    * Moves the object to the right.
    */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Here the pictures are gone through for the animation.
     * @param {Array} images - Array of the respective Object.
     */
    playAnimation(images) {
        this.currentImage = this.currentImage % images.length;
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Here the pictures are gone through for the animation.
     * @param {Array} images - Array of the respective Object.
     */
    playAnimationJump(images) {
        this.currentImageJump = this.currentImageJump % images.length;
        let path = images[this.currentImageJump];
        this.img = this.imageCache[path];
        this.currentImageJump++;
        this.checkJumpImageCharacter(path);
    }

    /**
    * Here the pictures are gone through for the animation of a chicken.
    */
    playAnimationJumpChicken(images) {
        this.currentImageJump = this.currentImageJump % images.length;
        let path = images[this.currentImageJump];
        this.img = this.imageCache[path];
        this.currentImageJump++;
        if (path == 'img/2_character_pepe/3_jump/J-39.png') {
            world.character.inAir = false;
            clearInterval(world.character.jumpInterval);
            world.character.jumpIntervalId = 0;
        }
    }


    /**
     * Character should only jump if a specific image is displayed.
     * @param {string} path - String from the pictures.
     */
    checkJumpImageCharacter(path) {
        const last = 'img/2_character_pepe/3_jump/J-39.png';
        if (path !== last || !world || !world.character) return;

        world.character.finishJump();
    }


    /**
     * Checks whether the character of a chicken jumps or from ground.
     * @param {string} chickenJump 
     */
    jump(chickenJump) {
        if (chickenJump == 'chickenJump') {
            this.speedY = 8;
        } else {
            this.speedY = 15;
        }
    }


    /**
     * Here it is checked whether a collision takes place.
     * @param {object} mo - Are for example enemies and coins. 
     * @returns Returns either False or True.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
    * check if NPC got a hit
    */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
    * check if NPC got a hit
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
    * check if NPC is dead
    */
    isDead() {
        return this.energy == 0;
    }

    /**
    * check if NPC got a coin
    */
    hitCoin() {
        this.coinEnergy += 20;
        if (this.coinEnergy > 100) {
            this.coinEnergy = 100;
        }
    }
}
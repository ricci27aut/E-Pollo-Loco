class MovableObject extends DrawableObejects {
    // ALLES HIER IST NUR EINE VORLAGE FÜR DIE ANDEREN CLASSEN. DIES ALLES IST AUCH IN DEN ANDEREN CLASSEN.
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


    isAboveGround() {
        return this.y < 170;
    }


    moveLeft() {
        this.x -= this.speed
    }


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
        if (path == 'img/2_character_pepe/3_jump/J-34.png') {
            world.character.jumping = true;
        }
        if (path == 'img/2_character_pepe/3_jump/J-39.png') {
            world.character.inAir = false;
            clearInterval(world.character.jumpInterval);
            world.character.jumpIntervalId = 0;
        }
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


    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }


    isDead() {
        return this.energy == 0;
    }


    hitCoin() {
        this.coinEnergy += 20;
        if (this.coinEnergy > 100) {
            this.coinEnergy = 100;
        }
    }
}
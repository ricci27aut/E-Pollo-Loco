class World {
    throwAbleObjects = [];
    coinSound = new Audio('audio/coin-pickup.mp3');
    bottleSound = new Audio('audio/bottle-pickup.mp3');
    backgroundSound = new Audio('audio/background-song.mp3');
    muteSounds = false;
    bottleThrowTimeBetween = 0;
    ctx;
    canvas;
    keyboard;
    camera_x;
    winScreen;
    loseScreen;
    character;
    healthBar;
    coinBar;
    bottleBar;
    bossHealthBar;
    level = level1;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        if (startGame) {
            this.createClasses();
            this.draw();
            this.checkCollisions();
            this.setWorld();
            this.throwBottle();
            this.backgroundSounds();
        }
    }


    backgroundSounds() {
        setInterval(() => {
            if (!muteSounds) {
                this.backgroundSound.volume = 0.1;
                this.backgroundSound.play();
            } else {
                this.backgroundSound.pause();
            }
        }, 20)
    }


    /**
     * Everything is created in the world.
     */
    createClasses() {
        this.winScreen = new EndScreen('img/9_intro_outro_screens/win/won_1.png');
        this.loseScreen = new EndScreen('img/9_intro_outro_screens/game_over/game over!.png');
        this.character = new Character();
        this.level = level1;
        this.healthBar = new HealthBar();
        this.coinBar = new CoinBar();
        this.bottleBar = new BottleBar();
        this.bossHealthBar = new BossHealthBar();
    }


    /** 
     * If we press T, we will check if we are allowed to create a bottle. (Character has collected bottles)
     */
    throwBottle() {
        setInterval(() => {
            if (this.keyboard.T) {
                if (this.characterCollectedBottles()) {
                    let timepassed = new Date().getTime() - this.bottleThrowTimeBetween;
                    timepassed = timepassed / 1000
                    if (timepassed > 0.3) {
                        this.createBottle();
                    }
                }
            }
        }, 100)
    }


    /**
     * Create bottle.
     */
    createBottle() {
        this.bottleThrowTimeBetween = new Date().getTime();
        this.character.resetLongIdle();
        this.character.bottleCollected -= 1;
        let throwBottle = new ThrowAbleObjects(this.character.x + 70, this.character.y + 100);
        this.throwAbleObjects.push(throwBottle);
        this.character.bottleEnergy -= 20;
        this.bottleBar.setPercentage(this.character.bottleEnergy, this.bottleBar.IMAGES_BOTTLE_BAR);
    }


    characterCollectedBottles() {
        return this.character.bottleCollected > 0
    }


    /**
     * All collisions are checked here.
     */
    checkCollisions() {
        setInterval(() => {
            this.collisionCharacterToChickens();
            this.collisionCharacterToCoin();
            this.collisionCharacterToBottle();
            this.collisionBottleToChickens();
        }, 100);
    }


    /**
     * Collision Character with Chicken.
     */
    collisionCharacterToChickens() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isColliding(enemy)) {
                this.isCharacterAboveTheChicken(i);
            } else {
                this.level.enemies[i].attack = false;
            }
        });
    }


    /**
     * Here it is checked if the character is above the chicken, if so, the chicken is killed.
     * @param {index} i - The respective chicken where we have a collision. 
     */
    isCharacterAboveTheChicken(i) {
        this.level.enemies[i].attack = true;
        if (this.character.y < 160) {
            this.checkIfEnbossOrChicken(i);
        } else {
            this.character.hit();
            this.healthBar.setPercentage(this.character.energy, this.healthBar.IMAGES_HEALTH_BAR);
        }
    }


    /**
     * 
     * @param {index} i - If i = 0 we have the final boss, if not we have the chicken. 
     */
    checkIfEnbossOrChicken(i) {
        if (i > 0) {
            this.level.enemies[i].chickenEnergy = 0;
            this.level.enemies[i].offset = {
                top: 100,
            };
            setTimeout(() => {
                this.level.enemies.splice(i, 1);
            }, 300)
            this.character.jump('chickenJump');

            if (!muteSounds) {
                this.character.jumping_sound.currentTime = 0;
                this.character.jumping_sound.play();
            }

        }
    }


    /**
     * Collision Character with Coin.
     */
    collisionCharacterToCoin() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.character.hitCoin();
                this.coinBar.setPercentage(this.character.coinEnergy, this.coinBar.IMAGES_COIN_BAR);
                this.level.coins.splice(i, 1);
                if (!muteSounds) {
                    this.coinSound.currentTime = 0;
                    this.coinSound.play();
                }
            }
        });
    }


    /**
     * Collision Character with bottle.
     */
    collisionCharacterToBottle() {
        this.level.bottle.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottle.splice(i, 1);
                this.character.collectBottle();
                this.bottleBar.setPercentage(this.character.bottleEnergy, this.bottleBar.IMAGES_BOTTLE_BAR);
                if (!muteSounds) {
                    this.bottleSound.currentTime = 0;
                    this.bottleSound.play();
                }
            }
        });
    }


    /**
     * Collision bottle with Chicken.
     */
    collisionBottleToChickens() {
        this.level.enemies.forEach((enemy, i) => {
            for (let b = 0; b < this.throwAbleObjects.length; b++) {
                const bottle = this.throwAbleObjects[b];
                if (bottle.isColliding(enemy)) {
                    this.bottleHitEnemy(b, i);
                }
            }
        });
    }


    /**
     * Bottle hits a enemy
     * @param {index} b - index from bottle.
     * @param {index} i - index from Chicken.
     */
    bottleHitEnemy(b, i) {
        if (!muteSounds) {
            this.throwAbleObjects[b].bottle_sound.play();
        }
        this.throwAbleObjects[b].bottleIsColliding = true;
        if (i == 0) {
            this.bottleHitEnboss(i);
        } else {
            this.bottleHitChicken(i);
        }
        setTimeout(() => {
            this.throwAbleObjects.splice(b, 1);
        }, 50)
    }


    bottleHitEnboss(i) {
        this.level.enemies[i].energy -= 20;
        this.level.enemies[i].hurt = true;
        this.bossHealthBar.setPercentage(this.level.enemies[0].energy, this.bossHealthBar.IMAGES_BOSS_HEALTH_BAR);
        if (this.level.enemies[i].energy == 0) {
            this.level.enemies[i].offset = {
                top: 100,
            };
        }
    }


    bottleHitChicken(i) {
        this.level.enemies[i].chickenEnergy = 0;
        this.level.enemies[i].offset = {
            top: 100,
        };
        setTimeout(() => {
            this.level.enemies.splice(i, 1)
        }, 700)
    }


    setWorld() {
        this.character.world = this;
    }


    /**
     * Here everything is create on the canvas.
     */
    draw() {
        if (startGame) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.translate(this.camera_x, 0);
            this.movableObjectsInCanvas();
            this.ctx.translate(-this.camera_x, 0);
            this.fixObjectsInCanvas();
            this.ctx.translate(-this.camera_x, 0);
        }
        if (endGame) {
            this.showScreenWhenGameIsOver();
        }
        this.callDrawFunctionAgain();
    }


    /**
     * Fixed Objects in the Canvas
     */
    fixObjectsInCanvas() {
        this.addToMap(this.bossHealthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottle);
    }


    /**
     * Mobile stuff in the canvas
     */
    movableObjectsInCanvas() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwAbleObjects);
        this.addToMap(this.character);
    }


    showScreenWhenGameIsOver() {
        if (this.level.enemies[0].energy == 0) {
            this.addToMap(this.winScreen);
        } else if (this.character.energy == 0) {
            this.addToMap(this.loseScreen);
        }
        if (!muteSounds) {
            muteSounds = true;
        }
    }


    /**
     * Draw function is called again and again.
     */
    callDrawFunctionAgain() {
        let self = this;
        if (!endGame) {
            requestAnimationFrame(function () {
                self.draw();
            })
        }
    }



    /**
     * Here the ARRAY are all drawn.
     * @param {object} objects - Objects such as, Enemies and Background.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    /**
     * Everything is drawn here.
     * @param {object} mo - movableobject such as, enemies, character and background.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Here the canvas is played when the character moves to the left, for example.
     * @param {object} mo - object such as Character or Endboss.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Here the canvas is reflected back.
     * @param {object} mo - object such as Character or Endboss.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
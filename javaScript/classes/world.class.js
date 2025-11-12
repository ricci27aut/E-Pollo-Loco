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

/**
 * Periodically controls background audio playback based on the global mute flag.
 * Interval: every 20 ms.
 * @returns {void}
 */
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
 * Instantiates and assigns all core world entities and UI bars.
 * Creates win/lose screens, character, level, and HUD elements.
 * @returns {void}
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
 * Listens for the 'T' key and, if bottles are available and the cooldown
 * @returns {void}
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
 * Creates and registers a new thrown bottle object; updates character bottle energy and HUD.
 * Also resets the character's long-idle state.
 * @returns {void}
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

/**
 * Checks if the character has at least one bottle collected.
 * @returns {boolean} True if at least one bottle is available.
 */
characterCollectedBottles() {
    return this.character.bottleCollected > 0
}

/**
 * Sets up periodic collision checking between character, items, and enemies.
 * Polling interval: 100 ms.
 * @returns {void}
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
 * Handles collisions between the character and all chickens/enemies.
 * Sets attack state and delegates to vertical-position logic.
 * @returns {void}
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
 * Determines whether the character is above a chicken and resolves the outcome:
 * - If above threshold: jump-kill logic is triggered
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
 * Resolves whether the collided enemy is the Endboss or a regular chicken.
 * - i === 0 → Endboss (handled elsewhere)
 * @param {number} i - Index of the enemy in `this.level.enemies`.
 * @returns {void}
 */
checkIfEnbossOrChicken(i) {
    if (i > 0) {
        this.level.enemies[i].chickenEnergy = 0;
        this.level.enemies[i].offset = {
            top: 100,
            left: -20,
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
 * Resolves collisions between character and coins: collects coin, updates HUD, plays sound.
 * @returns {void}
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
 * Resolves collisions between character and bottles: collects bottle, updates HUD, plays sound.
 * @returns {void}
 */
collisionCharacterToBottle() {
    this.level.bottle.forEach((bottle, i) => {
        if (this.character.isColliding(bottle)) {
            this.level.bottle.splice(i, 1);
            this.character.collectBottle();
            this.bottleBar.setPercentage(this.character.bottleEnergy, this.bottleBar.IMAGES_BOTTLE_BAR);
            if (!muteSounds) {
                this.bottleSound.currentTime = 0;
                this.bottleSound.play();}}
    });
}

/**
 * Checks collisions between all thrown bottles and all enemies,
 * dispatching to bottle-hit resolution.
 * @returns {void}
 */
collisionBottleToChickens() {
    this.level.enemies.forEach((enemy, i) => {
        for (let b = 0; b < this.throwAbleObjects.length; b++) {
            const bottle = this.throwAbleObjects[b];
            if (bottle.isColliding(enemy)) {
                this.bottleHitEnemy(b, i);}}
            });
}

/**
 * Handles bottle collision with an enemy:
 * - Plays the bottle sound (if not muted)
 * - Removes the bottle shortly after impact
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
        this.throwAbleObjects.splice(b, 1);}, 50)
}

/**
 * Applies bottle damage/effects to the Endboss and updates the boss health bar.
 * @param {number} i - Index of the Endboss (expected 0).
 * @returns {void}
 */
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

/**
 * Applies bottle hit effects to a regular chicken and schedules its removal.
 * @param {number} i - Index of the chicken in `this.level.enemies`.
 * @returns {void}
 */
bottleHitChicken(i) {
    this.level.enemies[i].chickenEnergy = 0;
    this.level.enemies[i].offset = {
        top: 100,
    };
    setTimeout(() => {
        this.level.enemies.splice(i, 1)
    }, 700)
}

/**
 * Injects a back-reference from the character to this world instance.
 * @returns {void}
 */
setWorld() {
    this.character.world = this;
}

/**
 * Main render/update pass for a single frame:
 * - Clears canvas and applies camera transform
 * - Draws movable and fixed objects
 * @returns {void}
 */
draw() {
    if (startGame) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.movableObjectsInCanvas();
        this.ctx.translate(-this.camera_x, 0);
        this.fixObjectsInCanvas();
        this.ctx.translate(-this.camera_x, 0);}
    if (endGame) {
        this.showScreenWhenGameIsOver();
    }
    this.callDrawFunctionAgain();
}

/**
 * Draws fixed-position UI elements and restores world-space lists afterward.
 * @returns {void}
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
 * Draws all movable world-space objects in the correct order.
 * @returns {void}*/
movableObjectsInCanvas() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwAbleObjects);
    this.addToMap(this.character);
}

/**
 * Displays the appropriate end screen depending on the game outcome.
 * Also ensures sounds are muted once the game is over.
 * @returns {void}
 */
showScreenWhenGameIsOver() {
    if (this.level.enemies[0].energy == 0) {
        this.addToMap(this.winScreen);
    } else if (this.character.energy == 0) {
        this.addToMap(this.loseScreen);}
    if (!muteSounds) {
        muteSounds = true;}
}

/**
 * Requests the next animation frame unless the game has ended.
 * Stores the RAF id on `this._rafId` for external cancellation.
 * @returns {void}
 */
callDrawFunctionAgain() {
    let self = this;
    if (!endGame) {
        this._rafId = requestAnimationFrame(() => this.draw());}
}

/**
 * Adds an array of drawable objects to the canvas map in order.
 * @param {Array<Object>} objects - Collection of drawables (enemies, background, items, etc.).
 * @returns {void}
 */
addObjectsToMap(objects) {
    objects.forEach(o => {
        this.addToMap(o);})
}

/**
 * Draws a single movable object to the canvas, respecting its facing direction.
 * @param {Object} mo - A drawable/movable object (e.g., enemy, character, background).
 * @returns {void}
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
 * Flips the drawing context horizontally to render an object facing the other direction.
 *
 * @param {Object} mo - Object with width/x used for the transform.
 * @returns {void}
 */
flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
}

/**
 * Restores the object's X and the canvas transform after a horizontal flip.
 * @param {Object} mo - The same object previously flipped.
 * @returns {void}
 */
flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
}
}
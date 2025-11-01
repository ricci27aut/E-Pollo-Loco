class Level {
    clouds;
    character;
    enemies;
    coins;
    backgroundObjects;
    bottle;

    
    /**
     * 
     * @param {Array} enemies - Array of opponents.
     * @param {Array} clouds - Array of clouds.
     * @param {Array} coins - Array of coins.
     * @param {Array} bottle - Array of the bottles.
     * @param {Array} backgroundObjects - Array of the background.
     */
    constructor(enemies, clouds, coins, bottle, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
        this.bottle = bottle;
    }
}
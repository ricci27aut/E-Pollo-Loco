let level1;

function initLevel() {
    level1 = new Level(
        [
            new Endboss(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
        ],
        [
            new Clouds('img/5_background/layers/4_clouds/1.png', 0),
            new Clouds('img/5_background/layers/4_clouds/2.png', 720),
            new Clouds('img/5_background/layers/4_clouds/1.png', 1300),
        ],
        [
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -1439),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -1439),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -1439),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -1439),
            new BackgroundObject('img/5_background/layers/air.png', -720),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/air.png', -1),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -1),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -1),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -1),
            new BackgroundObject('img/5_background/layers/air.png', 718),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 718),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 718),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 718),
            new BackgroundObject('img/5_background/layers/air.png', 1437),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1437),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1437),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1437),
            new BackgroundObject('img/5_background/layers/air.png', 2156),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2156),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2156),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2156)
        ]
    );
}
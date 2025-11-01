class BossHealthBar extends DrawableObejects {
    IMAGES_BOSS_HEALTH_BAR = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];
    endbossPercentage = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES_BOSS_HEALTH_BAR);
        this.x = 510;
        this.y = 40;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100, this.IMAGES_BOSS_HEALTH_BAR);
    }
}
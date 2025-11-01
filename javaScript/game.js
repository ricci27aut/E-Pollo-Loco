let startScreen = new StartScreen();
let keyboard = new Keyboard();
let startGame = false;
let endGame = false;
let canvas;
let world;
let muteSounds;
let test = false;


function init() {
    canvas = document.getElementById('canvas');
    if (startGame) {
        this.initLevel();
    } else {
        startScreen.draw(canvas.getContext('2d'));
    }
    world = new World(canvas, keyboard);
    mobileBtn();
    checkIfGameIsOver();    
}


function checkIfGameIsOver() {
    setInterval(() => {
        if (endGame) {
            document.getElementById('game-over-buttons').style.display = 'flex';
        } else {
            document.getElementById('game-over-buttons').style.display = 'none';
        }
    }, 100)
}


function reloadWebsite() {
    window.location.href = window.location.href;
}


/**
 * Change the image of sound and full screen when we click on this.
 * @param {string} src - get the string from which button it was called (volume / fullscreen)
 */
function changeImgSrc(src) {
    let fullscreen = document.getElementById('fullscreen');
    let volumeBTN = document.getElementById('volume-img');
    let fullscreenBTN = document.getElementById('fullscreen-img');
    let menuTop = document.getElementById('menu-top');
    let menuBottom = document.getElementById('menu-bottom');
    let playAgainDiv = document.getElementById('game-over-buttons');
    changeImgVolumeAndMute(src, volumeBTN);
    changeImgFullscreenAndGoToFullscreen(src, fullscreen, fullscreenBTN, menuTop, menuBottom, playAgainDiv);
}


/**
 * 
 * @param {string} src - get the string from which button it was called (volume / fullscreen).
 * @param {object} volumeBTN - id from volume img.
 */
function changeImgVolumeAndMute(src, volumeBTN) {
    if (src == 'volume') {
        if (volumeBTN.getAttribute('src') == 'icons/mute.png') {
            muteSounds = false;
            volumeBTN.setAttribute('src', 'icons/volume.png');
        } else if (volumeBTN.getAttribute('src') == 'icons/volume.png') {
            volumeBTN.setAttribute('src', 'icons/mute.png');
            muteSounds = true;
        }
    };
}


/**
 * 
 * @param {string} src - get the string from which button it was called (volume / fullscreen)
 * @param {object} fullscreen - ID of entire fullscreen div.
 * @param {object} fullscreenBTN - ID of fullscreen img.
 * @param {object} menuTop - ID from menu bar at the top.
 * @param {object} menuBottom - ID of menu bar at the bottom.
 * @param {object} playAgainDiv - ID of Play Again Div.
 */
function changeImgFullscreenAndGoToFullscreen(src, fullscreen, fullscreenBTN, menuTop, menuBottom, playAgainDiv) {
    if (src == 'screen') {
        if (fullscreenBTN.getAttribute('src') == 'icons/fullscreen.png') {
            fullscreenBTN.setAttribute('src', 'icons/smallscreen.png');
            menuTop.style.width = '100vw';
            menuBottom.style.width = '100vw';
            playAgainDiv.style.width = '100vw';
            goFullScreen(fullscreen);
        } else if (fullscreenBTN.getAttribute('src') == 'icons/smallscreen.png') {
            fullscreenBTN.setAttribute('src', 'icons/fullscreen.png');
            menuTop.style.width = '720px';
            menuBottom.style.width = '720px';
            playAgainDiv.style.width = '720px';
            closeFullscreen(fullscreen);
        }
    };
}


/**
 * 
 * @param {object} fullscreen - ID of entire fullscreen div.
 */
function goFullScreen(fullscreen) {
    if (fullscreen.requestFullscreen) {
        fullscreen.requestFullscreen();
    } else if (fullscreen.webkitRequestFullscreen) {
        fullscreen.webkitRequestFullscreen();
    } else if (fullscreen.msRequestFullscreen) {
        fullscreen.msRequestFullscreen();
    }
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
}


function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    canvas.style.width = '720px';
    canvas.style.height = '480px';
}


function startTheGame() {
    startGame = true;
    init();
    document.getElementById('play-button').style.display = 'none';
}


function mobileBtn() {
    mobileButtonLeft();
    mobileButtonRight();
    mobileButtonJump();
    mobileButtonThrow();
}


function mobileButtonLeft() {
    document.getElementById('btn-left-mobile').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btn-left-mobile').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
}


function mobileButtonRight() {
    document.getElementById('btn-right-mobile').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btn-right-mobile').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
}


function mobileButtonJump() {
    document.getElementById('btn-jump-mobile').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btn-jump-mobile').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}


function mobileButtonThrow() {
    document.getElementById('btn-throw-mobile').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.T = true;
    });
    document.getElementById('btn-throw-mobile').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.T = false;
    });
}


function playAgain() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    endGame = false;
    startGame = true;
    muteSounds = false;
    init();
    document.getElementById('game-over-buttons').style.display = 'none';
}


/**
 * This is called when a key is pressed.
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 84) {
        keyboard.T = true;
    }
});


/**
 * This is called when a key is released.
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 84) {
        keyboard.T = false;
    }

});
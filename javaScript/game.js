let startScreen = new StartScreen();
let keyboard = new Keyboard();
let startGame = false;
let endGame = false;
let canvas;
let world;
let muteSounds;
let test = false;
let gameOverInterval = null;
let VolumeData = JSON.parse(localStorage.getItem('volumeState')) || { mute: false };


/**
 * Initialize the app:
 * - Grabs the canvas
 * - Restores the correct sound icon
 * - Draws only the start screen (no World yet)
 */
function init() {
    canvas = document.getElementById('canvas');
    loadRightIcon();
    startScreen.draw(canvas.getContext('2d'));
}

/**
 * Starts (or restarts) a short interval that toggles the visibility of the
 * "game over" buttons based on the global `endGame` flag.
 * Ensures old intervals are cleared before creating a new one.
 */
function checkIfGameIsOver() {
    if (gameOverInterval) {
        clearInterval(gameOverInterval);
        gameOverInterval = null;
    }
    gameOverInterval = setInterval(() => {
        const btns = document.getElementById('game-over-buttons');
        if (endGame) {
            btns.classList.remove('none');
            btns.style.display = 'flex';
        } else {
            btns.style.display = 'none';
        }
    }, 100);
}

/**
 * Handles UI icon toggles for volume and fullscreen controls and triggers
 * the corresponding effects (mute/unmute, enter/exit fullscreen).
 *
 * @param {string} src - Which control triggered the change ('volume' | 'screen').
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
 * Toggles the volume icon and updates global mute state + persistence.
 *
 * @param {string} src - Which control triggered the change ('volume' | 'screen').
 * @param {HTMLImageElement} volumeBTN - The <img> element showing the volume icon.
 */
function changeImgVolumeAndMute(src, volumeBTN) {
    if (src == 'volume') {
        if (volumeBTN.getAttribute('src') == 'icons/mute.png') {
            muteSounds = false;
            volumeBTN.setAttribute('src', 'icons/volume.png');
            saveToLocalStorage(false);
        } else if (volumeBTN.getAttribute('src') == 'icons/volume.png') {
            volumeBTN.setAttribute('src', 'icons/mute.png');
            muteSounds = true;
            saveToLocalStorage(true);
        }
    };
}

/**
 * Toggles fullscreen mode and synchronizes related UI widths and icons.
 *
 * @param {string} src - Which control triggered the change ('volume' | 'screen').
 * @param {HTMLElement} fullscreen - The container element to request fullscreen on.
 * @param {HTMLImageElement} fullscreenBTN - The <img> showing fullscreen/smallscreen icon.
 * @param {HTMLElement} menuTop - The top menu bar element.
 * @param {HTMLElement} menuBottom - The bottom menu bar element.
 * @param {HTMLElement} playAgainDiv - The "Play Again" button container.
 */
function changeImgFullscreenAndGoToFullscreen(src, fullscreen, fullscreenBTN, menuTop, menuBottom, playAgainDiv) {
    if (src == 'screen') {
        if (fullscreenBTN.getAttribute('src') == 'icons/fullscreen.png') {
            fullscreenBTN.setAttribute('src', 'icons/smallscreen.png');
            menuTop.style.width = '100vw'; menuBottom.style.width = '100vw'; playAgainDiv.style.width = '100vw';
            goFullScreen(fullscreen);
        } else if (fullscreenBTN.getAttribute('src') == 'icons/smallscreen.png') {
            fullscreenBTN.setAttribute('src', 'icons/fullscreen.png');
            menuTop.style.width = '720px'; menuBottom.style.width = '720px'; playAgainDiv.style.width = '720px';
            closeFullscreen(fullscreen);
        }
    };
}

/**
 * Requests browser fullscreen on the provided container and expands the canvas to viewport size.
 *
 * @param {HTMLElement} fullscreen - The container element to request fullscreen on.
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

/**
 * Exits browser fullscreen (if active) and restores canvas to default size.
 */
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

/**
 * Starts a new game session:
 * - Sets `startGame` true
 * - Initializes level + world
 * - Hides the play button
 * - Shows mobile controls
 */
function startTheGame() {
    startGame = true;
    startGameWorld();
    document.getElementById('play-button').classList.add('none');
    document.getElementById('footer').classList.add('none');
    toggleNoneMobileButton();
}

/**
 * Attaches touch handlers for all mobile controls.
 */
function mobileBtn() {
    mobileButtonLeft();
    mobileButtonRight();
    mobileButtonJump();
    mobileButtonThrow();
}

/**
 * Registers touch handlers for moving left on mobile.
 */
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

/**
 * Registers touch handlers for moving right on mobile.
 */
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

/**
 * Registers touch handlers for jumping on mobile.
 */
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

/**
 * Registers touch handlers for throwing on mobile.
 */
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

/**
 * Fully resets the game back to the start screen:
 * - Clears intervals and animation frames
 * - Resets flags
 * - Clears canvas and UI
 * - Redraws the start screen
 */
function restartGame() {
    if (gameOverInterval) {
        clearInterval(gameOverInterval);
        gameOverInterval = null;
    }

    if (world && world._rafId) {
        cancelAnimationFrame(world._rafId);
        world._rafId = null;
    }

    for (let i = 1; i < 99999; i++) clearInterval(i);

    endGame = false;
    startGame = false;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('game-over-buttons').classList.add('none');
    document.getElementById('play-button').classList.remove('none');
    document.getElementById('footer').classList.remove('none');
    document.getElementById('menu-bottom').classList.add('none');
    init();
}

/**
 * Shows the bottom mobile menu by removing the `none` class.
 */
function toggleNoneMobileButton() {
    document.getElementById('menu-bottom').classList.remove('none')

}

/**
 * Keyboard handlers: sets pressed directional/action keys on keydown.
 * Uses legacy keyCode mapping for compatibility with existing code.
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
 * Keyboard handlers: unsets directional/action keys on keyup.
 * Uses legacy keyCode mapping for compatibility with existing code.
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

/**
 * Syncs UI when exiting fullscreen via ESC or browser UI.
 * Restores canvas and top menu width when no element is in fullscreen.
 */
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        canvas.style.width = '720px';
        canvas.style.height = '480px';
        document.getElementById('menu-top').style.width = '720px';
    }
});

/**
 * Persists the mute state to localStorage.
 *
 * @param {boolean} isMuted - Whether the app should be muted.
 */
function saveToLocalStorage(isMuted) {
    VolumeData = { mute: isMuted };
    localStorage.setItem('volumeState', JSON.stringify(VolumeData));
}

/**
 * Restores the correct volume icon and sets `muteSounds` from localStorage.
 * If no saved state exists, defaults to unmuted.
 */
function loadRightIcon() {
    const volumeBTN = document.getElementById('volume-img');
    const savedData = JSON.parse(localStorage.getItem('volumeState'));

    if (savedData && savedData.mute) {
        muteSounds = true;
        volumeBTN.setAttribute('src', 'icons/mute.png');
    } else {
        muteSounds = false;
        volumeBTN.setAttribute('src', 'icons/volume.png');
    }
}

/**
 * Bootstraps a running World/game session:
 * - Initializes level data
 * - Creates the World instance
 * - Binds mobile controls
 * - Starts the game-over watcher
 */
function startGameWorld() {
    this.initLevel();

    world = new World(canvas, keyboard);

    mobileBtn();
    checkIfGameIsOver();
}
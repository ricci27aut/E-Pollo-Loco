# El Pollo Loco

A browser-based 2D platform game built with HTML, CSS, and vanilla JavaScript. Guide Pepe through a desert landscape, collect coins and salsa bottles, avoid hostile chickens, and defeat the final boss.

## Features

- Side-scrolling gameplay rendered with the HTML5 Canvas API.
- Animated character with walking, jumping, idle, hurt, and death states.
- Regular chickens, small chickens, and a final boss.
- Collectible coins and throwable salsa bottles.
- Health, coin, bottle, and boss health indicators.
- Background music and sound effects, with a mute preference saved in local storage.
- Keyboard controls and on-screen touch controls.
- Responsive layout, fullscreen mode, and a landscape prompt for mobile devices.
- Win and game-over screens with options to play again or return to the menu.

## Getting Started

No build step, package installation, or backend is required.

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Serve `index.html` using a local static server, such as the **Live Server** extension.
4. Open the local URL in a modern browser and click **Play**.

Alternatively, if Python is installed, run the following command from the project root:

```sh
python -m http.server 8000
```

Then visit [localhost:8000](http://localhost:8000).

## Controls

| Action | Keyboard |
| --- | --- |
| Move left | Left Arrow |
| Move right | Right Arrow |
| Jump | Space |
| Throw a bottle | T |

On touch devices, use the on-screen movement, jump, and throw buttons. Hold your phone or tablet in landscape orientation.

Use the volume and fullscreen buttons above the game to toggle sound and fullscreen mode.

## How to Play

Explore the level and collect coins and salsa bottles. Jump onto regular chickens to defeat them, or hit them with a thrown bottle. Avoid enemy contact to preserve your health.

Collect bottles before throwing them, and use them to damage the final boss. Defeat the boss to win. If Pepe loses all his health, the game ends. Choose **Play again** to restart or **To Menu** to return to the start screen.

## Technologies

- **HTML5** for the page structure and canvas.
- **CSS3** for styling, responsive layouts, and local fonts.
- **Vanilla JavaScript** with classes for game entities and world logic.
- **Canvas 2D API** for rendering and sprite animations.
- **HTML Audio API** for music and sound effects.
- **Local Storage** for saving the mute setting.

## Project Structure

```text
El-pollo-loko/
|-- index.html                 # Game page and script loading
|-- legal-notice.html          # Legal notice
|-- privacy-policy.html        # Privacy policy
|-- css/                       # Stylesheets and local fonts
|-- javaScript/
|   |-- game.js                # Initialization, input, audio, and menu controls
|   |-- classes/               # World, entities, animations, and status bars
|   |-- levels/
|   |   `-- level1.js          # Level configuration and object placement
|   `-- legal-notive-privacy-police.js
|-- img/                       # Sprites, backgrounds, and screen artwork
|-- icons/                     # Interface icons
`-- audio/                     # Music and sound effects
```

The `World` class manages rendering, collisions, collectibles, and bottle throwing. Game entities are defined in separate classes, while `level1.js` assembles the level's enemies, items, clouds, and backgrounds.

## Deployment

Upload the project files to a static web host, keeping the folder structure intact. No server-side application or build command is needed. File and folder names must retain their original capitalization so asset paths work on case-sensitive hosts.

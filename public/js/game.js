// spritesheet
    // setup environment (w/H)
    // ELEMENTS
    // bomb, number
    // determine position of each
// LIST OF ELEMENTS FOR SPRITESHEET
    // blank squares
    // number squares
    // bomb squares
// STORE state of the tile
    // change the state of clicked tiles etc

// Variables
const tileSize = 40
const boardSize = 10

// Creates application
let app = new PIXI.Application({ 
    width: (tileSize * boardSize), 
    height: (tileSize * boardSize),
    backgroundColor: "grey",
});
// Adds view to dom
document.body.appendChild(app.view);

// Sets up board
for (let i = 0; i < (boardSize ** 2); i++) {
    const texture = PIXI.Texture.from('/images/tile.png');
    const tile = new PIXI.Sprite(texture);
    tile.width = tileSize;
    tile.height = tileSize;
    tile.anchor.set(0);
    tile.x = (i % boardSize) * tileSize;
    tile.y = Math.floor(i / boardSize) * tileSize;
    app.stage.addChild(tile);
    tile.interactive = true;
    tile.buttonMode = true;
    tile.on('pointertap', tileClick)
}

// Move container to the center
app.stage.x = app.screen.width / 2;
app.stage.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
app.stage.pivot.x = app.stage.width / 2;
app.stage.pivot.y = app.stage.height / 2;

// Click functions
function tileClick() {
    this.texture = PIXI.Texture.from('/images/tile-clicked.png')
}
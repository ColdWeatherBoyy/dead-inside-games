// spritesheet
    // setup environment (w/H)
    // ELEMENTS
    // bomb, number
    // determine position of each
// LIST OF ELEMENTS FOR SPRITESHEET
    // blank squares
    // number squares
    // 10x bomb squares
// STORE state of the tile
    // change the state of clicked tiles etc
    // reveal click
    // right click plants a flag
    // determine bomb position
    // determine numbers depending on bomb placement
    // if square is a 0, reveals all of the zeros its connected to

// Variables
const tileSize = 40
const boardSize = 10
let tiles;

// Creates application
let app = new PIXI.Application({ 
    width: (tileSize * boardSize), 
    height: (tileSize * boardSize),
    backgroundColor: "grey",
});
// Adds view to dom
document.body.appendChild(app.view);
// Prevents right-click from opening menu
document.addEventListener("contextmenu", e => e.preventDefault());

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
    tile.on('pointerdown', tileClick);
    tile.on('rightdown', tileRightClick);
    app.stage.children[i].mine = false;
    app.stage.children[i].clicked = false;
    app.stage.children[i].index = i;
}
tiles = app.stage.children;

// For later - change # of mines to be dynamic 
const numberOfMines = 10;
for (let i = 0; i < numberOfMines; i++) {
    const randomIndex = Math.floor(Math.random() * 100);
    tiles[randomIndex].mine = true;
    
}

// console.log(tiles.map((tile, index) => `tile ${index} bomb ${tile.bomb}`));


// Move container to the center
app.stage.x = app.screen.width / 2;
app.stage.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
app.stage.pivot.x = app.stage.width / 2;
app.stage.pivot.y = app.stage.height / 2;

// Click function
function tileClick() {
    // if (!obj) {
    this.clicked = true;
    const numAdjMines = countAdjacentMines(this.index);
    if (this.mine === true) {
        this.texture = PIXI.Texture.from('/images/tile-bomb.png')
    } else if (numAdjMines > 0) {
        this.texture = PIXI.Texture.from(`/images/tile-${numAdjMines}.png`);
    } else if (numAdjMines === 0) {
        this.texture = PIXI.Texture.from('/images/tile-clicked.png')
        revealAdjacentTiles(this.index);
    }
    // console.log(this);
    // } else {
    //     obj.clicked = true;
    // const numAdjMines = countAdjacentMines(obj.index);
    // if (obj.mine === true) {
    //     obj.texture = PIXI.Texture.from('/images/tile-bomb.png')
    // } else if (numAdjMines > 0) {
    //     obj.texture = PIXI.Texture.from(`/images/tile-${numAdjMines}.png`);
    // } else if (numAdjMines === 0) {
    //     obj.texture = PIXI.Texture.from('/images/tile-clicked.png')
    //     revealAdjacentTiles(obj.index);
    // } 
    // }
}

// Adds flag on right click 
function tileRightClick() {
    this.texture = PIXI.Texture.from(`/images/tile-flag.png`)
}

// Adjacent tiles functions to check for mines
function countAdjacentMines(n) {
    return (
        getTopLeft(n)       + getTop(n)     + getTopRight(n)
        + getLeft(n)                        + getRight(n)
        + getBottomLeft(n) + getBottom(n)   + getBottomRight(n) 
    )
}

function getTopLeft(n) {
    if (n <= 9 || n % 10 === 0) return 0;
    if (tiles[n - 11].mine) return 1;
    else return 0;
}

function getTop(n) {
    if (n <= 9) return 0;
    if (tiles[n - 10].mine) return 1;
    else return 0;
}

function getTopRight(n) {
    if (n <= 9 || n % 10 === 9) return 0;
    if (tiles[n - 9].mine) return 1;
    else return 0;
}

function getLeft(n) {
    if (n % 10 === 0) return 0;
    if (tiles[n - 1].mine) return 1;
    else return 0;
}

function getRight(n) {
    if (n % 10 === 9) return 0;
    if (tiles[n + 1].mine) return 1;
    else return 0;
}

function getBottomLeft(n) {
    if (n >= 90 || n % 10 === 0) return 0;
    if (tiles[n + 9].mine) return 1;
    else return 0;
}

function getBottom(n) {
    if (n >= 90) return 0;
    if (tiles[n + 10].mine) return 1;
    else return 0;
}

function getBottomRight(n) {
    if (n >= 90 || n % 10 === 9) return 0;
    if (tiles[n + 11].mine) return 1;
    else return 0;
}

// Get neighboring tiles to clicked tile
function getAdjacentTiles(n) {
    return [
        getTopLeftIndex(n),       getTopIndex(n),     getTopRightIndex(n),
        getLeftIndex(n),                                 getRightIndex(n),
        getBottomLeftIndex(n), getBottomIndex(n),  getBottomRightIndex(n) 
    ].filter(elem => elem)
}

function getTopLeftIndex(n) {
    if (n <= 9 || n % 10 === 0) return false;
    else return n-11;
}

function getTopIndex(n) {
    if (n <= 9) return false;
    else return n-10;
}

function getTopRightIndex(n) {
    if (n <= 9 || n % 10 === 9) return false;
    else return n-9;
}

function getLeftIndex(n) {
    if (n % 10 === 0) return false;
    else return n-1;
}

function getRightIndex(n) {
    if (n % 10 === 9) return false;
    else return n+1;
}

function getBottomLeftIndex(n) {
    if (n >= 90 || n % 10 === 0) return false;
    else return n+9;
}

function getBottomIndex(n) {
    if (n >= 90) return false;
    else return n+10;
}

function getBottomRightIndex(n) {
    if (n >= 90 || n % 10 === 9) return false;
    else return n+11;
}

// keep a queue of tile indices to visit (getAdjacentTiles)
// when you visit a zero-tile (countAdjacentMines(0)), get valid neighbor indices, reveal all of those tiles, if neighboring tile is a zero-tile, add it to the toVisit queue
function revealAdjacentTiles(n) {
    console.log('n', n);
    console.log('getAdjacentTiles(n)', getAdjacentTiles(n));
    const queue = [n];
    while (queue.length) {
        const adjArr = getAdjacentTiles(queue.shift())
        for (let i = 0; i < adjArr.length; i++) {
            if (countAdjacentMines(adjArr[i]) === 0) {
                const tile = app.stage.children[i]
                queue.push(adjArr[i]);
                console.log(tile)
                tileClick(tile)
            }
        }
    }
    // const queue = [n];
    // while (queue.length) {
    //     // queue.unshift to get the front element
    //     // get neighbor indices
    //     // reveal neighbors
    //     // if neighbor tile is zero-tile
    //         // add that index to the queue 
    // }
    // if (countAdjacentMines(n) === 0) {
    //     tileClick(getAdjacentTiles(n))
    // } else {
    //     return
    // }
}
// keep going until toVisit queue is empty
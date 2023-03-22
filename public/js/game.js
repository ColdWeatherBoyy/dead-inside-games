// spritesheet
    // setup environment (w/H)
    // ELEMENTS
    // bomb, number
    // determine position of each
// LIST OF ELEMENTS FOR SPRITESHEET
    // blank squares
    // number squares
    // bomb squares

// creates application
let app = new PIXI.Application({ 
    width: 800, 
    height: 600,
    backgroundColor: "grey",
});
// adds view to dom
document.body.appendChild(app.view);
// creates sprite
let sprite = PIXI.Sprite.from('/images/sample.png');
// adds sprite image to stage
app.stage.addChild(sprite);
// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((delta) => {
    elapsed += delta;
    sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
});
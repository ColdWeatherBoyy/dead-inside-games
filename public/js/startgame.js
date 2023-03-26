const startingTime = 120;
let timeRemaining = startingTime;
const startBtn = document.getElementById('start-btn');
const timerEl = document.getElementById('timer');
const lostEl = document.getElementById("lost");
const resetEl = document.getElementById("reset")

  // To start the timer the user pushes the Start Game Button
  function startGame() {
    setTimer();
    removeStartBtn();
    isClickable();
  }

  startBtn.addEventListener("click", startGame);

  // Once the start game button is pushed, it is replaced by a countdown timer 
  // The count down timer starts at 2 minutes and counts down by one second 
  function setTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerEl.textContent = "Time Left" + " "+ timeRemaining;
        if (timeRemaining === 0) {
        endGame()
        }
  }, 1000);
}

function removeStartBtn() {
    startBtn.classList.add("is-hidden")
    timerEl.classList.remove("is-hidden")
}

  // Once the count down timer reaches zero, the game stops 
// function endGame() {
//   clearInterval(timerInterval);
//   // Reveals lost message
//   lostGame()
//   // Reveals replay button
//   resetEl.classList.remove("is-hidden")
//   // Prevents a user from clicking more tiles on the board 
//   isNotClickable()
//   };

function lostGame () {
  clearInterval(timerInterval);
  isNotClickable()
  resetEl.classList.remove("is-hidden")
  lostEl.classList.remove("is-hidden")
  const unclickedArr = tiles.filter(tile => !tile.clicked)
  unclickedArr.forEach(tile => {
  const numAdjMines = countAdjacentMines(tile.index);
  if (tile.mine) {
      tile.texture = PIXI.Texture.from("/images/tile-bomb.png");
  } else if (numAdjMines) {
      tile.texture = PIXI.Texture.from(`/images/tile-${numAdjMines}.png`);
  } else {
      tile.texture = PIXI.Texture.from("/images/tile-clicked.png"); 
  };
})
}

// to finish 
// function wonGame() {
//   clearInterval(timerInterval);
//   isNotClickable()
//   resetEl.classList.remove("is-hidden")
//   const score = timeRemaining
//   // button sto save highscore
// }

  function restartGame() {
    location.reload()
  }

  resetEl.addEventListener("click", restartGame);
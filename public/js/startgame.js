const startingTime = 120;
let timeRemaining = startingTime;
const startBtn = document.getElementById('start-btn');
const timerEl = document.getElementById('timer');

  // To start the timer the user pushes the Start Game Button
  function startGame() {
    setTimer();
    removeStartBtn();
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
  function endGame() {
    clearInterval(timerInterval);
    // returns alert that the game is over and the player lost 
  }
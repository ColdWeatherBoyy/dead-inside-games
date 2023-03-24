const highscoreButton = document.querySelector(".modal-button");
const closeButton = document.querySelector("#close-button");
const overlay = document.getElementById("overlay");
const modal = document.querySelector("#modal");

highscoreButton.addEventListener("click", () => {
  console.log("hi");
  openModal(modal);
});

closeButton.addEventListener("click", () => {
  closeModal(modal);
});

function openModal(modal) {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

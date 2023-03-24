const highscoreButton = document.querySelector(".modal-button");
const closeButton = document.querySelector("#close-button");
const overlay = document.getElementById("overlay");
const modal = document.querySelector("#modal");

highscoreButton.addEventListener("click", () => {
  // const modal = document.querySelector(modal);
  console.log("hi");
  openModal(modal);
});

closeButton.addEventListener("click", () => {
  // const modal = document.closest(".modal");
  closeModal(modal);
});

function openModal(modal) {
  //   if (modal === null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}
function closeModal(modal) {
  //   if (modal === null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

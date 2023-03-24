const highscoreButton = document.querySelectorAll("[data-modal-target]");
const closeButton = document.querySelector("#close-button");
const overlay = document.getElementById("overlay");

highscoreButton.forEach((button) => {
  button.addEventListener(" click ", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

closeButton.forEach((button) => {
  button.addEventListener(" click ", () => {
    const modal = document.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}
function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

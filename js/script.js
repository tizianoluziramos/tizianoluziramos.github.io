import { skillsData } from "./data/skillsData.js";
import { certificatesData } from "./data/certificates.js";
import { renderCertificates } from "./functions/renderCertificates.js";
import { renderSkills } from "./functions/renderSkills.js";

const tabsContainer = document.querySelector(".tabs");
const container = document.querySelector(".container");
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".tab-btn");
  if (!clicked) return;

  container
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));
  container
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.remove("active"));

  clicked.classList.add("active");
  const id = clicked.dataset.tab;
  const activeContent = document.getElementById(id);
  if (activeContent) activeContent.classList.add("active");
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((btn) => btn.classList.remove("active"));
    tab.classList.add("active");

    const tabId = tab.dataset.tab;
    contents.forEach((content) => {
      content.id === tabId
        ? content.classList.add("active")
        : content.classList.remove("active");
    });
  });
});

const modal = document.getElementById("modal");
const closeBtn = modal.querySelector(".close-btn");

function closeModal() {
  modal.classList.add("closing");
  modal.parentElement.classList.add("closing"); // modal-overlay

  modal.addEventListener(
    "animationend",
    () => {
      modal.classList.remove("active", "closing");
      modal.parentElement.classList.remove("active", "closing");
    },
    { once: true }
  );
}

closeBtn.addEventListener("click", closeModal);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

renderSkills("programming-languages", skillsData.programmingLanguages);
renderSkills("runtime-environments", skillsData.runtimeenvironments);
renderSkills("tools", skillsData.tools);
renderSkills("operative-systems", skillsData.operatingSystems);
renderSkills("frameworks", skillsData.frameworks);
renderCertificates(certificatesData);

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  preloader.style.pointerEvents = "none";

  // Para que desaparezca con transición suave
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
});

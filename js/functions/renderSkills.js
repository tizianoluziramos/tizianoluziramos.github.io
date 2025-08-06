const modalTitle = document.getElementById("modal-title");
const modalProjects = document.getElementById("modal-projects");
const closeBtn = modal.querySelector(".close-btn");

function openModal(skill) {
  modalTitle.textContent = skill.name;
  modalProjects.innerHTML = "";

  if (skill.projects.length === 0) {
    modalProjects.innerHTML = "<li>No hay proyectos registrados.</li>";
  } else {
    skill.projects.forEach((proj) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="project-item">
          <div class="project-title">${proj.name}</div>
          <img src="${proj.image}" alt="${proj.name}" class="project-image">
        </div>
      `;
      modalProjects.appendChild(li);
    });
  }

  modal.classList.add("active");
  closeBtn.focus();
}

export function renderSkills(containerId, skills) {
  const container = document.getElementById(containerId);
  skills.forEach((skill) => {
    const div = document.createElement("div");
    div.classList.add("skill-item");
    div.setAttribute("tabindex", "0");
    div.setAttribute("role", "button");
    div.setAttribute("aria-label", `Ver proyectos con ${skill.name}`);

    div.innerHTML = `
      <img src="${skill.logo}" alt="${skill.name} logo" />
      <div class="skill-name">${skill.name}</div>
    `;

    div.addEventListener("click", () => openModal(skill));
    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(skill);
      }
    });

    container.appendChild(div);
  });
}

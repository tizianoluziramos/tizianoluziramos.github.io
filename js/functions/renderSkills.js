const modalTitle = document.getElementById("modal-title");
const modalProjects = document.getElementById("modal-projects");
const closeBtn = modal.querySelector(".close-btn");

function openModal(skill) {
  modalTitle.textContent = skill.name;
  modalProjects.innerHTML = "";

  // Detecta si es projects o certifications
  const items = skill.projects ?? skill.certifications ?? [];
  const label = skill.projects ? "projects" : "certifications";

  // Cambia la clase del contenedor para aplicar estilos correctos
  modalProjects.className = label + "-list";

  if (items.length === 0) {
    modalProjects.innerHTML = `<li>There are no ${label} registered.</li>`;
  } else {
    items.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="${label}-item">
          <div class="${label}-title">${item.name}</div>
          ${
            item.image
              ? `<img src="${item.image}" alt="${item.name}" class="${label}-image">`
              : ""
          }
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

    // aria-label dinámico según projects o certifications
    div.setAttribute(
      "aria-label",
      `See ${skill.projects ? "projects" : "certifications"} with ${skill.name}`
    );

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

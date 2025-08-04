const tabsContainer = document.querySelector(".tabs");
const container = document.querySelector(".container");

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

const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

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

const skillsData = {
  programmingLanguages: [
    {
      name: "TypeScript",
      logo: "./assets/images/logos/typescript_logo.png",
      projects: [
        {
          name: "TypeScript Language Project",
          image: "./assets/images/projects/project_2_image.png",
        },
        {
          name: "Games API",
          image: "./assets/images/projects/project_1_image.png",
        },
      ],
    },
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      projects: [
        {
          name: "TypeScript Language Project(Frontend)",
          image: "./assets/images/projects/project_2_image.png",
        },
        {
          name: "Not Linux",
          image: "./assets/images/projects/project_3_image.png",
        },
        {
          name: "Games API(Frontend)",
          image: "./assets/images/projects/project_1_image.png",
        },
      ],
    },
    {
      name: "Front-End",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      projects: [
        {
          name: "Portfolio",
          image: "./assets/images/projects/project_4_image.png",
        },
      ],
    },
  ],
  runtimeenvironments: [
    {
      name: "Express.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      projects: [
        {
          name: "Games API",
          image: "./assets/images/projects/project_1_image.png",
        },
      ],
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      projects: [
        {
          name: "Not Linux",
          image: "./assets/images/projects/project_3_image.png",
        },
        {
          name: "TypeScript Language Project",
          image: "./assets/images/projects/project_2_image.png",
        },
        {
          name: "Games API",
          image: "./assets/images/projects/project_1_image.png",
        },
      ],
    },
  ],
  tools: [
    {
      name: "Git",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "Docker",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "ESLint",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg",
    },
    {
      name: "Prettier",
      logo: "https://raw.githubusercontent.com/prettier/prettier-logo/e638a708b41a176a46cfbbf9d3ed4910132df265/images/prettier-logo-dark.svg",
    },
    {
      name: "NPM / Yarn",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
    },
    {
      name: "Postman",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    },
    {
      name: "VSCode",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    },
    {
      name: "GitHub Actions",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
  ],
  operatingSystems: [
    {
      name: "Linux",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    },
    {
      name: "MS-DOS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Msdos-icon.svg/480px-Msdos-icon.svg.png?20240325080251",
    },
    {
      name: "Windows",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
    },
  ],
};

function renderSkills(containerId, skills) {
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

const modal = document.getElementById("modal");
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

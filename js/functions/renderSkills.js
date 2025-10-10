export function renderSkills(containerId, skills) {
  const container = document.getElementById(containerId);

  skills.forEach((skill) => {
    const div = document.createElement("div");
    div.classList.add("skill-item");

    div.innerHTML = `
      <img src="${skill.logo}" alt="${skill.name} logo" />
      <div class="skill-name">${skill.name}</div>
    `;

    container.appendChild(div);
  });
}

export function renderCertificates(data) {
  const container = document.getElementById("certificates");

  container.innerHTML = `
    <h2>Certificates</h2>
    <div class="cert-tabs" id="cert-tabs"></div>
    <div class="cert-content" id="cert-content"></div>
  `;

  const certTabs = document.getElementById("cert-tabs");
  const certContent = document.getElementById("cert-content");

  // Crear los botones dinámicamente según las claves del JSON
  const categories = Object.keys(data);
  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.classList.add("cert-tab-btn");
    button.setAttribute("data-cert-tab", category);
    button.textContent = category
      .replace(/-/g, " ") // opcional: reemplazar guiones por espacios
      .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalizar

    if (index === 0) button.classList.add("active"); // activar el primero por defecto

    certTabs.appendChild(button);
  });

  function showCertificates(category) {
    certContent.innerHTML = "";

    data[category].forEach((cert) => {
      const certDiv = document.createElement("div");
      certDiv.classList.add("certificate");

      const isPDF = cert.image.toLowerCase().endsWith(".pdf");

      // Generar ID único para cada canvas PDF
      const canvasId = `pdf-canvas-${Math.random().toString(36).substr(2, 9)}`;

      // Construir el HTML base
      certDiv.innerHTML = `
      ${
        isPDF
          ? `<canvas id="${canvasId}" class="certificate-image"></canvas>`
          : `<img src="${cert.image}" alt="${cert.name}" class="certificate-image" />`
      }
      <div class="certificate-info">
        <h3>${cert.name}</h3>
        <p>${cert.description}</p>
      </div>
    `;

      certContent.appendChild(certDiv);

      // Renderizar PDF si es necesario
      if (isPDF && window.pdfjsLib) {
        const canvas = document.getElementById(canvasId);
        const context = canvas.getContext("2d");

        // Configurar el worker
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        // Cargar y renderizar primera página del PDF
        pdfjsLib
          .getDocument(cert.image)
          .promise.then((pdf) => {
            return pdf.getPage(1);
          })
          .then((page) => {
            const viewport = page.getViewport({ scale: 1.5 });
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };

            return page.render(renderContext).promise;
          })
          .catch((error) => {
            console.error("Error al renderizar PDF:", error);
          });
      }
    });
  }

  // Mostrar la primera categoría por defecto
  if (categories.length > 0) {
    showCertificates(categories[0]);
  }

  // Delegar eventos a los botones generados dinámicamente
  document.querySelectorAll(".cert-tab-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".cert-tab-btn")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const selectedTab = button.getAttribute("data-cert-tab");
      showCertificates(selectedTab);
    });
  });
}

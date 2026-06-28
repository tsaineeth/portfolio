document.getElementById("themeSwitcher").addEventListener("click", () => {
  if (document.documentElement.getAttribute("data-bs-theme") === "dark") {
    document.documentElement.setAttribute("data-bs-theme", "light");
  } else {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  downloadPDF().then((r) => {
    const toastTrigger = document.getElementById("liveToastBtn");
    const toastLiveExample = document.getElementById("liveToast");
    console.log(r);

    if (toastTrigger) {
      const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastTrigger.addEventListener("click", () => {
        toastBootstrap.show();
      });
    }
  });
});

function createCard() {
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("border-0");
  card.classList.add("mx-auto");
  // card.classList.add("mt-1")
  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/skills.json")
    .then((response) => response.json())
    .then((skills) => {
      fillSkills(skills);
    })
    .catch((error) => console.error("Error loading projects:", error));

  fetch("assets/data/technicalHighlights.json")
    .then((response) => response.json())
    .then((technicalHighlights) => {
      fillTechnicalHighlights(technicalHighlights);
    })
    .catch((error) => console.error("Error loading projects:", error));

  fetch("assets/data/experience.json")
    .then((response) => response.json())
    .then((experience) => {
      fillExperience(experience);
    })
    .catch((error) => console.error("Error loading projects:", error));

  fetch("assets/data/about.json")
    .then((response) => response.json())
    .then((about) => {
      document.getElementById("firstName").textContent = about["first_name"];
      document.getElementById("lastName").textContent = about["last_name"];
      document.getElementById("aboutTitle").textContent = about["title"];
      document.getElementById("aboutBio").textContent = about["bio"];

      document.getElementById("email").href = "mailto:" + about["email"];

      document.getElementById("linkedin").href = about["linkedin"];
      document.getElementById("github").href = about["github"];
      fillEduction(about);
    })
    .catch((error) => console.error("Error loading projects:", error));
});

function fillTechnicalHighlights(technicalHighlights) {
  const sectionTechnicalHighlights = document.getElementById(
    "technicalHighlights",
  );

  const personalProjects = technicalHighlights["projects"];
  const awards = technicalHighlights["awards"];

  sectionTechnicalHighlights.appendChild(getPersonalProjects(personalProjects));
  sectionTechnicalHighlights.appendChild(getAwards(awards));
}

function fillEduction(about) {
  const sectionEducation = document.getElementById("education");
  const education = about["education"];

  // For each institution create a different card.
  education.forEach((value) => {
    const card = createCard();
    card.innerHTML = `
            <div class="card-body p-1">
                <h5 class="card-title">${value.institution}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${value.name}, ${value.major}</h6>
                <p class="card-text fw-normal mb-1">${value.year} | ${value.location}</p>
            </div>`;
    sectionEducation.appendChild(card);
  });
}

function getCertifications(certifications) {
  const card = createCard();
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.classList.add("p-1");
  cardBody.innerHTML = `<h5 class="card-title">Certifications</h5>`;
  certifications.forEach((certificate) => {
    const div = document.createElement("div");
    div.classList.add("row");

    div.innerHTML += `<p class="card-text fw-normal col-auto">${certificate.year}</p>`;
    div.innerHTML += `<p class="card-text fw-normal col-auto">${certificate.name}</p>`;
    div.innerHTML += `<p class="card-text fw-normal col-auto">${certificate.description}</p>`;

    cardBody.appendChild(div);
  });
  card.appendChild(cardBody);
  return card;
}

function getTechnicalSkills(technicalSkills) {
  // Add all technical skills under the same card.
  const card = createCard();
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.classList.add("p-1");
  cardBody.innerHTML = `<h5 class="card-title">Technical SKills</h5>`;
  for (const key in technicalSkills) {
    cardBody.innerHTML += `<h6 class="card-subtitle mb-1 text-body-secondary">${key}</h6>`;
    const skillText = technicalSkills[key].join(" • ");
    cardBody.innerHTML += `<p class="card-text fw-normal">${skillText}</p>`;
  }
  card.appendChild(cardBody);

  return card;
}

function getSoftSkills(softSkills) {
  const card = createCard();
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.classList.add("p-1");
  cardBody.innerHTML = `<h5 class="card-title">Engineering Practices</h5>`;
  const innerText = softSkills.join(" &bull; ");
  cardBody.innerHTML += `<p class="card-text fw-normal">${innerText}</p>`;

  card.appendChild(cardBody);
  return card;
}

function fillSkills(skills) {
  const sectionTechnicalSkills = document.getElementById("technicalSkills");
  const sectionSoftSkills = document.getElementById("softSkills");
  const sectionCertifications = document.getElementById("certifications");

  sectionTechnicalSkills.appendChild(
    getTechnicalSkills(skills["technical_skills"]),
  );
  sectionSoftSkills.appendChild(getSoftSkills(skills["soft_skills"]));
  sectionCertifications.appendChild(
    getCertifications(skills["certifications"]),
  );
}

function getExperience(experience, sectionExperience) {
  experience.forEach((value) => {
    const title = value?.company.toUpperCase() + " | " + value?.role;
    const subtitle =
      value?.start_date + " - " + value?.end_date + " | " + value?.location;

    const card = createCard();
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.classList.add("p-1");
    cardBody.innerHTML = `<h5 class="card-title">${title}</h5>`;
    cardBody.innerHTML += `<h6 class="card-subtitle mb-2 text-body-secondary">${subtitle}</h6>`;

    const projects = value?.projects;

    projects.forEach((project) => {
      const projectTitle = project?.name;
      cardBody.innerHTML += `<h6 class="card-subtitle text-body-secondary">${projectTitle}</h6>`;

      const ul = document.createElement("ul");
      ul.classList.add("text-body-secondary");
      const summary = project?.summary;
      summary.forEach((line) => {
        const li = document.createElement("li");
        li.textContent = line;
        ul.appendChild(li);
      });
      cardBody.appendChild(ul);
    });

    card.appendChild(cardBody);
    sectionExperience.appendChild(card);
  });
}

function getAwards(awards) {
  const card = createCard();
  const cardBody = document.createElement("div");
  cardBody.innerHTML = `<h5 class="card-title">Awards</h5>`;
  cardBody.classList.add("card-body");
  cardBody.classList.add("p-1");
  const ul = document.createElement("ul");
  ul.classList.add("text-body-secondary");

  awards.forEach((award) => {
    const li = document.createElement("li");
    li.innerHTML += `${award.name} Award, ${award.company} (${award.year})`;
    ul.appendChild(li);
  });

  cardBody.appendChild(ul);
  card.appendChild(cardBody);
  return card;
}

function getPersonalProjects(personalProjects) {
  const div = document.createElement("div");

  personalProjects.forEach((project) => {
    const card = createCard();
    const cardBody = document.createElement("div");
    cardBody.innerHTML = `<h5 class="card-title">${project.name} | Personal Project</h5>`;
    cardBody.classList.add("card-body");
    cardBody.classList.add("p-1");
    const ul = document.createElement("ul");
    ul.classList.add("text-body-secondary");

    project?.summary.forEach((summary) => {
      const li = document.createElement("li");
      li.innerHTML += `${summary}`;
      ul.appendChild(li);
    });
    cardBody.appendChild(ul);
    card.appendChild(cardBody);
    div.appendChild(card);
  });
  return div;
}

function fillExperience(experience) {
  const sectionExperience = document.getElementById("experience");

  getExperience(experience["experience"], sectionExperience);
}

async function downloadPDF() {
  const year = new Date().getFullYear();
  const downloadFileName = "Saineeth's Resume_" + year.toString() + ".pdf";

  const cloneAndClean = (selector) => {
    const el = document.getElementById(selector);
    if (!el) return null;
    const clone = el.cloneNode(true);
    clone.querySelectorAll(".no-export").forEach((el) => el.remove());
    return clone;
  };

  const { jsPDF } = window.jspdf;

  // Create export container
  const exportContainer = document.createElement("div");
  exportContainer.style.padding = "1%";

  // Clone only the elements we want
  const headerClone = cloneAndClean("header");
  const mainClone = cloneAndClean("main");
  const footerClone = cloneAndClean("footer");

  if (headerClone) exportContainer.appendChild(headerClone);
  if (mainClone) exportContainer.appendChild(mainClone);
  if (footerClone) exportContainer.appendChild(footerClone);

  document.body.appendChild(exportContainer);

  // Wait for style render
  await new Promise((resolve) => setTimeout(resolve, 100));

  const canvas = await html2canvas(exportContainer, {
    // scale: 2,
    useCORS: true, // backgroundColor: "#ffffff",
  });

  exportContainer.remove();

  const imgData = canvas.toDataURL("image/jpeg", 1);
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  // const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pdfWidth;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
  pdf.save(downloadFileName);
}

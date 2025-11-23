const MAX_CHANGE = 5;

let hamb = document.getElementById("hamburger");
let menu = document.querySelector("#mobileMenu");

hamb.addEventListener("click", toggle);

let links = document.querySelectorAll("#mobileMenu li");

links.forEach((link) => {
  link.addEventListener("click", toggle);
});

function toggle() {
  hamb.classList.toggle("open");
  menu.classList.toggle("open");
}

const sections = document.querySelectorAll("section");

const sectionColors = {
  about: 86, // green
  skills: 200, // blue
  mission: 300, // purple
  projects: 30, // orange
  contact: 340, // pink
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const intersectionRatio = entry.intersectionRatio;

        if (entry.target.id !== "home" && intersectionRatio >= 0.3) {
          const baseHue = sectionColors[entry.target.id] || 86;
          const normalizedRatio = intersectionRatio * 200;

          const changedColor = `hsl(${baseHue - normalizedRatio}, 100%, ${
            95 - intersectionRatio * MAX_CHANGE
          }%)`;
          const originalColor = `hsl(86, 100%, 95%)`;

          entry.target.style.background = `linear-gradient(to bottom, 
            ${originalColor} 0%, 
            ${changedColor} 45%,
            ${changedColor} 50%, 
            ${changedColor} 70%,
            ${originalColor} 100%)`;
        } else {
          entry.target.style.background = "";
        }
      } else {
        entry.target.style.background = "";
      }
    });
  },
  {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    // threshold: [0.2, 0.3, 0.5],
  }
);

// Observe all sections
sections.forEach((section) => {
  observer.observe(section);
});

// Lightbox modal
const modal = document.getElementById("lightbox");
const thumbs = document.querySelectorAll(".gallery-thumb");
const modalImg = document.getElementById("lightbox-image");
const modalCaption = document.getElementById("lightbox-caption");
const closeBtn = document.querySelector(".lightbox-close");

thumbs.forEach((thumb) => {
  const imageSrc = thumb.dataset.large;

  thumb.addEventListener("click", () => {
    modalImg.src = imageSrc;
    modalImg.alt = thumb.alt;
    modalCaption.textContent = thumb.alt;
    modal.classList.remove("hidden");
  });
});

function closeModal() {
  modal.classList.add("hidden");
}

closeBtn.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  console.log("e", e);

  if (e.key === "Escape") {
    closeModal();
  }
});

modal.addEventListener("click", (e) => {
  if (!e.target.closest("#lightbox-content")) {
    closeModal();
  }
});

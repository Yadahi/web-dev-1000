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

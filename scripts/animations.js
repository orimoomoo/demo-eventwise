// Bounce effect on hover
function addBounceOnHover(element) {
  element.addEventListener("mouseenter", () => {
    element.style.transition = "transform 0.3s ease";
    element.style.transform = "translateY(-6px)";
  });
  element.addEventListener("mouseleave", () => {
    element.style.transform = "translateY(0)";
  });
}

// Apply bounce to nav links, buttons, and logo
document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector("header img");
  if (logo) addBounceOnHover(logo);

  document.querySelectorAll("a.nav-link, .btn").forEach(el => addBounceOnHover(el));

  // Highlight current nav item
  document.querySelectorAll("ul.nav a").forEach(link => {
    if (link.href === window.location.href) {
      link.classList.remove("text-black");
      link.classList.add("text-secondary", "fw-bold");
    }
  });

  // Ripple effect on all buttons
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      const circle = document.createElement("span");
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.position = "absolute";
      circle.style.borderRadius = "50%";
      circle.style.left = `${e.clientX - btn.offsetLeft - radius}px`;
      circle.style.top = `${e.clientY - btn.offsetTop - radius}px`;
      circle.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
      circle.style.transform = "scale(0)";
      circle.style.animation = "rippleAnim 0.6s linear";
      circle.classList.add("ripple");

      btn.style.position = "relative";
      btn.appendChild(circle);

      setTimeout(() => circle.remove(), 600);
    });
  });
});

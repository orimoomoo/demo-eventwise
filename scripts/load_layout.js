// Dynamically load header, sidebar, and dashboard
document.addEventListener("DOMContentLoaded", function () {
  fetch("./layout/header.html")
    .then(res => res.text())
    .then(data => {
      const header = document.getElementById("header-placeholder");
      if (header) header.innerHTML = data;
    });

  fetch("./layout/sidebar.html")
    .then(res => res.text())
    .then(data => {
      const sidebar = document.getElementById("sidebar-placeholder");
      if (sidebar) sidebar.innerHTML = data;
    });
});


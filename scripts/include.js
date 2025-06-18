// // include.js

// Function to load an HTML partial into an element
function loadPartial(selector, url, callback) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.querySelector(selector).innerHTML = data;
      if (callback) callback();
    })
    .catch(err => console.error(`Failed to load ${url}: `, err));
}

// Load header and then update auth buttons dynamically
loadPartial('header', './layout/header.html', () => {
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail');

  const authDiv = document.querySelector('header .text-end');

  if (!authDiv) {
    console.warn('Auth buttons container not found in header');
    return;
  }

  if (token && userEmail) {
    // Replace login/signup with logout button
    authDiv.innerHTML = `
      <button id="logoutBtn" class="btn btn-outline-danger me-2">Logout</button>
    `;

    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      window.location.href = './login.html';  // or wherever you want to redirect
    });
  }
});

// Similarly, you can load footer partial here or in the same way
loadPartial('footer', './partials/footer.html');
loadPartial('header', './partials/header.html');


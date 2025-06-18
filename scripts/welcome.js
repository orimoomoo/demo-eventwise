document.addEventListener('DOMContentLoaded', () => {
    debugger;
  const email = localStorage.getItem('userEmail');

  if (!email) {
    // redirect if no email found
    window.location.href = './login.html';
    return;
  }

  const namePart = email.split('@')[0];
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const formattedName = capitalize(namePart.replace(/[\._]/g, ' '));

  const greetingEl = document.getElementById('greeting');
  if (greetingEl) {
    greetingEl.textContent = `Hello, ${formattedName}!`;
  }
});

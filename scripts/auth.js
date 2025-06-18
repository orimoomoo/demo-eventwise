// auth.js

$(document).ready(function () {
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();

    const email = $('#floatingInput').val().trim();
    const password = $('#floatingPassword').val().trim();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

  login(
    email,
    password,
    function (response) {
      saveToken(response.token);
      localStorage.setItem('userEmail', email);
      localStorage.setItem("isLoggedIn", "true");

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome back.',
        confirmButtonText: 'Continue',
        timer: 2000,
        timerProgressBar: true
      }).then(() => {
        window.location.href = 'dashboard.html';
      });
    },
    function (xhr) {
      const errorMessage = xhr.responseJSON?.message || 'Login failed.';

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
        confirmButtonText: 'Try Again'
      });
    }
  );

  });

  
});

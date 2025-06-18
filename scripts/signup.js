// signup.js

$(document).ready(function () {
  $('#signupForm').on('submit', function (e) {
    e.preventDefault();

    const email = $('#signupEmail').val().trim();
    const password = $('#signupPassword').val().trim();
    const confirmPassword = $('#signupConfirmPassword').val().trim();
    const agreed = $('#checkDefault').is(':checked');

    if (!email || !password || !confirmPassword) {
      alert('All fields are required.');
      console.warn('Signup failed: Missing input fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      console.warn('Signup failed: Passwords did not match.');
      return;
    }

    if (!agreed) {
      alert('You must agree to the Terms & Conditions.');
      console.warn('Signup failed: Terms not accepted.');
      return;
    }

  register(
    email,
    password,
    function (response) {
      Swal.fire({
        icon: 'success',
        title: 'Signup successful!',
        text: 'You can now log in.',
        confirmButtonText: 'Go to Login'
      }).then(() => {
        window.location.href = 'login.html';
      });
    },
    function (xhr) {
      const errorMessage =
        (xhr.responseJSON && xhr.responseJSON.message) ||
        'Signup failed. Please try again later.';

      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: errorMessage
      });
      console.error('Signup error:', xhr);
    }
  );
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//     debugger;
//     // Dummy check: Replace this with real session or token logic
//     const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//     const navGuestSignin = document.getElementById("nav-guest-signin");
//     const navGuestSignup = document.getElementById("nav-guest-signup");
//     const navLoggedIn = document.getElementById("nav-logged-in");

//     if (userLoggedIn) {
//         // Show logged-in user dropdown
//         if (navLoggedIn) navLoggedIn.classList.remove("d-none");
//         navLoggedIn.style.display = "block";


//         // Hide guest items
//         if (navGuestSignin) navGuestSignin.classList.add("d-none");
//         if (navGuestSignup) navGuestSignup.classList.add("d-none");
//     } else {
//         // Show guest items
//         if (navGuestSignin) navGuestSignin.classList.remove("d-none");
//         if (navGuestSignup) navGuestSignup.classList.remove("d-none");

//         // Hide logged-in menu
//         if (navLoggedIn) navLoggedIn.classList.add("d-none");
//     }
// });


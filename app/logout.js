//import { signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
//import { signOut } from "https://www.gstatic.com/firebasejs/7.15.0/firebase.js"
//import { auth } from "./firebase.js";
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const logout = document.querySelector("#logout");
const entrarForm=document.querySelector('#login-form');

logout.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
   // await signOut(auth)
   loggedInLinks.forEach((link) => (link.style.display = "none"));
   loggedOutLinks.forEach((link) => (link.style.display = "block"));
   entrarForm.reset();
    console.log("signup out");
  } catch (error) {
    console.log(error)
  }
});
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCL58d1OV9t2rWDpYJaTK1qM95O9Xpka4Q",
    authDomain: "hackathon-87162.firebaseapp.com",
    projectId: "hackathon-87162",
    storageBucket: "hackathon-87162.appspot.com",
    messagingSenderId: "672654391439",
    appId: "1:672654391439:web:88c4f3272e017e787a58fa",
    measurementId: "G-S7MJ8PJ3SN"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let submitButton = document.querySelector("#submitButton")
let passwordNotMatch = document.querySelector("#passwordNotMatch")


const provider = new GoogleAuthProvider();

let signupForm = document.querySelector("#signupForm")
let result = document.querySelector("#result")
let confirmPassword = document.querySelector("#confirmPassword")


let passwordHide = document.querySelector("#passwordHide")
let passwordDisplay = document.querySelector("#passwordDisplay")
let confirmPasswordHide = document.querySelector("#confirmPasswordHide")
let confirmPasswordDisplay = document.querySelector("#confirmPasswordDisplay")
let loginWithGoogle = document.querySelector("#loginWithGoogle")


confirmPasswordHide.addEventListener("click", () => {
  confirmPasswordDisplay.style.display = "block";
  confirmPasswordHide.style.display = "none";
  confirmPassword.type = "text";
});

confirmPasswordDisplay.addEventListener("click", () => {
  confirmPasswordHide.style.display = "block";
  confirmPasswordDisplay.style.display = "none";
  confirmPassword.type = "password";
});






passwordHide.addEventListener("click", () => {
  passwordDisplay.style.display = "block";
  passwordHide.style.display = "none";
  password.type = "text";
});

passwordDisplay.addEventListener("click", () => {
  passwordHide.style.display = "block";
  passwordDisplay.style.display = "none";
  password.type = "password";
});


// ... (your previous code)

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (password.value === confirmPassword.value) {
      createUserWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
              const user = userCredential.user;
              Swal.fire({
                  icon: 'success',
                  title: 'User Created',
                  text: 'User registration was successful!',
              }).then(() => {
                  window.location.href = "../index.html";
              });
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              Swal.fire({
                  icon: 'error',
                  title: 'Error Creating User',
                  text: errorMessage,
              });
          });
  } else {
      passwordNotMatch.style.display = "block";
  }
});

loginWithGoogle.addEventListener("click", () => {
  signInWithPopup(auth, provider)
      .then((result) => {
          const user = result.user;
          Swal.fire({
              icon: 'success',
              title: 'Google Login Successful',
              text: 'You have successfully logged in with Google!',
          }).then(() => {
              window.location.href = "../index.html";
          });
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire({
              icon: 'error',
              title: 'Google Login Error',
              text: errorMessage,
          });
      });
});


// console.log("i am login js")
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth ,signInWithEmailAndPassword , signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

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

const provider = new GoogleAuthProvider();
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let loginButton = document.querySelector("#loginButton")
let userLogin = document.querySelector("#userLogin")
let loginWithGoogle = document.querySelector("#loginWithGoogle")



let passwordHide = document.querySelector("#passwordHide");
let myPassword = document.querySelector(".myPassword");

let passwordDisplay = document.querySelector("#passwordDisplay");

passwordHide.addEventListener("click", () => {
  passwordDisplay.style.display = "block";
  passwordHide.style.display = "none";
  myPassword.type = "text";
});

passwordDisplay.addEventListener("click", () => {
  passwordHide.style.display = "block";
  passwordDisplay.style.display = "none";
  myPassword.type = "password";
});

userLogin.addEventListener("submit", (e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert("user login succesful")
      window.location.href = "../main/index.html"
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error in signin", error)
    });

})
loginWithGoogle.addEventListener("click", ()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    alert("google login successful")
    window.location.href = "../main/index.html"
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    alert("error in google login ", error)
  });

})

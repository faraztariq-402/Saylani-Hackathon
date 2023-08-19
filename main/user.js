import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getFirestore,
  addDoc,query,getDocs,deleteDoc,
  collection,doc, setDoc,getDoc,orderBy,updateDoc,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js"; // Add this line
import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyCL58d1OV9t2rWDpYJaTK1qM95O9Xpka4Q",
    authDomain: "hackathon-87162.firebaseapp.com",
    projectId: "hackathon-87162",
    storageBucket: "hackathon-87162.appspot.com",
    messagingSenderId: "672654391439",
    appId: "1:672654391439:web:88c4f3272e017e787a58fa",
    measurementId: "G-S7MJ8PJ3SN"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
let logout = document.getElementById("logout")

  logout.addEventListener("click", ()=>{
    logout.addEventListener("click", () => {
        signOut(auth)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Sign Out Successful',
              text: 'You have been signed out successfully.',
            }).then(() => {
              console.log("User signed out successfully");
              window.location.href = "../index.html";
            });
          })
          .catch((error) => {
            console.error("Error signing out: ", error);
            Swal.fire({
              icon: 'error',
              title: 'Sign Out Error',
              text: 'An error occurred while signing out.',
            });
          });
      });
  })
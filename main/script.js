

 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, reauthenticateWithCredential,EmailAuthProvider,onAuthStateChanged,signOut, updatePassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {
  getFirestore,
  addDoc,query,getDocs,deleteDoc,
  collection,doc, setDoc,getDoc,orderBy,updateDoc,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyCL58d1OV9t2rWDpYJaTK1qM95O9Xpka4Q",
    authDomain: "hackathon-87162.firebaseapp.com",
    projectId: "hackathon-87162",
    storageBucket: "hackathon-87162.appspot.com",
    messagingSenderId: "672654391439",
    appId: "1:672654391439:web:88c4f3272e017e787a58fa",
    measurementId: "G-S7MJ8PJ3SN"
  };
  let logout = document.querySelector("#logout");

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

const oldPassword = document.querySelector("#oldPassword");
const newPassword = document.querySelector("#newPassword");
const repeatPassword = document.querySelector("#repeatPassword");

const UpdatePassword = document.querySelector("#UpdatePassword");
const profilePhoto = document.querySelector("#profilePhoto");
const profileName = document.querySelector("#profileName");
const userSpan = document.querySelector("#userSpan");
let image = document.querySelector(".image")
let mySpan = document.querySelector("#mySpan")

mySpan.addEventListener("click", ()=>{
    window.location.href = "./allposts.html"
})
onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user.email)
      userSpan.textContent = user.email
      profileName.textContent = user.email
      profilePhoto.src = user.photoURL
    } else {
       userLogin.style.display = "block"
       // User is not signed in, disable post creation
       postButton.style.display = "none";
       userLogin.addEventListener("click", ()=>{
         window.location.href = "../index.html"
  
       })
     
  
     
    }
  });

UpdatePassword.addEventListener("click", async () => {
  const user = auth.currentUser; // Get the currently signed-in user
if(newPassword.value === repeatPassword.value){
      if (user) {
    const oldPasswordValue = oldPassword.value;
    const newPasswordValue = newPassword.value;
    profilePhoto.src = user.photoURL;
    if (user.photoURL === null) {
        profilePhoto.style.border = "2px solid gray";
        profilePhoto.style.backgroundColor = "black";
    }
    const credential = EmailAuthProvider.credential(user.email, oldPasswordValue);

    try {
      // Reauthenticate the user with their current password
      await reauthenticateWithCredential(user, credential);

      // Change the user's password
      await updatePassword(user, newPasswordValue);
alert("Password Updated Successfully")
      // Password changed successfully
      console.log("Password changed successfully");
    } catch (error) {
      console.error("Error changing password:", error.message);
    }
  } else {
    console.log("No user is currently signed in.");
  }
}else{
    alert("password doesn't match")
}

});

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

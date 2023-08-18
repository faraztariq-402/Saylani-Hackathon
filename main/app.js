import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getFirestore,
  addDoc,query,getDocs,
  collection,doc, setDoc,getDoc
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let postInput = document.querySelector("#postInput");
let postButton = document.querySelector("#postButton");
// let allPosts = document.querySelector("#allPosts");


postButton.addEventListener("click", async () => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      post: postInput.value,
    });
    getAllPosts()
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
});



let getAllPosts = async () => {
    const postsCollection = collection(db, "posts");
    const q = query(postsCollection);
      allPosts.innerHTML = ""
  
    try {
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((docSnap) => {
        const postData = docSnap.data();
        const postText = postData.post;
        // Assuming you have an HTML element with id "allPosts" to display the posts
        const allPostsElement = document.querySelector("#allPosts");
        const postDiv = document.createElement("div");
        allPostsElement.textContent += postText;
        allPostsElement.appendChild(postDiv);
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };
  
  getAllPosts();
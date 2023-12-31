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
  // const storage = getStorage(app);
// Initialize Firebase
let postInput = document.querySelector("#postInput");
let postButton = document.querySelector("#postButton");
let logout = document.querySelector("#logout");
let userLogin = document.querySelector("#userLogin");
let postText = document.querySelector("#postText").value;
let userSpan = document.querySelector("#userSpan");


let myUser;

userSpan.addEventListener("click", ()=>{
  window.location.href = "./profile.html"
})

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  // getAllPosts()
  if (user) {
    console.log(user.email)
    
    myUser = user;
    userSpan.innerHTML = myUser.email
    // allPosts.innerHTML = ""
    getAllPosts(myUser)
    // getAllPosts(myUser);
    // User is signed in, enable post creation
    // postButton.addEventListener("click", async () => {
    //   try {
    //     const docRef = await addDoc(collection(db, "posts"), {
    //       post: postInput.value,
    //     });
        
    //     getAllPosts();
    //     console.log("Document written with ID: ", docRef.id);
    //   } catch (error) {
    //     // editButton.style.disabled = "true"
    //     console.error("Error adding document: ", error);
    //   }
    // });
  } else {
    logout.style.display = "none"
     userLogin.style.display = "block"
     // User is not signed in, disable post creation
     postButton.style.display = "none";
     userLogin.addEventListener("click", ()=>{
       window.location.href = "../index.html"

     })
   

   
  }
});
let allPosts = document.querySelector("#allPosts");


postButton.addEventListener("click", async () => {
  const postInputValue = document.querySelector("#postInput").value;
  const postTextValue = document.querySelector("#postText").value;

  try {
    const docRef = await addDoc(collection(db, "posts"), {
      postTitle: postInputValue,
      postText: postTextValue,
      timestamp: new Date(),  
      postOwner: myUser.email,
      photoUrl: myUser.photoURL // Correct property name: photoURL
    });
    getAllPosts();
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
});


// ... (your previous code for imports and Firebase initialization)

// ... (your previous code for onAuthStateChanged)
// ... (your previous code for imports and Firebase initialization)

// ... (your previous code for onAuthStateChanged)

// ... (previous code)

let getAllPosts = async () => {
  const postsCollection = collection(db, "posts");
  const q = query(postsCollection, orderBy("timestamp", "desc"));

  try {
    const querySnapshot = await getDocs(q);
    allPosts.innerHTML = "";

    querySnapshot.forEach((docSnap) => {
      const postData = docSnap.data();
      const postTitle = postData.postTitle;
      const postText = postData.postText;

      // Only display posts owned by the current user
      if (myUser.email === postData.postOwner) {
        let postCard = document.createElement("div");
        postCard.classList.add("postCard");
        allPosts.appendChild(postCard);

        let photoAndTitle = document.createElement("div");
        photoAndTitle.classList.add("photoAndTitle");
        let photo = document.createElement("div");
        photo.style.backgroundImage = `url(${postData.photoUrl})`;
        if(postData.photoUrl === null){
          photo.style.border = " 2px solid gray";
          photo.style.backgroundColor = "darkgray";
// photo.style.height = "4rem"
// photo.style.width = "4rem"

        }
      
        photo.style.backgroundSize = "cover"
        photo.classList.add("photo");
        // photo.innerHTML = myUser.photoUrl;
        postCard.appendChild(photoAndTitle);

        let title = document.createElement("h3");
        let postTitleAndTime = document.createElement("div");
        postTitleAndTime.classList.add("postNameTime");
        let name = document.createElement("span");
        let time = document.createElement("span");

        name.textContent = myUser.email;
        const timestamp = postData.timestamp.toDate();

        // Format the date as a string (e.g., "August 18, 2023")
        const formattedDate = timestamp.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const formattedDateTime = ` - ${formattedDate}`;
        time.textContent = formattedDateTime;

        let text = document.createElement("p");
        text.classList.add("myPara");
        let editButton = document.createElement("a");
        let deleteButton = document.createElement("a");
        editButton.style.marginRight = "1rem";
        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";
        editButton.classList.add("editButton");
        deleteButton.classList.add("deleteButton");

        title.textContent = postTitle;
        text.textContent = postText;

        photoAndTitle.appendChild(photo);
        photoAndTitle.appendChild(postTitleAndTime);
        postTitleAndTime.appendChild(title);
        postTitleAndTime.appendChild(name);
        postTitleAndTime.appendChild(time);
        postCard.appendChild(text);
        postCard.appendChild(editButton);
        postCard.appendChild(deleteButton);

        // Attach edit and delete event listeners
       editButton.addEventListener("click", () => {
    if (myUser.email === postData.postOwner) {
      // Open SweetAlert input prompts for post title and text
      Swal.fire({
        title: 'Edit Post',
        html:
          `<input id="swal-input-title" class="swal2-input" value="${postTitle}" placeholder="Title">` +
          `<input id="swal-input-text" class="swal2-input" value="${postText}" placeholder="Text">`,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          // Get values from the input fields
          const editedTitle = document.getElementById('swal-input-title').value;
          const editedText = document.getElementById('swal-input-text').value;
  
          // Update the post title and text in Firestore
          const docRef = doc(db, "posts", docSnap.id);
          updateDoc(docRef, { postTitle: editedTitle, postText: editedText })
            .then(() => {
              // Refresh the post list
              getAllPosts();
              Swal.fire('Post Updated!', '', 'success');
            })
            .catch((error) => {
              console.error("Error updating post: ", error);
              Swal.fire('Error', 'An error occurred while updating the post.', 'error');
            });
        }
      });
    }else{
      alert("You are not the owner of the post")
    }
  });

         deleteButton.addEventListener("click", async () => {
    if (myUser.email === postData.postOwner) {
      // Ask the user to confirm the deletion
      Swal.fire({
        title: 'Confirm Deletion',
        text: 'Are you sure you want to delete this post?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // Delete the document from Firestore
            await deleteDoc(doc(db, "posts", docSnap.id));
            // Refresh the post list
            getAllPosts();
            Swal.fire('Post Deleted!', '', 'success');
          } catch (error) {
            console.error("Error deleting post: ", error);
            Swal.fire('Error', 'An error occurred while deleting the post.', 'error');
          }
        }
      });
    } else {
      alert("You are not the owner of the post");
    }
  });
      }
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

// ... (remaining code)




  
  getAllPosts();
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


  // editButton.addEventListener("click", () => {
  //   if (myUser.email === postData.postOwner) {
  //     // Open SweetAlert input prompts for post title and text
  //     Swal.fire({
  //       title: 'Edit Post',
  //       html:
  //         `<input id="swal-input-title" class="swal2-input" value="${postTitle}" placeholder="Title">` +
  //         `<input id="swal-input-text" class="swal2-input" value="${postText}" placeholder="Text">`,
  //       showCancelButton: true,
  //       confirmButtonText: 'Save',
  //       cancelButtonText: 'Cancel',
  //       preConfirm: () => {
  //         // Get values from the input fields
  //         const editedTitle = document.getElementById('swal-input-title').value;
  //         const editedText = document.getElementById('swal-input-text').value;
  
  //         // Update the post title and text in Firestore
  //         const docRef = doc(db, "posts", docSnap.id);
  //         updateDoc(docRef, { postTitle: editedTitle, postText: editedText })
  //           .then(() => {
  //             // Refresh the post list
  //             getAllPosts();
  //             Swal.fire('Post Updated!', '', 'success');
  //           })
  //           .catch((error) => {
  //             console.error("Error updating post: ", error);
  //             Swal.fire('Error', 'An error occurred while updating the post.', 'error');
  //           });
  //       }
  //     });
  //   }else{
  //     alert("You are not the owner of the post")
  //   }
  // });



//import { loginCheck } from './app/loginCheck.js';
//import { setupPosts } from './app/postList.js';



//import './app/signupForm.js'
import './app/entrarForm.js'
//import './app/googleLogin.js'
//import './app/facebookLogin.js'
//import './app/githubLogin.js'
import './app/logout.js'
//import './app/postList.js'

//loginCheck('lccruz');


 const loggedInLinks = document.querySelectorAll(".logged-in");
loggedInLinks.forEach((link) => (link.style.display = "none")); 




/* const promise = new Promise((resolve,reject) => {
if(true){
  resolve("promesa resuelta");

}else{
  reject("promesa rechazada");
}
});

promise.then((respuesta)=>{
console.log(respuesta);
})
.catch(error=>{
console.log(error);
});
 */



/* 
// list for auth state changes
 onAuthStateChanged(auth, async (user) => {
   if (user) {
     loginCheck(user);
     try {
       const querySnapshot = await getDocs(collection(db, 'usuarios'));
       setupPosts(querySnapshot.docs);
     } catch (error) {
       console.log(error)
     }
   } else {
     setupPosts([]);
     loginCheck(user);
   }
 }); */
import { showMessage } from "./showMessage.js";
//import { firebase } from "./firebase.js"

//var boton = document.getElementById("abrirModal");



const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const entrarForm=document.querySelector('#login-form');



var  entro=0;
var mensaje="";

var firebaseConfig = {
  apiKey: "AIzaSyBVSLxnv_N8KM3JutyVlnX8Y6lTIZ2vrxA",
  authDomain: "prestaflashdesa.firebaseapp.com",
  databaseURL: "https://prestaflashdesa-default-rtdb.firebaseio.com",
  projectId: "prestaflashdesa",
  storageBucket: "prestaflashdesa.appspot.com",
  messagingSenderId: "777818191556",
  appId: "1:777818191556:web:cc5202d40b2288fa617b91",
  measurementId: "G-CKMVF0DZ87"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.database();
entrarForm.addEventListener('submit', async e=>{
e.preventDefault();

const usuario = entrarForm['login-email'].value;
const password = entrarForm['login-password'].value;


try {
  
  //const db = firebase.database();
//read
db.ref("usuarios/"+ usuario).on("value", (sanpshot) => {

  console.log("usuarios/"+usuario);
  console.log(sanpshot.val());
  console.log(sanpshot.child("contrasenia").val());

  if (sanpshot.child("contrasenia").val() === password){
    console.log("entroo");
  entro=255;
mensaje="Bienvenido " + sanpshot.child("gestor/nombreCompleto").val();
console.log("valor de entro: ---> "+entro);
console.log(mensaje);
  }else{
    entro=0;
    
  }

  //console.log("valor de entro: ---> "+entro);
if (entro===255){
  //var modal = document.getElementsByClassName('entrarModal');
  //var myModal = new bootstrap.Modal(document.getElementById('entrarModal'), options);
  // Get the modal
var modal = document.getElementById('entrarModal');
 /*  const modal = document.getElementById('entrarModal');
  modal.hide();  */

  modal.classList.remove('entrarModal');
  //const modal = document.querySelector('.modal fade');
  //modal
  //modal.hide();
  //modal.hidden();
  //modal.style.display = "none";
     // Close the login modal
/*      const modal = bootstrap.Modal.getInstance(entrarForm.closest('.entrarModal'));
     modal.hide(); */

    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));

  showMessage(mensaje);

  //const modal = bootstrap.Modal.getInstance(entrarForm.closest('.entrarModal'));
   //modal.hide();
}else{

  loggedInLinks.forEach((link) => (link.style.display = "none"));
  loggedOutLinks.forEach((link) => (link.style.display = "block"));
  showMessage("Contraseña Incorrecta", "error");

}

});


} catch (error) {
  showMessage("Algo Salio mal", "error");
  console.log(error.val);
}
});
/* //import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js"
//import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/7.15.0/firebase.js"
import { auth } from './firebase.js';
import { showMessage } from "./showMessage.js";

const entrarForm=document.querySelector('#login-form');

entrarForm.addEventListener('submit', async e=>{
e.preventDefault();

const email = entrarForm['login-email'].value;
const password = entrarForm['login-password'].value;


 try {
     const userCredentials = await signInWithEmailAndPassword(auth, email, password)
     //console.log(userCredentials)

     // Close the login modal
     const modal = bootstrap.Modal.getInstance(entrarForm.closest('.entrarModal'));
     modal.hide();

     // reset the form
     entrarForm.reset();

     // show welcome message
     showMessage("Bienvenido" + userCredentials.user.email);
   } catch (error) {
     if (error.code === 'auth/wrong-password') 
     {
       showMessage("Contraseña Incorrecta", "error")
     } 
     else if (error.code === 'auth/user-not-found') 
     {
       showMessage("Usuario no encontrado", "error")
     } 
     else 
     {
       showMessage("Algo esta mal", "error")
     }
   }

}); */


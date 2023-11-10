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



  if (sanpshot.child("contrasenia").val() === password){

  entro=255;
mensaje="Bienvenido " + sanpshot.child("gestor/nombreCompleto").val();

  }else{
    entro=0;
    
  }

if (entro===255){

var modal = document.getElementById('entrarModal');
  modal.classList.remove('entrarModal');
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
  showMessage(mensaje);
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




  //import { initializeApp,getFirebase } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
  //import { initializeApp } from "https://www.gstatic.com/firebasejs/7.15.0/firebase.js";
  //import { getAuth } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js"
  //import { getFirebase } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js"
  //import { initializeApp } from "firebase/app";
  //import { getDatabase } from "firebase/database";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/7.15.0/firebase.js"


  export const firebaseConfig = {
    apiKey: "AIzaSyBVSLxnv_N8KM3JutyVlnX8Y6lTIZ2vrxA",
    authDomain: "prestaflashdesa.firebaseapp.com",
    databaseURL: "https://prestaflashdesa-default-rtdb.firebaseio.com",
    projectId: "prestaflashdesa",
    storageBucket: "prestaflashdesa.appspot.com",
    messagingSenderId: "777818191556",
    appId: "1:777818191556:web:cc5202d40b2288fa617b91",
    measurementId: "G-CKMVF0DZ87"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const  firebase=initializeApp(firebaseConfig);
//export const auth = getAuth(app);
const database = getDatabase();

export{app,database,firebase};

//export const db = getDatabase(app);
//firebase.initializeApp(firebaseConfig);
/* export const db = firebase.database();
export const auth = firebase.auth(); */


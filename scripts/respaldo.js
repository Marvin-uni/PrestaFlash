//import { getStorage, ref, uploadBytes } from "firebase/storage";


const loggedOutLinks = document.querySelectorAll(".logged-out");
loggedOutLinks.forEach((link) => (link.style.display = "none")); 

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBVSLxnv_N8KM3JutyVlnX8Y6lTIZ2vrxA",
  authDomain: "prestaflashdesa.firebaseapp.com",
  databaseURL: "https://prestaflashdesa-default-rtdb.firebaseio.com",
  projectId: "prestaflashdesa",
  storageBucket: "prestaflashdesa.appspot.com",
  messagingSenderId: "777818191556",
  appId: "1:777818191556:web:cc5202d40b2288fa617b91",
  measurementId: "G-CKMVF0DZ87"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();


// Obtén el código de autorización y obtén el token de acceso
// Intercambia el código de autorización por un token de acceso

// Event listener para el botón de copia de seguridad
document.getElementById('backupButton').addEventListener('click', () => {
  document.getElementById('loadingMessage').style.display = 'block';
  backupDatabase();
});



// Función para realizar la copia de seguridad de Firebase
function backupDatabase() {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const formattedTime = currentDate.toTimeString().split(' ')[0];

  database.ref('/').once('value')
    .then(snapshot => {
      const data = JSON.stringify(snapshot.val());
      const blob = new Blob([data], { type: 'application/json' });
      const a = document.createElement('a');
      a.download = `backup_${formattedDate}_${formattedTime}.json`;
      a.href = URL.createObjectURL(blob);
      a.click();

      document.getElementById('loadingMessage').style.display = 'none';
      document.getElementById('loadingMessage12').style.display = 'block';
    })
    .catch(error => {
      console.error('Error durante la copia de seguridad:', error);
      document.getElementById('loadingMessage').style.display = 'none';
    });
}


// Event listener para el botón de subir a Google Drive
document.getElementById('SubirGDButton').addEventListener('click', async () => {
    document.getElementById('loadingMessage2').style.display = 'block';
    try {
      ////await backupDatabase2();

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      const formattedTime = currentDate.toTimeString().split(' ')[0];
    
      database.ref('/').once('value')
        .then(snapshot => {
          const data = JSON.stringify(snapshot.val());
          const blob = new Blob([data], { type: 'application/json' });
    
          const url = URL.createObjectURL(blob);
    
          const storageRef = firebase.storage().ref();

// Genera el blob
const blob2 = generateBlob(data);

// Define la ruta y el nombre del archivo en el storage
const filePath = 'Respaldo/Respaldo_'+formattedDate+'_'+formattedTime+'.json';
const fileRef = storageRef.child(filePath);

// Sube el blob al storage
fileRef.put(blob2).then((snapshot) => {
    document.getElementById('loadingMessage2').style.display = 'none';
    document.getElementById('loadingMessage3').style.display = 'block';
  console.log('Archivo subido con éxito:', snapshot);
}).catch((error) => {
    document.getElementById('loadingMessage2').style.display = 'none';
    document.getElementById('loadingMessage3').style.display = 'none';
  console.error('Error al subir el archivo:', error);
});

    
    
          document.getElementById('loadingMessage2').style.display = 'none';
         
        })
        .catch(error => {
          console.error('Error durante la copia de seguridad:', error);
          document.getElementById('loadingMessage2').style.display = 'none';
        });

      //////
    } catch (error) {
      console.error('Error durante la copia de seguridad:', error);
      document.getElementById('loadingMessage2').style.display = 'none';
    }
  });
  function generateBlob(data) {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    return blob;
  }
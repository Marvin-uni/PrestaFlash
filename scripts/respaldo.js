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
    
          // Crea un enlace temporal
          const a = document.createElement('a');
          a.href = url;
          a.download = `backup_${formattedDate}_${formattedTime}.json`;
    
          // Simula un clic en el enlace para abrir el diálogo de descarga del navegador
         // a.click();


                 // Datos para el archivo
       // const data = 'Contenido del archivo';

        // Crear un objeto Blob
        const blob2 = new Blob([data], { type: 'application/octet-stream' });

        // Crear un enlace de descarga
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = window.URL.createObjectURL(blob2);
        downloadLink.download = formattedDate+'_'+formattedTime+'Respaldo.json'; // Sugerir un nombre de archivo

        // Mostrar el enlace y permitir que el usuario haga clic en él
        //downloadLink.style.display = 'block';
    
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

// Función para realizar la copia de seguridad de Firebase
async function backupDatabase2() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toTimeString().split(' ')[0];
  
    const databaseSnapshot = await database.ref('/').once('value');
    const data = JSON.stringify(databaseSnapshot.val());
  
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: `backup_${formattedDate}_${formattedTime}.json`,
        types: [{
          description: 'JSON Files',
          accept: {
            'application/json': ['.json'],
          },
        }],
      });
  
      const writable = await handle.createWritable();
      await writable.write(data);
      await writable.close();
  
      // Ocultar el mensaje de carga después de la descarga
      document.getElementById('loadingMessage').style.display = 'none';
    } catch (error) {
      console.error('Error durante la copia de seguridad:', error);
      document.getElementById('loadingMessage').style.display = 'none';
    }
  }
  


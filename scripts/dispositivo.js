const loggedOutLinks = document.querySelectorAll(".logged-out");
loggedOutLinks.forEach((link) => (link.style.display = "none")); 

// Your web app's Firebase configuration
var config = {
  //export const firebaseConfig = {
    apiKey: "AIzaSyBVSLxnv_N8KM3JutyVlnX8Y6lTIZ2vrxA",
    authDomain: "prestaflashdesa.firebaseapp.com",
    databaseURL: "https://prestaflashdesa-default-rtdb.firebaseio.com",
    projectId: "prestaflashdesa",
    storageBucket: "prestaflashdesa.appspot.com",
    messagingSenderId: "777818191556",
    appId: "1:777818191556:web:cc5202d40b2288fa617b91",
    measurementId: "G-CKMVF0DZ87"
  //};
  //***ATENCIÓN***//
  //AQUÍ VA EL SDK QUE TE GENERE TÚ FIREBASE//
};


firebase.initializeApp(config);

const dbRef = firebase.database().ref();
const db = firebase.database();
const usersRef = dbRef.child('dispositivos');
const userListUI = document.getElementById("userList");

coleccionProductos = db.ref().child('dispositivos');
bodyProductos = $('#bodyProductos').val();
//para actualizar
$('form').submit(function(e){
  e.preventDefault();
  let nombre = $('#nombre').val();
  let imei = $('#imei').val();
  let estado ='Activo';

   idFirebase = coleccionProductos.push().key;

  data = {estado: estado,idDispositivo:idFirebase, imei: imei,nombre:nombre};
  actualizacionData = {};
  actualizacionData= data
  coleccionProductos.push(actualizacionData);
  id = '';
  $('form').trigger('reset');
  $('#modalAltaEdicion').modal('hide'); 

});

//para cancelar
$('#btnCancelar').submit(function(e){
  e.preventDefault();
 // console.log("entro a cANCELAR en modal alta");

});


const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

function mostrarProductos(nombre, imei, estado){

  
  return `
  <td>${nombre}</td>
  <td>${imei}</td>
  <td>${estado}</td>
  <td><button class="btnBorrar btn btn-danger" data-toggle="tooltip" title="Inactivar">${iconoEditar}</button></td>
  `
};

// En tu archivo JavaScript
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    // Logout exitoso, redirige a la página de inicio de sesión
    window.location.href = '/index.html';
  }).catch((error) => {
    // Maneja errores durante el logout
    console.error("Error durante el logout:", error);
  });
});
//CHILD_ADDED
coleccionProductos.on('child_added', data =>{

  let dispositivos = data.val();
  let tr = document.createElement('tr')
  tr.id = data.key
  //tr.innerHTML = mostrarProductos(data.val())
coleccionProductos = db.ref().child('dispositivos');
  tr.innerHTML = mostrarProductos(data.child("nombre").val(),data.child("imei").val(),data.child("estado").val())
  document.getElementById('bodyProductos').appendChild(tr)
});


//CHILD_CHANGED
coleccionProductos.on('child_changed', data =>{
  let nodoEditado = document.getElementById(data.key)
  nodoEditado.innerHTML = mostrarProductos(data.val())
});


//CHILD_REMOVED
coleccionProductos.on('child_removed', data =>{
  let nodoEditado = document.getElementById(data.key)
  document.getElementById('bodyProductos').removeChild(nodoEditado)
});


//Programación de los botones
$('#btnNuevo').click(function(){
  $('#id').val('');
  $('#codigo').val('');
  $('#descripcion').val('');
  $('#cantidad').val('');
  $('form').trigger('reset');
  $('#modalAltaEdicion').modal('show');
});

$('#tablaProductos').on('click', '.btnEditar', function(){
  let id = $(this).closest('tr').attr('id');
  let codigo = $(this).closest('tr').find('td:eq(0)').text();
  let descripcion = $(this).closest('tr').find('td:eq(1)').text();
  let cantidad = $(this).closest('tr').find('td:eq(2)').text();
  $('#id').val(id);
  $('#codigo').val(codigo);
  $('#descripcion').val(descripcion);                
  $('#cantidad').val(cantidad);                
  $('#modalAltaEdicion').modal('show');
});


$('#tablaProductos').on('click', '.btnBorrar', function(){
  let id = $(this).closest('tr').attr('id'); //capturamos el atributo ID de la fila  
  let nombre = $(this).closest('tr').find('td:eq(0)').text(); //capturamos el atributo ID de la fila 
    Swal.fire({
      title: '¿Está seguro de inactivar el Dispositivo?',
      html: "¡Está operación Inactiva el acceso del dispositivo!<br>Id: "+ id + "<br>Nombre: "+ nombre ,//text: "¡Está operación Inactiva el acceso del dispositivo!" + "\nId: "+ id + "\nNombre: "+ nombre ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Inactivar'
      }).then((result) => {
      if (result.value) {
          let id = $(this).closest('tr').attr('id'); //capturamos el atributo ID de la fila  
          db.ref(`dispositivos/${id}/`).update({estado: 'Inactivo'}) //Inactivamos el producto de firebase      
          Swal.fire('¡Cambios Guardados!', 'El Dispositivo ha sido Inactivado.','success')
          location.reload();
      }
      })        
}); 
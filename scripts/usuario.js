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
/*
const usersRef = dbRef.child('usuarios');
const userListUI = document.getElementById("userList");

usersRef.on("child_added", snap => {

	let user = snap.val();

	let $li = document.createElement("li");
	$li.innerHTML = user.login;
	$li.setAttribute("child-key", snap.key);
	$li.addEventListener("click", userClicked)
	userListUI.append($li);

});*/

// Ventana modal
var modal = document.getElementById("modalAltaEdicion");
 //var span = document.getElementsByClassName("cerrar")[0];
// Si el usuario hace clic en la x, la ventana se cierra
/* span.addEventListener("click",function() {
  modal.style.display = "none";
}); 
 */
// Si el usuario hace clic fuera de la ventana, se cierra.
window.addEventListener("click",function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

function userClicked(e) {

	var userID = e.target.getAttribute("child-key");

	const userRef = dbRef.child('usuarios/' + userID);
	const userDetailUI = document.getElementById("userDetail");

	userDetailUI.innerHTML = ""

	userRef.on("child_added", snap => {


		var $p = document.createElement("p");
		$p.innerHTML = snap.key  + " - " +  snap.val()
		userDetailUI.append($p);


	});

}

coleccionProductos = db.ref().child('usuarios');
bodyProductos = $('#bodyProductos').val();



$('form').submit(function(e){
  e.preventDefault();

  // Obtén una referencia al elemento select
const selectElement = document.getElementById('rol'); // Reemplaza 'miSelect' con el ID de tu elemento select

  let pn = $('#pn').val();
  let sn = $('#sn').val();
  let pa = $('#pa').val();
  let sa = $('#sa').val();
  let cedula = $('#cedula').val();


  let contrasenia= $('#contrasenia').val();

  let login = $('#usuario').val();
 // let estado = "Activo";
 if (selectElement.value === "1") {
  rol = "Admin";
} else if (selectElement.value === "2") {
  rol = "Colector";
}




   nuevoUsuario = {
    "carteras": {
      "-LNmY0JlA3f8QGA1hqQu":"true"//se establece para un nuevo usuario
    },
    "contrasenia": contrasenia,
    "gestor": {
      "apellidos": pa+" "+sa,
      "cedula": cedula,
      "nombreCompleto": pn+" "+sn+" "+pa+" "+sa,
      "nombres": pn+" "+sn
    },
    "login": login,
    "roles": {
      // Define los roles del nuevo usuario aquí
      [rol]:"true"
    },
    "status": "Activo", // Define el estado del nuevo usuario
    "ultimoInicioSesion": "" // Establece la fecha y hora actual como último inicio de sesión
  };


  coleccionProductos.child(nuevoUsuario.login).set(nuevoUsuario);
  //coleccionProductos.push(actualizacionData);
  
  //id = '';
  $('form').trigger('reset');
  $('#modalAltaEdicion').modal('hide');
});


const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';


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

function mostrarProductos(nombre, login, estado,rol){

  
  return `
  <td>${nombre}</td>
  <td>${login}</td>
  <td>${estado}</td>
  <td>${rol}</td>
  <td><button class="btnBorrar btn btn-danger" data-toggle="tooltip" title="Borrar">${iconoEditar}</button></td>
  `
};


//CHILD_ADDED
coleccionProductos.on('child_added', data =>{



  let usuarios = data.val();
    let gestor = data.child("gestor/nombreCompleto").val();

  let tr = document.createElement('tr')
  tr.id = data.key
coleccionProductos = db.ref().child('usuarios');
  tr.innerHTML = mostrarProductos(data.child("gestor/nombreCompleto").val(),usuarios.login,usuarios.status,Object.keys(data.child("roles/").val()))
  document.getElementById('bodyProductos').appendChild(tr)
});


//CHILD_CHANGED
coleccionProductos.on('child_changed', data =>{
  let nodoEditado = document.getElementById(data.key)
  nodoEditado.innerHTML = mostrarProductos(data.val())
});
// //CHILD_REMOVED

//Programación de los botones
$('#btnNuevo').click(function(){
  $('#id').val('');
  $('#nombre').val('');
  $('#login').val('');
  $('#rol').val('');
  $('form').trigger('reset');
  $('#modalAltaEdicion').modal('show');
});

$('#tablaProductos').on('click', '.btnEditar', function(){

  let rol = $(this).closest('tr').find('td:eq(2)').text();
              
  $('#rol').val(cantidad);                
  $('#modalAltaEdicion').modal('show');
});


 $('#tablaProductos').on('click', '.btnBorrar', function(){

  let id = $(this).closest('tr').attr('id'); //capturamos el atributo ID de la fila  
  let nombre = $(this).closest('tr').find('td:eq(0)').text(); //capturamos el atributo ID de la fila 

     Swal.fire({
       title: '¿Está seguro de inactivar el usuario?',
       html: "¡Está operación Inactiva el acceso del dispositivo!<br>Nombre: "+ nombre,// text: `¡Se inactivará el usuario!\nNombre: ${nombre}`,//"¡Se inactivara el usuario! "+" nombre: "+nombre,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#d33',
       cancelButtonColor: '#3085d6',
       confirmButtonText: 'Inactivar'
       }).then((result) => {
       if (result.value) {
         let id = $(this).closest('tr').attr('id'); //capturamos el atributo ID de la fila  
           db.ref(`usuarios/${id}/`).update({status: 'Inactivo'})//eliminamos el producto de firebase      
           Swal.fire('Cambios Guardados!', 'El usuario ha sido Inactivado.','success')
           location.reload();
       }
       })        
 }); 
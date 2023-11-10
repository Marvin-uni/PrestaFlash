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

/*
const dbRef = firebase.database().ref();
const db = firebase.database();*/

const db2 = firebase.database();

//const movimientosDiaRef = db2.ref('movimientos_dia');

// Ventana modal
var modal = document.getElementById("modalAltaEdicion");

// Si el usuario hace clic fuera de la ventana, se cierra.
window.addEventListener("click",function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

function userClicked(e) {

	var userID = e.target.getAttribute("child-key");

	const userRef = dbRef.child('movimientos_dia/' + userID);
	const userDetailUI = document.getElementById("userDetail");

	userDetailUI.innerHTML = ""

	userRef.on("child_added", snap => {


		var $p = document.createElement("p");
		$p.innerHTML = snap.key  + " - " +  snap.val()
		userDetailUI.append($p);


	});

}
 // Initialize Firebase
//firebase.initializeApp(firebaseConfig);
//const db = firebase.database();
//coleccionProductos = db.ref().child('dispositivos');
//coleccionProductos = db.ref.child('movimientos_dia');

const movimientosRef = db2.ref('movimientos_dia');

const informe = [];
let totalMontoAbonado = 0; 
var resultados = [];

document.getElementById('buscarButton').addEventListener('click', () => {
    const fechaInicio2 = document.getElementById('fechaInicio').value;
    const fechaFin2 = document.getElementById('fechaFin').value;

    //---
      // Reformatea las fechas en el formato yyyymmdd.
  const fechaInicio = fechaInicio2.split('-').join('');
  const fechaFin = fechaFin2.split('-').join('');



consultarMovimientos(fechaInicio, fechaFin, resultados)
  .then(function(resultados) {

    resultados.forEach(function(result) {
      let tr = document.createElement('tr');
      tr.innerHTML = mostrarProductos(result.nombreCliente, result.cartera, result.montoAbonado, result.fecha);
      document.getElementById('bodyProductos').appendChild(tr);

       // Suma el monto abonado al total.
       totalMontoAbonado += result.montoAbonado;
    });
              // Una vez que tengas el totalMontoAbonado, actualiza el elemento en tu HTML.
              const totalMontoAbonadoElement = document.getElementById('totalMontoAbonado');
              totalMontoAbonadoElement.textContent = 'Total de montos abonados: ' + totalMontoAbonado;
  })
  .catch(function(error) {
    console.log("Error al consultar Firebase Realtime Database:", error);
  });

})




function consultarMovimientos(fechaInicio, fechaFin, resultados) {
    return movimientosRef.orderByKey().startAt(fechaInicio).endAt(fechaFin).once("value")
      .then(function(snapshot) {
        var promesasCarteras = [];
  
        snapshot.forEach(function(fechaSnapshot) {
          var fecha = fechaSnapshot.key;
          var movimientosPorFecha = fechaSnapshot.val();
  
          for (var carteraId in movimientosPorFecha) {
            var carteraMovimientos = movimientosPorFecha[carteraId];
            var carteraRef = db2.ref("carteras/" + carteraId);
            var carteraNombre;
  
            promesasCarteras.push(
              carteraRef.once("value")
                .then(function(carteraSnapshot) {
                  var carteraData = carteraSnapshot.val();
                  carteraNombre = carteraData ? carteraData.nombre : "N/A";
                })
            );
  
            for (var prestamoId in carteraMovimientos) {
              var prestamoData = carteraMovimientos[prestamoId];
              var clienteId = prestamoData.clienteId;
              var montoAbono = prestamoData.montoAbonado;
              var clienteRef = db2.ref("clientes/" + clienteId);

              // Utiliza una función de promesa para mantener el contexto de 'prestamoData'
              function obtenerMontoAbonado(montoAbono) {

                return clienteRef.once("value")
                  .then(function(clienteSnapshot) {
                    var clienteData = clienteSnapshot.val();

                    
  
                    resultados.push({
                      nombreCliente: clienteData ? clienteData.nombreCompleto : "N/A",
                      cartera: carteraNombre,
                      montoAbonado: montoAbono,
                      fecha: fecha
                    });
                  });
              }
  
              promesasCarteras.push(obtenerMontoAbonado(montoAbono));
            }
          }
        });
  
        // Esperar a que todas las promesas se completen antes de devolver los resultados
        return Promise.all(promesasCarteras)
          .then(function() {
            return resultados;
          });
      });
  }

//-------------------------->>>
/////////////////////REPORTES
    // Array para almacenar los resultados
    var resultadosArray = [];
//*//***************recuperaciones
document.getElementById('buscarButtonC').addEventListener('click', () => {
//console.log("entrooooo");
  
    var fechaInicio2 = document.getElementById('fechaInicioc').valueAsNumber;
    var fechaFin2 = document.getElementById('fechaFinc').valueAsNumber;
  
    // Referencia a la colección de prestamos
    var prestamosRef = db2.ref("prestamos");
  

  
    // Realiza la consulta con el rango de fechas
    prestamosRef.orderByChild("fechaDesembolso").startAt(fechaInicio2).endAt(fechaFin2).once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(prestamoSnapshot) {
          var prestamoData = prestamoSnapshot.val();
  
          // Obtiene información del cliente y del plan de financiamiento
          var clienteData = prestamoData.cliente;
          var planData = prestamoData.planDeFinanciamiento;
  
          // Crea un objeto con los datos que necesitas
          var resultado = {
            nombreCliente: clienteData.nombreCompleto,
            capitalPrestado: prestamoData.capitalPrestado,
            descripcionPlan: planData.descripcion,
            frecuenciaPago: prestamoData.frecuenciaDePago,
            interesEfectivo: planData.interesEfectivo,
            plazoEnDias: planData.plazoEnDias
          };
  
          // Agrega el resultado al array
          resultadosArray.push(resultado);
  
          // Consulta la colección "carteras" para obtener el nombre de la cartera
          var carteraId = prestamoData.carteraId;
          var carterasRef = db2.ref("carteras/" + carteraId);
          carterasRef.once("value")
            .then(function(carteraSnapshot) {
              var carteraData = carteraSnapshot.val();
              
              // Agrega el nombre de la cartera al resultado
              resultado.nombreCartera = carteraData ? carteraData.nombre : "N/A";
  
              // Crea la fila de la tabla y agrega los resultados
              let tr = document.createElement('tr');
              tr.innerHTML = mostrarProductosC(
                resultado.nombreCliente,
                resultado.nombreCartera,
                resultado.capitalPrestado,
                resultado.descripcionPlan,
                resultado.frecuenciaPago,
                resultado.interesEfectivo,
                resultado.plazoEnDias
              );
  
              // Agrega la fila a la tabla
              document.getElementById('bodycolocacion').appendChild(tr);
            })
            .catch(function(carteraError) {
              console.error("Error al obtener información de la cartera:", carteraError);
            });
        });
      })
      .catch(function(error) {
        console.error("Error al realizar la consulta:", error);
      });
  });
  
  document.getElementById('exportXlsButton').addEventListener('click', () => {
    // Crear un objeto de trabajo de Excel
    var wb = XLSX.utils.book_new();
    
    // Crear una hoja de trabajo
    var ws = XLSX.utils.json_to_sheet(resultados);
  
    // Agregar la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Resultados');
  
    // Generar un archivo Excel
    XLSX.writeFile(wb, 'recuperacionesDel'+document.getElementById('fechaInicio').value+'Al'+document.getElementById('fechaFin').value +'.xlsx');
  });
/*
  document.getElementById('exportPDFButton').addEventListener('click', () => {
    // Crear un objeto de documento PDF
    var pdf = new jsPDF();
  
    // Configurar la posición inicial para escribir en el PDF
    var y = 10;
  
    // Iterar sobre los resultados y agregarlos al PDF
    resultados.forEach(function(resultados) {
      pdf.text(10, y, `Nombre Cliente: ${resultados.nombreCliente}`);
      pdf.text(10, y + 10, `Nombre Cartera: ${resultados.nombreCartera}`);
      // ... Agregar otros campos según sea necesario
      y += 20; // Ajustar el espacio entre las líneas
    });
  
    // Guardar o mostrar el archivo PDF
    pdf.save('resultados.pdf');
  });

*/
  document.getElementById('exportXlsButtonC').addEventListener('click', () => {
    // Crear un objeto de trabajo de Excel
    var wb = XLSX.utils.book_new();
    
    // Crear una hoja de trabajo
    var ws = XLSX.utils.json_to_sheet(resultadosArray);
  
    // Agregar la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Resultados');
  
    // Generar un archivo Excel
    XLSX.writeFile(wb, 'colocacionesDel'+document.getElementById('fechaInicioc').value+'Al'+document.getElementById('fechaFinc').value +'.xlsx');
  });

/*
  document.getElementById('exportarPDFButtonC').addEventListener('click', () => {
    // Crear un objeto de documento PDF
    var pdf = new jsPDF();
  
    // Configurar la posición inicial para escribir en el PDF
    var y = 10;
  
    // Iterar sobre los resultados y agregarlos al PDF
    resultadosArray.forEach(function(resultadosArray) {
      pdf.text(10, y, `Nombre Cliente: ${resultadosArray.nombreCliente}`);
      pdf.text(10, y + 10, `Nombre Cartera: ${resultadosArray.nombreCartera}`);
      // ... Agregar otros campos según sea necesario
      y += 20; // Ajustar el espacio entre las líneas
    });
  
    // Guardar o mostrar el archivo PDF
    pdf.save('resultados.pdf');
  });
*/
/********
 * 
 */

document.getElementById('limpiarTablaButton').addEventListener('click', () => {
    // Limpia el contenido de la tabla

    document.getElementById('bodyProductos').innerHTML = '';
    resultados = [];
    totalMontoAbonado=0;
  });


document.getElementById('limpiarTablaButtonC').addEventListener('click', () => {
    // Limpia el contenido de la tabla

    document.getElementById('bodycolocacion').innerHTML = '';
    resultadosArray = [];
  });
  

/////////////////////////*/


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
  
  /*
   let idFirebase = id;
  if(idFirebase == ''){
   idFirebase = coleccionProductos.push().key;
  }; */

  //data = {nombre:nombre, login: login, estado: estado,rol:rol};

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

function mostrarProductos(nombre, login, estado,rol){

  
  return `
  <td>${nombre}</td>
  <td>${login}</td>
  <td>${estado}</td>
  <td>${rol}</td>
  `
};

function mostrarProductosC(nombreCliente, nombreCartera, 
    capitalPrestado,descripcionPlan,frecuenciaPago,interesEfectivo,plazoEnDias){
    /*resultadosArray.nombreCliente, 
    resultadosArray.nombreCartera,
    resultadosArray.capitalPrestado,
    resultadosArray.descripcionPlan,
    resultadosArray.frecuenciaPago,
    resultadosArray.interesEfectivo,
    resultadosArray.plazoEnDias,*/
  
    return `
    <td>${nombreCliente}</td>
    <td>${nombreCartera}</td>
    <td>${capitalPrestado}</td>
    <td>${descripcionPlan}</td>
    <td>${frecuenciaPago}</td>
    <td>${interesEfectivo}</td>
    <td>${plazoEnDias}</td>
    `
  };


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
       text: "¡Se inactivara el usuario! "+" nombre: "+nombre,
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
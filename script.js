// Registro de datos
let registros = [];

// Función para registrar un objeto
function registrar() {
  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const telefono = document.getElementById('telefono').value;
  const ciudad = document.getElementById('ciudad').value;

  const nuevoRegistro = {
    nombre: nombre,
    correo: correo,
    telefono: telefono,
    ciudad: ciudad
  };

  registros.push(nuevoRegistro);
  console.log('Registro guardado:');
  console.log(nuevoRegistro);

  // Obtener el ID del primer registro en el arreglo
  const primerRegistro = registros[0];
  const idPrimerRegistro = primerRegistro.id;
  console.log(`El ID del primer registro es: ${idPrimerRegistro}`);

  // Limpiar los campos del formulario
  document.getElementById('nombre').value = '';
  document.getElementById('correo').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('ciudad').value = '';
}

// Función para eliminar un registro por ID
function eliminar() {
  const id = parseInt(document.getElementById('id').value);

  registros = registros.filter(registro => registro.id !== id);
  console.log(`Registro con ID ${id} eliminado.`);
}

// Función para modificar un registro por ID
function modificar() {
  const id = parseInt(document.getElementById('id').value);
  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const telefono = document.getElementById('telefono').value;
  const ciudad = document.getElementById('ciudadSelect').value;

  const registroModificado = {
    id: id,
    nombre: nombre,
    correo: correo,
    telefono: telefono,
    ciudad: ciudad
  };

  const registroIndex = registros.findIndex(registro => registro.id === id);
  if (registroIndex !== -1) {
    registros[registroIndex] = registroModificado;
    console.log(`Registro con ID ${id} modificado.`);
    console.log('Registro actualizado:');
    console.log(registroModificado);
  } else {
    console.log(`No se encontró ningún registro con ID ${id}.`);
  }
}

// Función para mostrar todos los registros
function mostrarTodo() {
  console.log('Registros:');
  registros.forEach(registro => console.log(registro));
}

// Función para mostrar todos los registros en la página HTML
function mostrarTodoEnHTML() {
  // Obtener el elemento div donde se mostrarán los registros
  var registrosDiv = document.getElementById('registros');

  // Limpiar el contenido del div antes de mostrar los registros
  registrosDiv.innerHTML = '';

  // Recorrer el arreglo de registros y mostrar cada uno en el div
  for (var i = 0; i < registros.length; i++) {
    var registro = registros[i];

    // Crear un elemento <p> para mostrar el registro
    var registroP = document.createElement('p');
    registroP.textContent = 'ID: ' + registro.id + ', Nombre: ' + registro.nombre + ', Correo: ' + registro.correo + ', Teléfono: ' + registro.telefono + ', Ciudad: ' + registro.ciudad;

    // Agregar el elemento <p> al div de registros
    registrosDiv.appendChild(registroP);
  }
}

// Lista de ciudades de Chile
var ciudadesChile = [
  "Caldera", "Copiapó", "Tierra Amarilla", "Santiago", "Valparaíso",
  "Concepción", "Viña del Mar", "Antofagasta", "Valdivia", "La Serena",
  "Iquique", "Rancagua", "Talca", "Arica", "Chillán", "Puerto Montt",
  "Osorno", "Coquimbo", "Temuco", "Punta Arenas"
];

// Función para mostrar las sugerencias de ciudades según el texto ingresado
window.addEventListener("DOMContentLoaded", function() {
  var sugerenciasDiv = document.getElementById("sugerenciasCiudad");
  sugerenciasDiv.style.display = "none"; // Oculta el div al cargar la página

  var input = document.getElementById("busquedaCiudad");
  input.addEventListener("input", mostrarSugerencias); // Agrega un event listener al input
});

function mostrarSugerencias() {
  var input = document.getElementById("busquedaCiudad");
  var filter = input.value.toUpperCase();
  var sugerenciasDiv = document.getElementById("sugerenciasCiudad");

  if (filter === "") {
    sugerenciasDiv.style.display = "none"; // Oculta el div si no hay texto
    return;
  }

  sugerenciasDiv.style.display = "block"; // Muestra el div si hay texto
  sugerenciasDiv.innerHTML = "";

  for (var i = 0; i < ciudadesChile.length; i++) {
    var ciudad = ciudadesChile[i];
    if (ciudad.toUpperCase().startsWith(filter)) {
      var sugerencia = document.createElement("p");
      sugerencia.textContent = ciudad;
      sugerencia.addEventListener("click", seleccionarCiudad);
      sugerenciasDiv.appendChild(sugerencia);
    }
  }
}

// Función para generar las opciones de ciudad en el formulario de modificar
function generarOpcionesCiudadModificacion() {
  var ciudadSelect = document.getElementById("ciudadSelect");

  // Eliminar las opciones existentes
  ciudadSelect.innerHTML = "";

  // Generar las nuevas opciones
  for (var i = 0; i < ciudadesChile.length; i++) {
    var ciudad = ciudadesChile[i];
    var opcion = document.createElement("option");
    opcion.value = ciudad;
    opcion.textContent = ciudad;
    ciudadSelect.appendChild(opcion);
  }
}

// Función para mostrar las sugerencias de ciudades según el texto ingresado en el formulario de modificar
function mostrarSugerenciasModificacion() {
  var input = document.getElementById("busquedaCiudadModificacion");
  var filter = input.value.toUpperCase();
  var sugerenciasDiv = document.getElementById("sugerenciasCiudadModificacion");

  if (filter === "") {
    sugerenciasDiv.style.display = "none"; // Oculta el div si no hay texto
    return;
  }

  sugerenciasDiv.style.display = "block"; // Muestra el div si hay texto
  sugerenciasDiv.innerHTML = "";

  for (var i = 0; i < ciudadesChile.length; i++) {
    var ciudad = ciudadesChile[i];
    if (ciudad.toUpperCase().startsWith(filter)) {
      var sugerencia = document.createElement("p");
      sugerencia.textContent = ciudad;
      sugerencia.addEventListener("click", seleccionarCiudadModificacion);
      sugerenciasDiv.appendChild(sugerencia);
    }
  }
}

// Función para seleccionar una ciudad del formulario de modificar
function seleccionarCiudadModificacion(event) {
  var ciudadSeleccionada = event.target.textContent;
  document.getElementById("busquedaCiudadModificacion").value = ciudadSeleccionada;
  document.getElementById("sugerenciasCiudadModificacion").style.display = "none"; // Oculta el div al seleccionar una ciudad
}

// Ejecutar las funciones necesarias al cargar la página
window.addEventListener("DOMContentLoaded", function() {
  generarOpcionesCiudadModificacion();

  var input = document.getElementById("busquedaCiudadModificacion");
  input.addEventListener("input", mostrarSugerenciasModificacion); // Agrega un event listener al input de búsqueda
});

function seleccionarCiudad(event) {
  var ciudadSeleccionada = event.target.textContent;
  document.getElementById("busquedaCiudad").value = ciudadSeleccionada;
  document.getElementById("sugerenciasCiudad").style.display = "none"; // Oculta el div al seleccionar una ciudad
}

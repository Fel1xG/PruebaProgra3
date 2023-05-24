// Registro de datos
let registros = [];
let idRegistro = 1; // Variable para generar IDs

// Función para obtener los datos de autocompletado
function obtenerDatosAutocompletado() {
  return {
    nombres: registros.map(registro => registro.nombre),
    correos: registros.map(registro => registro.correo),
    telefonos: registros.map(registro => registro.telefono),
    direcciones: registros.map(registro => registro.direccion),
    ciudades: ciudadesChile
  };
}

// Función para mostrar las sugerencias de autocompletado
function mostrarSugerencias() {
  const busquedaCiudad = document.getElementById('busquedaCiudad');
  const sugerenciasCiudad = document.getElementById('sugerenciasCiudad');

  const busqueda = busquedaCiudad.value.toLowerCase();
  const datosAutocompletado = obtenerDatosAutocompletado();

  // Verificar que se haya ingresado un valor en el campo de búsqueda
  if (busqueda.length === 0) {
    sugerenciasCiudad.innerHTML = '';
    return;
  }

 // Filtrar las sugerencias de ciudad basadas en la búsqueda
 const sugerenciasFiltradas = datosAutocompletado.ciudades.filter(ciudad =>
  ciudad.toLowerCase().startsWith(busqueda)
);

// Mostrar las sugerencias en el elemento HTML correspondiente
sugerenciasCiudad.innerHTML = '';
sugerenciasFiltradas.forEach(sugerencia => {
  const p = document.createElement('p');
  p.textContent = sugerencia;
  p.addEventListener('click', () => {
    // Asignar el valor seleccionado al campo de búsqueda
    busquedaCiudad.value = sugerencia;
    // Limpiar las sugerencias
    sugerenciasCiudad.innerHTML = '';
  });
  sugerenciasCiudad.appendChild(p);
});
}

// Función para registrar un objeto
function registrar() {
  const nombreElement = document.getElementById('nombre');
  const correoElement = document.getElementById('correo');
  const telefonoElement = document.getElementById('telefono');
  const busquedaCiudadElement = document.getElementById('busquedaCiudad');
  const direccionElement = document.getElementById('direccion');

 // Obtener los valores de los elementos de formulario
  const nombre = nombreElement.value.trim();
  const correo = correoElement.value.trim();
  const telefono = telefonoElement.value.trim();
  const ciudad = busquedaCiudadElement.value.trim();
  const direccion = direccionElement.value.trim();


  // Verificar que los campos no estén vacíos
  if (nombre === '' || correo === '' || telefono === '' || ciudad === '' || direccion === '') {
    console.log('Todos los campos son requeridos.');
    return;
  }

  const nuevoRegistro = {
    id: idRegistro,
    nombre: nombre,
    correo: correo,
    telefono: telefono,
    ciudad: ciudad,
    direccion: direccion
  };

  registros.push(nuevoRegistro);
  console.log('Registro guardado:');
  console.log(nuevoRegistro);

 // Incrementar el ID para el próximo registro
  idRegistro++;

  // Limpiar los campos del formulario
  nombreElement.value = '';
  correoElement.value = '';
  telefonoElement.value = '';
  busquedaCiudadElement.value = '';
  direccionElement.value = '';
}

// Función para eliminar un registro por ID
function eliminar() {
  const id = parseInt(document.getElementById('id').value);

  registros = registros.filter(registro => registro.id !== id);
  console.log(`Registro con ID ${id} eliminado.`);
}

// Función para modificar un registro por ID
function modificar() {
  const id = parseInt(document.getElementById('id').value); // Obtén el ID del registro a modificar
  const nombre = document.getElementById('nombre').value; // Nuevo nombre
  const correo = document.getElementById('correo').value; // Nuevo correo
  const telefono = document.getElementById('telefono').value; // Nuevo teléfono
  const ciudad = document.getElementById('busquedaCiudad').value; // Nueva ciudad

  // Encuentra el registro con el ID correspondiente en el arreglo de registros
  const registroModificado = registros.find(registro => registro.id === id);

  if (registroModificado) {
    // Modifica solo los campos correspondientes en el registro
    registroModificado.nombre = nombre;
    registroModificado.correo = correo;
    registroModificado.telefono = telefono;
    registroModificado.ciudad = ciudad;

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
  'Caldera', 'Copiapó', 'Tierra Amarilla', 'Santiago', 'Valparaíso',
  'Concepción', 'Viña del Mar', 'Antofagasta', 'Valdivia', 'La Serena',
  'Iquique', 'Rancagua', 'Talca', 'Arica', 'Chillán', 'Puerto Montt',
  'Osorno', 'Coquimbo', 'Temuco', 'Punta Arenas'
];

// Función para mostrar las sugerencias de ciudades según la inicial ingresada
function mostrarSugerencias() {
  var input = document.getElementById('busquedaCiudad');
  var filter = input.value.toUpperCase();
  var sugerenciasDiv = document.getElementById('sugerenciasCiudad');

  if (filter === '') {
    sugerenciasDiv.style.display = 'none'; // Oculta el div si no hay texto
    return;
  }

  sugerenciasDiv.style.display = 'block'; // Muestra el div si hay texto
  sugerenciasDiv.innerHTML = '';

  for (var i = 0; i < ciudadesChile.length; i++) {
    var ciudad = ciudadesChile[i];
    if (ciudad.toUpperCase().startsWith(filter)) {
      var sugerencia = document.createElement('p');
      sugerencia.textContent = ciudad;
      sugerencia.addEventListener('click', seleccionarCiudad);
      sugerenciasDiv.appendChild(sugerencia);
    }
  }
}

// Función para seleccionar una ciudad del formulario
function seleccionarCiudad(event) {
  var ciudadSeleccionada = event.target.textContent;
  document.getElementById('busquedaCiudad').value = ciudadSeleccionada;
  document.getElementById('sugerenciasCiudad').style.display = 'none'; // Oculta el div al seleccionar una ciudad
}

// Ejecutar las funciones necesarias al cargar la página
window.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('busquedaCiudad');
  input.addEventListener('input', mostrarSugerencias); // Agrega un event listener al input
});
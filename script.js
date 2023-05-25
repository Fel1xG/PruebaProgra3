// Registro de datos
let registros = localStorage.getItem('registros') ? JSON.parse(localStorage.getItem('registros')) : [];
let idRegistro = localStorage.getItem('idRegistro') ? parseInt(localStorage.getItem('idRegistro')) : 1;

// Función para guardar los registros en el almacenamiento local
function guardarRegistrosEnLocalStorage() {
  localStorage.setItem('registros', JSON.stringify(registros));
  localStorage.setItem('idRegistro', idRegistro.toString());
}

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

  guardarRegistrosEnLocalStorage();
}

// Función para eliminar un registro por ID
function eliminar() {
  const id = parseInt(document.getElementById('id').value);

  registros = registros.filter(registro => registro.id !== id);
  console.log(`Registro con ID ${id} eliminado.`);

  guardarRegistrosEnLocalStorage();
}

// Función para mostrar todos los registros en el HTML
function mostrarTodoEnHTML() {
  const registrosContainer = document.getElementById('registrosContainer');
  registrosContainer.innerHTML = '';

  registros.forEach(registro => {
    const registroDiv = document.createElement('div');
    registroDiv.classList.add('registro');

    const idP = document.createElement('p');
    idP.textContent = `ID: ${registro.id}`;
    registroDiv.appendChild(idP);

    const nombreP = document.createElement('p');
    nombreP.textContent = `Nombre: ${registro.nombre}`;
    registroDiv.appendChild(nombreP);

    const correoP = document.createElement('p');
    correoP.textContent = `Correo: ${registro.correo}`;
    registroDiv.appendChild(correoP);

    const telefonoP = document.createElement('p');
    telefonoP.textContent = `Teléfono: ${registro.telefono}`;
    registroDiv.appendChild(telefonoP);

    const ciudadP = document.createElement('p');
    ciudadP.textContent = `Ciudad: ${registro.ciudad}`;
    registroDiv.appendChild(ciudadP);

    const direccionP = document.createElement('p');
    direccionP.textContent = `Dirección: ${registro.direccion}`;
    registroDiv.appendChild(direccionP);

    registrosContainer.appendChild(registroDiv);
  });
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
  input.addEventListener('keyup', mostrarSugerencias);
  input.addEventListener('focus', mostrarSugerencias);

  mostrarTodoEnHTML();
});

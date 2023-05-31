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
  const generoMasculinoElement = document.getElementById('genero-masculino');
  const generoFemeninoElement = document.getElementById('genero-femenino');

  // Obtener los valores de los elementos de formulario
  const nombre = nombreElement.value.trim();
  const correo = correoElement.value.trim();
  const telefono = telefonoElement.value.trim();
  const ciudad = busquedaCiudadElement.value.trim();
  const direccion = direccionElement.value.trim();
  const genero = generoMasculinoElement.checked ? 'masculino' : 'femenino';

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
    direccion: direccion,
    genero: genero
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
  generoMasculinoElement.checked = false;
  generoFemeninoElement.checked = false;

  guardarRegistrosEnLocalStorage();
}

// Función para eliminar un registro por ID
function eliminar() {
  const id = parseInt(document.getElementById('id').value);

  registros = registros.filter(registro => registro.id !== id);
  console.log(`Registro con ID ${id} eliminado.`);

  guardarRegistrosEnLocalStorage();
}

// Función para modificar un registro por ID
function modificar() {
  const id = parseInt(document.getElementById('idModificacion').value);

  const nombreElement = document.getElementById('nombre');
  const correoElement = document.getElementById('correo');
  const telefonoElement = document.getElementById('telefono');
  const busquedaCiudadElement = document.getElementById('busquedaCiudad');
  const direccionElement = document.getElementById('direccion');
  const generoMasculinoElement = document.getElementById('genero-masculino');
  const generoFemeninoElement = document.getElementById('genero-femenino');

  const nombre = nombreElement.value.trim();
  const correo = correoElement.value.trim();
  const telefono = telefonoElement.value.trim();
  const ciudad = busquedaCiudadElement.value.trim();
  const direccion = direccionElement.value.trim();
  const genero = generoMasculinoElement.checked ? 'masculino' : 'femenino';

  if (nombre === '' || correo === '' || telefono === '' || ciudad === '' || direccion === '') {
    console.log('Todos los campos son requeridos.');
    return;
  }

  const registroModificado = {
    id: id,
    nombre: nombre,
    correo: correo,
    telefono: telefono,
    ciudad: ciudad,
    direccion: direccion,
    genero: genero
  };

  registros = registros.map(registro => registro.id === id ? registroModificado : registro);
  console.log(`Registro con ID ${id} modificado:`);
  console.log(registroModificado);

  // Limpiar los campos del formulario
  nombreElement.value = '';
  correoElement.value = '';
  telefonoElement.value = '';
  busquedaCiudadElement.value = '';
  direccionElement.value = '';
  generoMasculinoElement.checked = false;
  generoFemeninoElement.checked = false;

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

    const generoP = document.createElement('p');
    generoP.textContent = `Género: ${registro.genero}`;
    registroDiv.appendChild(generoP);

    const ciudadP = document.createElement('p');
    ciudadP.textContent = `Ciudad: ${registro.ciudad}`;
    registroDiv.appendChild(ciudadP);

    const direccionP = document.createElement('p');
    direccionP.textContent = `Dirección: ${registro.direccion}`;
    registroDiv.appendChild(direccionP);

    registrosContainer.appendChild(registroDiv);
  });
}


// Función para cargar los registros desde el almacenamiento local y mostrarlos en el HTML
function cargarRegistrosDesdeLocalStorage() {
  if (localStorage.getItem('registros')) {
    registros = JSON.parse(localStorage.getItem('registros'));
    idRegistro = parseInt(localStorage.getItem('idRegistro'));
    mostrarTodoEnHTML();
  }
}


// Función para mostrar todos los registros
function mostrarTodo() {
  // Obtener el elemento div donde se mostrarán los registros
  var registrosDiv = document.getElementById("registros");

  // Limpiar el contenido del div antes de mostrar los registros
  registrosDiv.innerHTML = "";

  // Recorrer el arreglo de registros y mostrar cada uno en el div
  for (var i = 0; i < registros.length; i++) {
    var registro = registros[i];

    // Crear un elemento <p> para mostrar el registro
    var registroP = document.createElement("p");
    registroP.textContent = "ID: " + registro.id + ", Nombre: " + registro.nombre + ", Correo: " + registro.correo + ", Teléfono: " + registro.telefono + ", Ciudad: " + registro.ciudad + ", Dirección: " + registro.direccion;

    // Agregar el elemento <p> al div de registros
    registrosDiv.appendChild(registroP);
  }
}


// Evento para mostrar sugerencias de autocompletado al escribir en el campo de búsqueda de ciudad
document.getElementById('busquedaCiudad').addEventListener('input', mostrarSugerencias);

// Evento para registrar un nuevo objeto al hacer clic en el botón "Registrar"
document.getElementById('registrarBtn').addEventListener('click', registrar);

// Evento para eliminar un registro al hacer clic en el botón "Eliminar"
document.getElementById('eliminarBtn').addEventListener('click', eliminar);

// Evento para modificar un registro al hacer clic en el botón "Modificar"
document.getElementById('modificarBtn').addEventListener('click', modificar);

// Cargar los registros desde el almacenamiento local al cargar la página
cargarRegistrosDesdeLocalStorage();

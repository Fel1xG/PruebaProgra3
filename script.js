// Registro de datos
let registros = localStorage.getItem('registros') ? JSON.parse(localStorage.getItem('registros')) : [];
let idRegistro = localStorage.getItem('idRegistro') ? parseInt(localStorage.getItem('idRegistro')) : 1;
let registrosEliminados = localStorage.getItem('registrosEliminados') ? JSON.parse(localStorage.getItem('registrosEliminados')) : [];

// Función para guardar los registros en el almacenamiento local
function guardarRegistrosEnLocalStorage() {
  localStorage.setItem('registros', JSON.stringify(registros));
  localStorage.setItem('idRegistro', idRegistro.toString());
  localStorage.setItem('registrosEliminados', JSON.stringify(registrosEliminados));
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

  // Mostrar todos los registros en el HTML
  mostrarTodoEnHTML();
}

// Función para eliminar un registro por ID
function eliminar() {
  const id = parseInt(document.getElementById('id').value);

  const registroEliminado = registros.find(registro => registro.id === id);
  if (!registroEliminado) {
    mostrarMensajeEliminacion(`No se encontró ningún registro con el ID ${id}.`);
    return;
  }

  registros = registros.filter(registro => registro.id !== id);
  registrosEliminados.push(registroEliminado);
  guardarRegistrosEnLocalStorage();

  // Volver a mostrar los IDs registrados en el campo de entrada del ID
  mostrarIDsRegistrados();

  mostrarMensajeEliminacion(`Registro con ID ${id} eliminado correctamente.`);

  // Mostrar todos los registros en el HTML
  mostrarTodoEnHTML();
}

// Ocultar el contenedor de registros al cargar la página
window.addEventListener('DOMContentLoaded', function() {
  const registrosContainer = document.getElementById('registrosContainer');
  registrosContainer.style.display = 'none';
});

// Función para mostrar todos los registros en el HTML
function mostrarTodoEnHTML() {
  const registrosContainer = document.getElementById('registrosContainer');
  registrosContainer.innerHTML = '';

  registros.forEach(registro => {
    const registroDiv = document.createElement('div');
    registroDiv.classList.add('registro');

    const idP = document.createElement('p');
    idP.textContent = `ID: ${registro.id}`;

    const nombreP = document.createElement('p');
    nombreP.textContent = `Nombre: ${registro.nombre}`;

    const correoP = document.createElement('p');
    correoP.textContent = `Correo: ${registro.correo}`;

    const telefonoP = document.createElement('p');
    telefonoP.textContent = `Teléfono: ${registro.telefono}`;

    const ciudadP = document.createElement('p');
    ciudadP.textContent = `Ciudad: ${registro.ciudad}`;

    const direccionP = document.createElement('p');
    direccionP.textContent = `Dirección: ${registro.direccion}`;

    const generoP = document.createElement('p');
    generoP.textContent = `Género: ${registro.genero}`;

    registroDiv.appendChild(idP);
    registroDiv.appendChild(nombreP);
    registroDiv.appendChild(correoP);
    registroDiv.appendChild(telefonoP);
    registroDiv.appendChild(ciudadP);
    registroDiv.appendChild(direccionP);
    registroDiv.appendChild(generoP);

    registrosContainer.appendChild(registroDiv);
  });

  // Mostrar el contenedor de registros al hacer clic en el botón
  registrosContainer.style.display = 'block';


  

  // Mostrar los IDs registrados en el campo de entrada del ID
  mostrarIDsRegistrados();
}

// Función para mostrar el mensaje de eliminación en el HTML
function mostrarMensajeEliminacion(mensaje) {
  const mensajeEliminacionElement = document.getElementById('mensajeEliminacion');
  mensajeEliminacionElement.textContent = mensaje;
}

// Función para mostrar los IDs registrados en el campo de entrada del ID
function mostrarIDsRegistrados() {
  const idElement = document.getElementById('id');
  idElement.innerHTML = '';

  registros.forEach(registro => {
    const option = document.createElement('option');
    option.value = registro.id;
    option.textContent = registro.id;
    idElement.appendChild(option);
  });

  // Si hay registros, seleccionar el primer ID por defecto
  if (registros.length > 0) {
    idElement.value = registros[0].id;
  }
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

  // Establece el mensaje de registro modificado
  document.getElementById('mensaje').textContent = "Registro Modificado Correctamente";

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

  // Mostrar todos los registros en el HTML
  mostrarTodoEnHTML();
}

// ...

// Cargar los registros desde el almacenamiento local al cargar la página
cargarRegistrosDesdeLocalStorage();

// Mostrar todos los registros en el HTML al cargar la página
mostrarTodoEnHTML();

// Event listeners
nombreElement.addEventListener('input', mostrarSugerencias);
correoElement.addEventListener('input', mostrarSugerencias);
telefonoElement.addEventListener('input', mostrarSugerencias);
busquedaCiudadElement.addEventListener('input', mostrarSugerencias);
direccionElement.addEventListener('input', mostrarSugerencias);
generoMasculinoElement.addEventListener('change', mostrarSugerencias);
generoFemeninoElement.addEventListener('change', mostrarSugerencias);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  registrar();
});
eliminarButton.addEventListener('click', eliminar);
modificarButton.addEventListener('click', modificar);

function toggleTheme() {
  var body = document.body;
  body.classList.toggle("dark-theme");

  // Guardar la preferencia del usuario en el almacenamiento local
  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  // Agregar o quitar la clase "dark-theme" al formulario
  var forms = document.querySelectorAll("form");
  forms.forEach(function (form) {
    form.classList.toggle("dark-theme");
  });
}

// Cargar el tema preferido del usuario al cargar la página
window.addEventListener("DOMContentLoaded", function () {
  var theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark-theme");

    // Agregar la clase "dark-theme" a los formularios
    var forms = document.querySelectorAll("form");
    forms.forEach(function (form) {
      form.classList.add("dark-theme");
    });
  }
});


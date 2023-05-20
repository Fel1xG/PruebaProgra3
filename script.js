// Inicialmente, el arreglo de registros estará vacío
var registros = [];

// Función para registrar un nuevo registro
function registrar() {
  var nombre = document.getElementById("nombreInput").value;
  var rut = document.getElementById("rutInput").value;
  var altura = document.getElementById("alturaInput").value;
  var fechaNacimiento = document.getElementById("fechaNacimientoInput").value;
  var direccion = document.getElementById("direccionInput").value;
  var telefono = document.getElementById("telefonoInput").value;

  // Crear un objeto de registro con los valores ingresados
  var nuevoRegistro = {
    nombre: nombre,
    rut: rut,
    altura: altura,
    fechaNacimiento: fechaNacimiento,
    direccion: direccion,
    telefono: telefono
  };

  // Agregar el nuevo registro al arreglo de registros
  registros.push(nuevoRegistro);

  // Mostrar los campos en la consola
  console.log("Nombre:", nombre);
  console.log("RUT:", rut);
  console.log("Altura:", altura);
  console.log("Fecha de Nacimiento:", fechaNacimiento);
  console.log("Dirección:", direccion);
  console.log("Teléfono:", telefono);

  // Limpiar los campos del formulario después de registrar
  document.getElementById("nombreInput").value = "";
  document.getElementById("rutInput").value = "";
  document.getElementById("alturaInput").value = "";
  document.getElementById("fechaNacimientoInput").value = "";
  document.getElementById("direccionInput").value = "";
  document.getElementById("telefonoInput").value = "";
}

// Función para eliminar un registro
function eliminar(index) {
  // Verificar si el índice es válido
  if (index >= 0 && index < registros.length) {
    // Eliminar el registro del arreglo
    registros.splice(index, 1);
    // Mostrar los registros actualizados
    mostrarRegistros();
  }
}

// Función para mostrar todos los registros
function mostrarRegistros() {
  var registrosContainer = document.getElementById("registrosContainer");

  // Limpiar el contenedor
  registrosContainer.innerHTML = "";

  // Mostrar cada registro en el contenedor
  registros.forEach(function(registro, index) {
    var registroDiv = document.createElement("div");
    registroDiv.innerHTML =
      "<span class='nombre'>Nombre: " + registro.nombre + "</span><br>" +
      "RUT: " + registro.rut + "<br>" +
      "Altura: " + registro.altura + "<br>" +
      "Fecha de Nacimiento: " + registro.fechaNacimiento + "<br>" +
      "Dirección: " + registro.direccion + "<br>" +
      "Teléfono: " + registro.telefono + "<br><br>" +
      "<button onclick='eliminar(" + index + ")'>Eliminar</button>";

    registrosContainer.appendChild(registroDiv);
  });
}
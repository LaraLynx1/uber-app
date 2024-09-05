const socket = io(); // Conectar a Socket.IO

let nombreConductor = '';
let vehiculoSeleccionado = '';

// Función para iniciar sesión como conductor
function loginConductor() {
	nombreConductor = document.getElementById('nombreConductor').value;
	if (!nombreConductor) {
		alert('Por favor, ingresa tu nombre.');
		return;
	}

	// Mostrar la selección de vehículo después de iniciar sesión
	document.getElementById('seleccionVehiculo').style.display = 'block';
}

// Función para seleccionar un vehículo
function seleccionarVehiculo(vehiculo) {
	vehiculoSeleccionado = vehiculo;
	document.getElementById('estadoConductor').style.display = 'block';
}

// Función para activar o desactivar el conductor
function cambiarEstado(estado) {
	if (estado === 'activar') {
		socket.emit('conductorActivo', { nombre: nombreConductor, vehiculo: vehiculoSeleccionado });
	} else {
		socket.emit('conductorInactivo', { nombre: nombreConductor });
	}
}

// Escuchar el evento de nuevo viaje
socket.on('nuevoViaje', ({ nombrePasajero, origen, destino }) => {
	const nuevoViajeDiv = document.createElement('div');
	nuevoViajeDiv.innerHTML = `<p>Nuevo viaje solicitado:</p>
                             <p><strong>Pasajero:</strong> ${nombrePasajero}</p>
                             <p><strong>Origen:</strong> ${origen}</p>
                             <p><strong>Destino:</strong> ${destino}</p>`;
	document.getElementById('viajesPendientes').appendChild(nuevoViajeDiv);
});

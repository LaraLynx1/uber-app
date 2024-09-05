const socket = io();

function loginConductor() {
	const nombre = document.getElementById('nombreConductor').value;
	const vehiculo = document.getElementById('vehiculoSeleccionado').value;

	if (!nombre || !vehiculo) {
		alert('Por favor, completa todos los campos.');
		return;
	}

	// Mostrar el panel de control del conductor
	document.getElementById('estadoConductor').style.display = 'block';
}

function activarConductor() {
	socket.emit('conductorActivo', {
		nombre: document.getElementById('nombreConductor').value,
		vehiculo: document.getElementById('vehiculoSeleccionado').value,
	});
}

function desactivarConductor() {
	socket.emit('conductorInactivo', { nombre: document.getElementById('nombreConductor').value });
}

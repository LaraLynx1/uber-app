const socket = io(); // Conectar a Socket.IO

let nombrePasajero = '';

async function loginPasajero() {
	nombrePasajero = document.getElementById('nombrePasajero').value;
	if (!nombrePasajero) {
		alert('Por favor, ingresa tu nombre.');
		return;
	}

	document.getElementById('viaje').style.display = 'block';
	actualizarConductores();
}

function actualizarConductores() {
	// Solicitar la lista de conductores activos al servidor
	fetch('/conductores/activos')
		.then((response) => response.json())
		.then((conductores) => {
			const conductoresDisponiblesDiv = document.getElementById('conductoresDisponibles');
			conductoresDisponiblesDiv.innerHTML = ''; // Limpiar la lista actual
			conductores.forEach((conductor) => {
				const conductorItem = document.createElement('div');
				conductorItem.innerText = `Conductor: ${conductor.nombre} - Vehículo: ${conductor.placa}`;
				conductoresDisponiblesDiv.appendChild(conductorItem);
			});
		});
}

function solicitarViaje() {
	const origen = document.getElementById('origen').value;
	const destino = document.getElementById('destino').value;
	if (!origen || !destino) {
		alert('Por favor, ingresa el origen y destino.');
		return;
	}

	// Ocultar botones y mostrar mensaje de "Buscando..."
	document.getElementById('viaje').innerHTML = '<p>Buscando...</p>';

	// Emitir evento de solicitud de viaje al servidor
	socket.emit('nuevoViaje', { nombrePasajero, origen, destino });
}

// Escuchar las actualizaciones de conductores activos
socket.on('actualizarConductores', (conductoresActivos) => {
	actualizarConductores();
});

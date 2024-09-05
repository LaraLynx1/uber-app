const socket = io();

function loginPasajero() {
	document.getElementById('solicitarViajeForm').style.display = 'block';
}

function solicitarViaje() {
	const origen = document.getElementById('origen').value;
	const destino = document.getElementById('destino').value;

	if (!origen || !destino) {
		alert('Por favor, completa ambos campos.');
		return;
	}

	document.getElementById('solicitarViajeForm').style.display = 'none';
	alert('Buscando conductor...');

	// Emitir evento de solicitud de viaje
	socket.emit('solicitarViaje', { origen, destino, nombrePasajero: document.getElementById('nombrePasajero').value });
}

socket.on('actualizarConductores', (conductoresActivos) => {
	const listaConductores = document.getElementById('listaConductores');
	listaConductores.innerHTML = '';

	conductoresActivos.forEach((conductor) => {
		const item = document.createElement('li');
		item.textContent = `${conductor.nombre} - ${conductor.vehiculo}`;
		listaConductores.appendChild(item);
	});
});

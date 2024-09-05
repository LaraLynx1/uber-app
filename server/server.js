const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

// Inicializamos Express
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, '../public')));

// Variables globales para mantener el estado
let conductoresActivos = [];

// Configurar conexión de Socket.IO
io.on('connection', (socket) => {
	console.log('Nueva conexión:', socket.id);

	// Evento de conductor activo
	socket.on('conductorActivo', (data) => {
		const conductor = { id: socket.id, nombre: data.nombre, vehiculo: data.vehiculo };
		conductoresActivos.push(conductor);
		console.log('Conductor activo:', conductor);

		// Enviar lista actualizada de conductores a todos los pasajeros
		io.emit('actualizarConductores', conductoresActivos);
	});

	// Evento de conductor inactivo
	socket.on('conductorInactivo', (data) => {
		conductoresActivos = conductoresActivos.filter((conductor) => conductor.id !== socket.id);
		console.log('Conductor inactivo:', data.nombre);

		// Enviar lista actualizada de conductores a todos los pasajeros
		io.emit('actualizarConductores', conductoresActivos);
	});

	// Evento cuando un conductor se desconecta
	socket.on('disconnect', () => {
		conductoresActivos = conductoresActivos.filter((conductor) => conductor.id !== socket.id);
		console.log('Conductor desconectado:', socket.id);

		// Enviar lista actualizada de conductores a todos los pasajeros
		io.emit('actualizarConductores', conductoresActivos);
	});

	// Manejar solicitud de viaje de un pasajero
	socket.on('solicitarViaje', (data) => {
		console.log('Solicitud de viaje:', data);
		io.emit('nuevoViaje', data); // Emitir a todos los conductores activos
	});
});

// Iniciar servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const conductoresActivos = [];

// Cuando un conductor se activa
io.on('connection', (socket) => {
	console.log('Nueva conexión:', socket.id);

	socket.on('conductorActivo', (data) => {
		const conductor = { id: socket.id, nombre: data.nombre, vehiculo: data.vehiculo };
		conductoresActivos.push(conductor);
		console.log('Conductor activo:', conductor);

		// Emitir la lista de conductores activos a todos los pasajeros
		io.emit('actualizarConductores', conductoresActivos);
	});

	socket.on('conductorInactivo', (data) => {
		const index = conductoresActivos.findIndex((conductor) => conductor.nombre === data.nombre);
		if (index !== -1) {
			conductoresActivos.splice(index, 1);
			console.log('Conductor inactivo:', data.nombre);
		}

		// Emitir la lista actualizada de conductores activos a todos los pasajeros
		io.emit('actualizarConductores', conductoresActivos);
	});

	socket.on('disconnect', () => {
		const index = conductoresActivos.findIndex((conductor) => conductor.id === socket.id);
		if (index !== -1) {
			conductoresActivos.splice(index, 1);
			console.log('Conductor desconectado:', socket.id);
		}

		// Emitir la lista actualizada de conductores activos a todos los pasajeros
		io.emit('actualizarConductores', conductoresActivos);
	});
});

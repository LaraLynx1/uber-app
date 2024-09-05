/* const express = require('express');
const router = express.Router();

let conductores = []; // Lista temporal de conductores

module.exports = (io) => {
	// Iniciar sesión (simulación)
	router.post('/login', (req, res) => {
		const { nombre } = req.body;
		conductores.push({ nombre, activo: false });
		res.status(200).json({ message: 'Conductor registrado', nombre });
	});

	// Seleccionar vehículo
	router.post('/seleccionar-vehiculo', (req, res) => {
		const { nombre, placa } = req.body;
		let conductor = conductores.find((c) => c.nombre === nombre);
		if (conductor) {
			conductor.placa = placa;
			res.status(200).json({ message: 'Vehículo seleccionado', placa });
		} else {
			res.status(404).json({ message: 'Conductor no encontrado' });
		}
	});

	// Activar/desactivar conductor
	router.post('/estado', (req, res) => {
		const { nombre, activo } = req.body;
		let conductor = conductores.find((c) => c.nombre === nombre);
		if (conductor) {
			conductor.activo = activo;
			res.status(200).json({ message: `Conductor ${activo ? 'activado' : 'desactivado'}` });

			// Emitir evento de actualización de conductores activos
			io.emit(
				'actualizarConductores',
				conductores.filter((c) => c.activo)
			);
		} else {
			res.status(404).json({ message: 'Conductor no encontrado' });
		}
	});

	// Obtener conductores activos (para pasajeros)
	router.get('/activos', (req, res) => {
		const conductoresActivos = conductores.filter((c) => c.activo);
		res.status(200).json(conductoresActivos);
	});

	return router;
};

//cambiooooooooooooo
io.on('connection', (socket) => {
	console.log('Cliente conectado');

	// Manejar la solicitud de nuevo viaje
	socket.on('nuevoViaje', ({ nombrePasajero, origen, destino }) => {
		console.log(`Nuevo viaje solicitado por ${nombrePasajero}: de ${origen} a ${destino}`);
		// Emitir a todos los conductores activos
		io.emit('nuevoViaje', { nombrePasajero, origen, destino });
	});

	socket.on('disconnect', () => {
		console.log('Cliente desconectado');
	});
}); */

//cambio ULTIMATEEEE
const express = require('express');
const router = express.Router();

// Ruta para obtener conductores activos (puedes modificar esta lógica según sea necesario)
router.get('/activos', (req, res) => {
	const conductoresActivos = [
		/* Array de conductores activos */
	];
	res.json(conductoresActivos);
});

module.exports = router;

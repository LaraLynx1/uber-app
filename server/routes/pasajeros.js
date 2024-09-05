const express = require('express');
const router = express.Router();

let viajes = []; // Lista temporal de viajes (puedes usar una base de datos en su lugar)

// Iniciar sesión (simulación)
router.post('/login', (req, res) => {
	const { nombre } = req.body;
	res.status(200).json({ message: 'Pasajero registrado', nombre });
});

// Solicitar viaje
router.post('/solicitar-viaje', (req, res) => {
	const { nombre, origen, destino } = req.body;
	viajes.push({ nombre, origen, destino, estado: 'pendiente' });
	res.status(200).json({ message: 'Viaje solicitado', origen, destino });
});

module.exports = router;

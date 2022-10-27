const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql')
const jsonParser = bodyParser.json()
const consultas = require('../controladores/consultas')


router.get('/prueba', consultas.prueba)


router.post('/login', consultas.login)
router.get('/partidos', consultas.partidos)
router.get('/puntos', consultas.posiciones)
router.get('/comparacion/:idUsuario/:idPartidos', consultas.comparacionResultados)
router.get('/traer-puntos', consultas.traerPuntos)
router.put('/sumar-puntos', consultas.sumarPuntos)
router.put('/actualizar-partidos', consultas.actualizarPartidos)


module.exports = router;
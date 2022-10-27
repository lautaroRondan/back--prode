const mysql = require('mysql')

const prueba = (req, res) => {

	return res.status(200).json({
		mensaje: 'mensaje de prueba en el controlador de articulos'
	});
};
// var connection = conexion.connection
const credentials = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'prode_mundial2022'
}

const login = (req, res) => {

	const { Email, Contraseña } = req.body
	const values = [Email, Contraseña]
	const connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM usuario WHERE Email = ? AND Contraseña = ?", values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"id": result
				})
			} else {
				res.status(400).send('Usuario no existe')

			}
		}
	})
	connection.end()

}


const partidos = (req, res) => {
	const connection = mysql.createConnection(credentials)
	connection.query("SELECT Id_Partidos, Local,Gol_local,Gol_Visitante, Visitante, Fecha, Hora, grupo.Grupo FROM partidos INNER JOIN grupo ON partidos.Id_Grupo = grupo.Id_Grupo", (err, partidos) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (partidos.length > 0) {
				res.status(200).json({
					status: "success",
					partidos
				})
			} else {
				res.status(400).json({
					status: "error",
					mensaje: 'no se encontro ningun partido'
				})
			}
		}
	})
	connection.end()
}

const posiciones = (req, res) => {
	const connection = mysql.createConnection(credentials)
	connection.query("SELECT Nombre, Apellido, Puntos FROM `usuario` WHERE Tipo_Usuario = 'usuario' ORDER BY Puntos DESC", (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					result
				})
			} else {
				res.status(400).send('No hay usuarios registrado')
			}
		}
	})
	connection.end()
}

const comparacionResultados = (req, res) => {
	const idUsuario = req.params.idUsuario
	const idPartidos = req.params.idPartidos
	console.log(req.params)
	console.log(req)
	const connection = mysql.createConnection(credentials)
	connection.query("SELECT apuestas.Id_Partidos, apuestas.Gol_Local AS 'apuestaLocal', apuestas.Gol_Visitante AS 'apuestaVisitante', partidos.Gol_local AS 'partidoLocal', partidos.Gol_Visitante AS 'partidoVisitante' FROM `apuestas` INNER JOIN partidos ON apuestas.Id_Partidos = partidos.Id_Partidos WHERE apuestas.Id_Partidos = "+idPartidos+" and Id_Usuario= "+idUsuario, (err, comparacion) => {
		
		if (err) {
			res.status(500).send(err)
		} else {
			if (comparacion.length > 0) {
				res.status(200).json({
					status: "succes",
					comparacion
				})
			} else {
				res.status(400).json({
					status: "error",
					mensaje: 'No hay usuarios registrado'
				})
				
			}
		}			console.log(err)

	})
	connection.end()
}

const traerPuntos = (req, res) => {
	const idUsuario = req.body.id_usuario
	const connection = mysql.createConnection(credentials)
	connection.query("SELECT Puntos FROM `usuario` WHERE Id_Usuario = "+idUsuario, (err, puntos) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (puntos.length > 0) {
				res.status(200).json({
					status: "succes",
					puntos
				})
			} else {
				res.status(400).json({
					status: "error",
					mensaje: 'No hay usuarios registrado'
				})
			}
		}
	})
	connection.end()
}

const sumarPuntos = (req, res) => {
	const puntos = req.body.puntos
	const idUsuario = req.body.id_usuario
	const connection = mysql.createConnection(credentials)
	connection.query("UPDATE `usuario` SET Puntos= " + puntos + " WHERE Id_Usuario = "+idUsuario, (err, sumarpuntos) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).json({
				status: "succes",
				puntos: puntos,
				idUsuario
			})
		}
	})
	connection.end()
}

const actualizarPartidos = (req, res)=>{
	const golLocal = req.body.golLocal
	const golVisitante = req.body.golVisitante
	const idPartidos = req.body.idPartidos
	const connection = mysql.createConnection(credentials)
	connection.query("UPDATE `partidos` SET Gol_local= "+ golLocal +",Gol_Visitante= "+ golVisitante + " WHERE Id_Partidos = "+idPartidos, (error, actualizarPartido) => {
		if (error) {
			res.status(500).send( error)
		} else {
			res.status(200).json({
				status: "succes"
			})
		}
	})
	connection.end()
	console.log(golLocal, golVisitante, idPartidos)
}

module.exports = {
	prueba,
	login,
	partidos,
	posiciones,
	comparacionResultados,
	traerPuntos,
	sumarPuntos,
	actualizarPartidos
}
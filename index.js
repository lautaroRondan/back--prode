const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit: '10mb'}))

const rutas_articulo = require("./rutas/rutas");

app.use("/api", rutas_articulo);

app.listen(4000, () => console.log('hola soy el servidor'))
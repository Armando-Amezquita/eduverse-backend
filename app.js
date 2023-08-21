const express = require('express');
const helmet = require('helmet')
const cors = require('cors'); 
const { router } = require('./src/router');
const socketIO = require('./src/socket')
const morgan = require('morgan')

const app = express();

const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  optionsSuccessStatus: 200 
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// //Routes
app.use("/", router);

// Manejo de rutas no encontradas (404)
// app.use((req, res) => {
//   res.status(404).send('Ruta no encontrada');
// });

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log('err :>> ', err);
  res.status(500).send('Error del servidor');
});

module.exports = {
  app
}

// socketIO.createSocketInstance(server)

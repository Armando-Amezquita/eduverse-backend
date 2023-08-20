const express = require('express');
const router = express.Router();

// Ruta de ejemplo
router.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API!');
});

router.post('/agregar', (req, res) => {
});

module.exports = router;
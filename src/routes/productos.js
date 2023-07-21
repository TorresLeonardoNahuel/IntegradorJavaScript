const express = require ('express');
const router = express.Router();
const controller = require('../controllers/productsController');

router.get('/' , controller.listar);

router.get('/:id' , controller.detalle);

router.post('/' , controller.crear);

router.patch('/:id' , controller.detalle);

router.delete('/:id' , controller.eliminar);

module.exports = router;
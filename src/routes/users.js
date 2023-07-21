const express = require ('express');
const router = express.Router();
const controller = require('../controllers/usersController');

router.get('/' , controller.listar);

router.get('/:id' , controller.detalle);

router.post('/' , controller.crear);

router.patch('/:id' , controller.actualizar);

router.delete('/:id' , controller.eliminar);

module.exports = router;
const express = require ('express');
const router = express.Router();
const controller = require('../controllers/productsController');
const checkLogin = require('../middlewares/controlLogin.js');

router.get('/' , controller.listar);

router.get('/:id' , controller.detalle);

router.post('/' , checkLogin, controller.crear);

router.patch('/:id' , checkLogin, controller.actualizar);

router.delete('/:id' , checkLogin, controller.eliminar);

router.get('/buscar/nombre' , controller.buscarPorNombre);

router.get('/buscar/categoria' , controller.buscarPorMarca);

module.exports = router;
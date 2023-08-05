const express = require ('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const checkLogin = require('../middlewares/controlLogin.js');
const customImageUpload = require('../middlewares/cargarImagen.js')

router.get('/' , controller.listar);

router.get('/:id' , controller.detalle);

router.post('/' , checkLogin, customImageUpload('users'), controller.crear);

router.patch('/:id' , checkLogin, customImageUpload('users'), controller.actualizar);

router.delete('/:id' , checkLogin, controller.eliminar);

module.exports = router;
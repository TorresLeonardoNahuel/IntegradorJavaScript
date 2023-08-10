const express = require ('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const checkLogin = require('../middlewares/controlLogin.js');
const customImageUpload = require('../middlewares/cargarImagen.js')
const validateUser = require('../middlewares/validateUser.js');

router.get('/' , controller.listar);

router.get('/:id' , validateUser.validateId, controller.detalle);

router.post('/' , checkLogin, validateUser.validateUserData, customImageUpload('users'), controller.crear);

router.patch('/:id' , checkLogin, validateUser.validateId, validateUser.validateUserData,validateUser.validateUserExists, customImageUpload('users'), controller.actualizar);

router.delete('/:id' , checkLogin, validateUser.validateId, validateUser.validateUserExists,controller.eliminar);

router.get('/buscar/nombre', validateUser.validateUserName,  controller.buscarPorNombre);

router.get('/buscar/categoria',validateUser.validateDniSearch, controller.buscarPorDni);


module.exports = router;
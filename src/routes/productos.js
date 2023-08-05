const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');
const checkLogin = require('../middlewares/controlLogin.js');
const customImageUpload = require('../middlewares/cargarImagen.js');
const validateProduct = require('../middlewares/validateProduct.js');

router.get('/', controller.listar);

router.get('/:id', validateProduct.validateId, controller.detalle);

router.post('/', checkLogin, validateProduct.validateProductData, customImageUpload('products'), controller.crear);

router.patch('/:id', checkLogin, validateProduct.validateId, validateProduct.validateProductData, validateProduct.validateProductExists, customImageUpload('products'), controller.actualizar);

router.delete('/:id', checkLogin, validateProduct.validateId, validateProduct.validateProductExists, controller.eliminar);

router.get('/buscar/nombre', validateProduct.validateProductName, controller.buscarPorNombre);

router.get('/buscar/categoria', validateProduct.validateCategorySearch, controller.buscarPorCategory);

module.exports = router;
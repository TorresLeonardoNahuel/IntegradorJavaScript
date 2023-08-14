const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');
const checkLogin = require('../middlewares/controlLogin.js');
const customImageUpload = require('../middlewares/cargarImagen.js');
const validateProduct  = require('../validators/Products.js');

router.get('/', controller.listar);

router.get('/:id', validateProduct.validateId, controller.detalle);

router.post('/',  validateProduct.validateProductData, validateProduct.validateResultado, checkLogin, customImageUpload('products'), controller.crear);

router.patch('/:id',  validateProduct.validateId, validateProduct.validateProductData, validateProduct.validateProductExists ,checkLogin, customImageUpload('products'), controller.actualizar);

router.delete('/:id', validateProduct.validateId, validateProduct.validateProductExists, checkLogin, controller.eliminar);

router.get('/buscar/nombre', validateProduct.validateProductName, controller.buscarPorNombre);

router.get('/buscar/categoria', validateProduct.validateCategorySearch, controller.buscarPorCategory);

module.exports = router;
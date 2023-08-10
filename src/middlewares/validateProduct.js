const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');
const Product = require('../database/models/Product.js'); 
const validateProduct = {
  validateId: [
    param('id').custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('Producto ID Incorrecto'),
  ],

  validateProductData: [
    body('name').notEmpty().withMessage('No puede estar vacio').bail().isString().withMessage('Debe ser un campo alfanumerico').bail(),
    body('price').notEmpty().withMessage('No puede estar vacio').bail().isNumeric().withMessage('Debe ser un campo numerico').bail(),
    body('discount').isNumeric().withMessage('Debe ser un campo numerico').bail().isArray({ min: 0, max: 100 }).withMessage('Debe tener un descunto comprendido entra 0 y 100').bail(),
    body('category').notEmpty().withMessage('No puede estar vacio').bail(),
    body('description').notEmpty().withMessage('No puede estar vacio').bail().isLength({ min: 0, max: 100 }).withMessage('Debe tener como maxim 100 caracteres').bail(),
    // body('image').notEmpty().withMessage('Requiere una imagen'),
  ],

  validateProductName: [
    query('q').notEmpty().withMessage('La consulta de búsqueda "q" es obligatoria'),
  ],

  validateCategorySearch: [
    query('q').notEmpty().withMessage('La consulta de búsqueda "q" es obligatoria'),
  ],

  validateProductExists: async (req, res, next) => {
    const productId = req.params.id;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Producto no Encontrado' });
      }
      req.product = product;
      next();
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  validationRegister: [    
    body('name').notEmpty().withMessage('No puede estar vacio').bail().isLength({ min : 2 }).withMessage('Debe tener como minimo 2 caracteres').bail(),
    body('email').notEmpty().withMessage('No puede estar vacio').bail().isEmail().withMessage('Debe ser un mail valido').bail(),
    body('password').notEmpty().withMessage('No puede estar vacio').bail().isLength({ min: 8 }).withMessage('Debe tener como minimo 8 caracteres').bail(),
    body('repassword').notEmpty().withMessage('No puede estar vacio').bail().custom((repass, { req }) => {
      if (repass !== req.body.password) {
        throw new Error('Las contraseñas deben coincidir');
      }
      return true;
    }).bail()
  ]
  
};

module.exports = validateProduct;

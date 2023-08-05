const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');
const Product = require('../database/models/Product.js'); // Asegúrate de que la ruta sea correcta

const validateProduct = {
  validateId: [
    param('id').custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('Producto ID Incorrecto'),
  ],

  validateProductData: [
    body('name').notEmpty().withMessage('Requiere un Nombre'),
    body('price').notEmpty().isNumeric().withMessage('El precio debe ser un valor numérico'),
    body('discount').notEmpty().isNumeric().withMessage('El descuento debe ser un valor numérico'),
    body('category').notEmpty().withMessage('Requiere una Categoria'),
    body('description').notEmpty().withMessage('Requiere una Descripcion'),
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
};

module.exports = validateProduct;

const { check, body, param, query } = require("express-validator");
const validateHelper = require("../helpers/validateHelper.js");
const fs = require("fs");
const path = require("path");

const mongoose = require("mongoose");
const Product = require("../database/models/Product.js");
const validateProduct = {
  validateId: [
    param("id")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("Producto ID Incorrecto"),
  ],

  validateProductData: [
    body("name")
      .exists()
      .withMessage("Debe existir la propiedad Name")
      .bail()
      .not()
      .isEmpty()
      .withMessage("Se necesita un nombre de producto")
      .bail()
      .isString()
      .withMessage("Se requiere que sea Alfanumerico")
      .bail()
      .custom((value, { req }) => {
        if (value < 3) {
          throw new Error(
            "El Nombre del Producto debe ser mayor a 3 caracteres"
          );
        }
        return true;
      })
      .bail(),
    body("price")
      .exists()
      .withMessage("Debe existir la propiedad Price")
      .bail()
      .not()
      .isEmpty()
      .withMessage("Se necesita un Precio de producto")
      .bail()
      .custom((value, { req }) => {
        if (isNaN(parseFloat(value))) {
          throw new Error("Ingresar un valor Numérico en el Precio de producto");
        }
        if (parseFloat(value) < 0) {
          throw new Error(
            "El Precio debe ser Positivo"
          );
        }
        return true;
      })
      .bail(),
    body("discount")
      .exists()
      .withMessage("Debe existir la propiedad Discount")
      .bail()
      .custom((value, { req }) => {
        if (isNaN(parseFloat(value))) {
          throw new Error("Ingresar un valor Numérico en el descuento");
        }
        if (parseFloat(value) < 0 || parseFloat(value) >= 100) {
          throw new Error(
            "El descuento debe ser mayor o igual a 0 y menor a 100"
          );
        }
        return true;
      })
      .bail(),
    body("category")
      .exists()
      .withMessage("Debe existir la propiedad Category")
      .bail()
      .not()
      .isEmpty()
      .withMessage("Se necesita una Categoria del producto")
      .bail()
      .isString()
      .withMessage("Se requiere que sea Alfanumerico")
      .bail(),
    body("description")
      .exists()
      .withMessage("Debe existir la propiedad Description")
      .bail()
      .not()
      .isEmpty()
      .withMessage("Se necesita una Descripcion del producto")
      .bail()
      .isString()
      .withMessage("Se requiere que sea Alfanumerico")
      .bail()
      .isLength({ min: 0, max: 500 })
      .withMessage("no debe superar los 100 caracteres")
      .bail(),
  ],

  validateProductName: [
    query("q")
      .notEmpty()
      .withMessage('La consulta de búsqueda "q" es obligatoria'),
  ],

  validateCategorySearch: [
    query("q")
      .notEmpty()
      .withMessage('La consulta de búsqueda "q" es obligatoria'),
  ],

  validateProductExists: async (req, res, next) => {
    const productId = req.params.id;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Producto no Encontrado" });
      }
      req.product = product;
      next();
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  validateResultado: (req, res, next) => {
    const validaciones = validateHelper.validateResult(req); // Obtiene las validaciones desde el helper
    //console.log('Estoy en Validaciones este resulto',validaciones);
    if (validaciones) {
      if (req.file.filename) {
       if(req.file.filename !== "image-default.png"){
        fs.unlinkSync(path.resolve(__dirname, `../../public/images/products/${req.file.filename}`));
        }
      }
      return res.status(400).json({ validaciones: validaciones });
    } else {
      next();
    }
  },
};

module.exports = { validateProduct };

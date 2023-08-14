const { body, param, query, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const User = require('../database/models/User.js'); 
const validateUser = {
  validateId: [
    param('id').custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('Usuario ID Incorrecto'),
  ],

  validateUserData: [
    body('name','Ingrese un name valido')
          .exists()
          .isString('Debe ser un campo alfanumerico'),
    body('surname', 'Ingrese un surname valido')
          .exists()
          .isNumeric(),
    body('dni', 'Ingrese un dni valido')
          .exists()
          .isNumeric(),
    body('age', 'Ingrese un age valido')
          .exists()
          .isNumeric(),
    body('gender', 'Ingrese un gender valido')
          .exists(),
    body('email', 'Ingrese un email valido')
          .exists()
          .isEmail(),
    body('phone', 'Ingrese un phone valido')
          .exists()
          .isLength({ min: 0, max: 13 }),
    body('adress', 'Ingrese un adress valido')
          .exists()
          .isBtcAddress()
          .isLength({ min: 0, max: 30 }),
    body('password', 'Ingrese un password valido')
          .exists()
          .isLength({ min: 8 })
  ],

  validateUserName: [
    query('q').exists().withMessage('La consulta de búsqueda "q" es obligatoria'),
  ],

  validateDniSearch: [
    query('dni').exists().withMessage('La consulta de búsqueda "dni" es obligatoria'),
  ],

  validateUserExists: async (req, res, next) => {
    const userId = req.params.dni;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no Encontrado' });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  validateFrontend: async (req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      console.log(errors);
    }
  }
};

module.exports = validateUser;

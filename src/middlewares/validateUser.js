const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');
const User = require('../database/models/User.js'); 
const validateUser = {
  validateId: [
    param('id').custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('Usuario ID Incorrecto'),
  ],

  validateUserData: [
    body('name').notEmpty().withMessage('No puede estar vacio').bail().isString().withMessage('Debe ser un campo alfanumerico').bail(),
    body('surname').notEmpty().withMessage('No puede estar vacio').bail().isNumeric().withMessage('Debe ser un campo numerico').bail(),
    body('dni').notEmpty().withMessage('No puede estar vacio').bail().isNumeric().withMessage('Debe ser un campo numerico').bail(),
    body('age').notEmpty().withMessage('No puede estar vacio').bail().isNumeric().withMessage('Debe ser un campo numerico').bail(),
    body('gender').notEmpty().withMessage('No puede estar vacio').bail(),
    body('email').notEmpty().withMessage('No puede estar vacio').bail().isEmail().withMessage('Debe ser un mail valido').bail(),
    body('phone').notEmpty().withMessage('No puede estar vacio').bail().isLength({ min: 0, max: 13 }).withMessage('Debe tener como maxim 13 caracteres').bail(),
    body('adress').notEmpty().withMessage('No puede estar vacio').bail().isBtcAddress().withMessage('Debe ser una direccion valida').bail().isLength({ min: 0, max: 30 }).withMessage('Debe tener como maxim 30 caracteres').bail(),
    body('password').notEmpty().withMessage('No puede estar vacio').bail().isLength({ min: 8 }).withMessage('Debe tener como minimo 8 caracteres').bail(),
    
    // body('image').notEmpty().withMessage('Requiere una imagen'),
  ],

  validateUserName: [
    query('q').notEmpty().withMessage('La consulta de búsqueda "q" es obligatoria'),
  ],

  validateDniSearch: [
    query('dni').notEmpty().withMessage('La consulta de búsqueda "dni" es obligatoria'),
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

//   validationRegister: [    
//     body('name').notEmpty().withMessage('No puede estar vacio').bail().isLength({ min : 2 }).withMessage('Debe tener como minimo 2 caracteres').bail(),
//     body('email').notEmpty().withMessage('No puede estar vacio').bail().isEmail().withMessage('Debe ser un mail valido').bail(),
//     body('password').notEmpty().withMessage('No puede estar vacio').bail().isLength({ min: 8 }).withMessage('Debe tener como minimo 8 caracteres').bail(),
//     body('repassword').notEmpty().withMessage('No puede estar vacio').bail().custom((repass, { req }) => {
//       if (repass !== req.body.password) {
//         throw new Error('Las contraseñas deben coincidir');
//       }
//       return true;
//     }).bail()
//   ]
  
};

module.exports = validateUser;

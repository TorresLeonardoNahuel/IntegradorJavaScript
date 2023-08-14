const { validationResult } = require('express-validator');

const validateResult = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const validaciones = errors.array();
        console.log(validaciones,req.body);
        return validaciones;
    }
    return null; // Si no hay errores
}

module.exports = { validateResult };
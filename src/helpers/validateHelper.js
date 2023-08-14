const { validationResult } = require('express-validator');

const validateResult = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const validaciones = errors.array();
        return validaciones;
    }
    return null; // Si no hay errores
}

module.exports = { validateResult };
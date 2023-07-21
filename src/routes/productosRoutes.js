const express = require ('express');
const router = express.Router();
const controller = require('../controllers/productsController');

router.get('/',controller.listar);
router.get('/:id',controller.detalle);
router.post('/crear',controller.crear)


module.exports = router;
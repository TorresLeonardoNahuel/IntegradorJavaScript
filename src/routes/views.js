const express = require ('express');
const router = express.Router();

router.get('/users/',(req, res, next) => {
    res.render('index');
});
router.get('/singnup',(req, res, next) => {});
router.post('/singnup',(req, res, next) => {});

router.get('/singnin',(req, res, next) => {});
router.post('/singnin',(req, res, next) => {});


module.exports = router;